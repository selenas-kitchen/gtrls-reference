import argparse
import random
from collections import Counter, defaultdict


TEAMS = [
    ("Best Friends Club", 1023.3),
    ("Hook Line & Blinker", 1059.0),
    ("Crossbar Cartel", 1032.3),
    ("Ball Chasin & Sauce Tastin", 1063.0),
    ("Spirit Airlines", 1055.0),
    ("The Cox", 1059.3),
    ("Past Our Prime", 1047.7),
    ("Quack Wok", 1069.3),
    ("Giga's In Paris", 1056.0),
    ("Deceptitards", 1078.3),
    ("Supernova Abyss", 1065.3),
    ("ESC", 1061.3),
]


class SeasonSimulator:
    def __init__(self, teams):
        self.teams = teams
        self.rating = dict(teams)

    def game_win_probability(self, a, b):
        return 1 / (1 + 10 ** ((self.rating[b] - self.rating[a]) / 400))

    def play_series(self, a, b, best=5, scoring=False):
        needed = best // 2 + 1
        a_wins = 0
        b_wins = 0

        while a_wins < needed and b_wins < needed:
            if random.random() < self.game_win_probability(a, b):
                a_wins += 1
            else:
                b_wins += 1

        winner = a if a_wins > b_wins else b
        loser = b if a_wins > b_wins else a

        if not scoring:
            return winner, loser, a_wins, b_wins

        loser_games = min(a_wins, b_wins)
        if loser_games == 0:
            winner_points, loser_points = 3, 0
        elif loser_games == 2:
            winner_points, loser_points = 2, 1
        else:
            winner_points, loser_points = 2, 0

        return winner, loser, winner_points, loser_points, a_wins, b_wins

    def rank_teams(self, names, points):
        return sorted(
            names,
            key=lambda team: (points[team], self.rating[team], random.random()),
            reverse=True,
        )

    def pair_pod(self, pod, points, groups):
        remaining = self.rank_teams(pod, points)
        pairs = []

        while remaining:
            top_team = remaining.pop(0)
            opposite_group = [
                team for team in remaining if groups[team] != groups[top_team]
            ]

            if opposite_group:
                opponent = sorted(
                    opposite_group,
                    key=lambda team: (points[team], self.rating[team], random.random()),
                )[0]
            else:
                opponent = sorted(
                    remaining,
                    key=lambda team: (points[team], self.rating[team], random.random()),
                )[0]

            remaining.remove(opponent)
            pairs.append((top_team, opponent))

        return pairs

    def scoring_round(self, pairs, points, swiss_wins, swiss_losses):
        for a, b in pairs:
            winner, loser, winner_points, loser_points, _, _ = self.play_series(
                a, b, best=5, scoring=True
            )
            points[winner] += winner_points
            points[loser] += loser_points
            swiss_wins[winner] += 1
            swiss_losses[loser] += 1

    def round_4_matches(self, pairs, points):
        winners = []
        losers = []

        for a, b in pairs:
            winner, loser, winner_points, loser_points, _, _ = self.play_series(
                a, b, best=5, scoring=True
            )
            points[winner] += winner_points
            points[loser] += loser_points
            winners.append(winner)
            losers.append(loser)

        return winners, losers

    def simulate_one_season(self):
        names = [team for team, _ in self.teams]
        random.shuffle(names)

        group_a = names[:6]
        group_b = names[6:]
        groups = {team: "A" for team in group_a} | {team: "B" for team in group_b}

        points = {team: 0 for team in names}
        group_points = {team: 0 for team in names}
        swiss_wins = {team: 0 for team in names}
        swiss_losses = {team: 0 for team in names}

        for group in (group_a, group_b):
            for i in range(len(group)):
                for j in range(i + 1, len(group)):
                    a, b = group[i], group[j]
                    winner, loser, winner_points, loser_points, _, _ = self.play_series(
                        a, b, best=5, scoring=True
                    )
                    group_points[winner] += winner_points
                    group_points[loser] += loser_points
                    points[winner] += winner_points
                    points[loser] += loser_points

        rank_a = self.rank_teams(group_a, group_points)
        rank_b = self.rank_teams(group_b, group_points)

        bonuses = [3, 2, 2, 1, 1, 0]
        for group_rank in (rank_a, rank_b):
            for index, team in enumerate(group_rank):
                points[team] += bonuses[index]

        regular_rank = self.rank_teams(names, points)
        regular_top_4 = set(regular_rank[:4])

        self.scoring_round(
            list(zip(rank_a, list(reversed(rank_b)))),
            points,
            swiss_wins,
            swiss_losses,
        )

        for record in [(1, 0), (0, 1)]:
            pod = [
                team
                for team in names
                if swiss_wins[team] == record[0] and swiss_losses[team] == record[1]
            ]
            self.scoring_round(
                self.pair_pod(pod, points, groups), points, swiss_wins, swiss_losses
            )

        for team in names:
            if swiss_wins[team] == 2 and swiss_losses[team] == 0:
                points[team] += 2

        one_one_pod = [
            team for team in names if swiss_wins[team] == 1 and swiss_losses[team] == 1
        ]
        self.scoring_round(
            self.pair_pod(one_one_pod, points, groups),
            points,
            swiss_wins,
            swiss_losses,
        )

        pod_2_0 = [
            team for team in names if swiss_wins[team] == 2 and swiss_losses[team] == 0
        ]
        pod_2_1 = [
            team for team in names if swiss_wins[team] == 2 and swiss_losses[team] == 1
        ]
        pod_1_2 = [
            team for team in names if swiss_wins[team] == 1 and swiss_losses[team] == 2
        ]
        pod_0_2 = [
            team for team in names if swiss_wins[team] == 0 and swiss_losses[team] == 2
        ]

        promoted = self.rank_teams(pod_2_1, points)[0]
        demoted = self.rank_teams(pod_1_2, points)[-1]

        pod_2_0.append(promoted)
        pod_2_1.remove(promoted)
        pod_0_2.append(demoted)
        pod_1_2.remove(demoted)

        slots = {}
        eliminated = set()

        winners, losers = self.round_4_matches(
            self.pair_pod(pod_2_0, points, groups), points
        )
        for index, team in enumerate(self.rank_teams(winners, points), start=1):
            slots[f"U{index}"] = team
        for index, team in enumerate(self.rank_teams(losers, points), start=1):
            slots[f"Q{index}"] = team

        winners, losers = self.round_4_matches(
            self.pair_pod(pod_2_1, points, groups), points
        )
        slots["Q3"] = winners[0]
        lower_playoff_candidates = [losers[0]]

        winners, losers = self.round_4_matches(
            self.pair_pod(pod_1_2, points, groups), points
        )
        lower_playoff_candidates.append(winners[0])
        slots["E1"] = losers[0]

        lower_rank = self.rank_teams(lower_playoff_candidates, points)
        slots["L2"], slots["L3"] = lower_rank[0], lower_rank[1]

        winners, losers = self.round_4_matches(
            self.pair_pod(pod_0_2, points, groups), points
        )
        elimination_rank = self.rank_teams(winners, points)
        slots["E2"], slots["E3"] = elimination_rank[0], elimination_rank[1]
        eliminated.update(losers)

        swiss_rank = self.rank_teams(names, points)
        swiss_top_4 = set(swiss_rank[:4])

        q1_winner, q1_loser, _, _ = self.play_series(slots["Q1"], slots["Q2"], best=5)
        slots["U3"] = q1_winner

        q2_winner, q2_loser, _, _ = self.play_series(q1_loser, slots["Q3"], best=5)
        slots["U4"] = q2_winner
        slots["L1"] = q2_loser

        e1_winner, e1_loser, _, _ = self.play_series(slots["E2"], slots["E3"], best=5)
        eliminated.add(e1_loser)

        e2_winner, e2_loser, _, _ = self.play_series(slots["E1"], e1_winner, best=5)
        slots["L4"] = e2_winner
        eliminated.add(e2_loser)

        u14_winner, u14_loser, _, _ = self.play_series(
            slots["U1"], slots["U4"], best=5
        )
        l23_winner, l23_loser, _, _ = self.play_series(
            slots["L2"], slots["L3"], best=5
        )
        u23_winner, u23_loser, _, _ = self.play_series(
            slots["U2"], slots["U3"], best=5
        )
        l14_winner, l14_loser, _, _ = self.play_series(
            slots["L1"], slots["L4"], best=5
        )

        eliminated.update([l23_loser, l14_loser])

        qf1_winner, qf1_loser, _, _ = self.play_series(
            u23_loser, l23_winner, best=5
        )
        qf2_winner, qf2_loser, _, _ = self.play_series(
            u14_loser, l14_winner, best=5
        )

        eliminated.update([qf1_loser, qf2_loser])

        sf1_winner, sf1_loser, _, _ = self.play_series(
            u14_winner, qf2_winner, best=5
        )
        sf2_winner, sf2_loser, _, _ = self.play_series(
            u23_winner, qf1_winner, best=5
        )

        eliminated.update([sf1_loser, sf2_loser])

        champion, runner_up, _, _ = self.play_series(sf1_winner, sf2_winner, best=7)

        playoff_teams = {
            slots["U1"],
            slots["U2"],
            slots["U3"],
            slots["U4"],
            slots["L1"],
            slots["L2"],
            slots["L3"],
            slots["L4"],
        }

        return {
            "group_a_rank": rank_a,
            "group_b_rank": rank_b,
            "regular_rank": regular_rank,
            "regular_top_4": regular_top_4,
            "swiss_rank": swiss_rank,
            "swiss_top_4": swiss_top_4,
            "slots": slots,
            "playoff_teams": playoff_teams,
            "eliminated": eliminated,
            "champion": champion,
            "runner_up": runner_up,
        }


def pct(value, samples):
    return 100 * value / samples


def run(samples, seed):
    random.seed(seed)
    simulator = SeasonSimulator(TEAMS)

    stats = {team: defaultdict(int) for team, _ in TEAMS}
    finish_counter = {team: Counter() for team, _ in TEAMS}

    champion_top_4_regular = 0
    champion_top_4_swiss = 0
    champion_top_4_both = 0
    champion_top_4_either = 0
    champion_neither = 0
    champion_regular_rank_sum = 0
    champion_swiss_rank_sum = 0

    for _ in range(samples):
        result = simulator.simulate_one_season()
        champion = result["champion"]

        for team in result["group_a_rank"][:1] + result["group_b_rank"][:1]:
            stats[team]["group_top"] += 1

        for team in result["group_a_rank"][:3] + result["group_b_rank"][:3]:
            stats[team]["group_top_3"] += 1

        for slot, team in result["slots"].items():
            stats[team][slot] += 1

        for team in result["playoff_teams"]:
            stats[team]["made_playoffs"] += 1

        for slot in ["U1", "U2", "L2", "L3"]:
            stats[result["slots"][slot]]["direct_round_4_playoff"] += 1

        for slot in ["Q1", "Q2", "Q3", "E1", "E2", "E3"]:
            stats[result["slots"][slot]]["play_in_after_round_4"] += 1

        for team in result["eliminated"]:
            finish_counter[team]["eliminated"] += 1

        stats[champion]["champion"] += 1
        stats[result["runner_up"]]["runner_up"] += 1

        regular_rank = result["regular_rank"]
        swiss_rank = result["swiss_rank"]
        champion_regular_rank_sum += regular_rank.index(champion) + 1
        champion_swiss_rank_sum += swiss_rank.index(champion) + 1

        top_4_regular = champion in result["regular_top_4"]
        top_4_swiss = champion in result["swiss_top_4"]

        champion_top_4_regular += top_4_regular
        champion_top_4_swiss += top_4_swiss
        champion_top_4_both += top_4_regular and top_4_swiss
        champion_top_4_either += top_4_regular or top_4_swiss
        champion_neither += not top_4_regular and not top_4_swiss

    print(f"Samples: {samples:,}")
    print(f"Seed: {seed}")
    print()

    print("Team outcome probabilities")
    print(
        "team,rating,group_top%,group_top3%,direct_R4_playoff%,"
        "playin_after_R4%,made_playoffs%,champion%"
    )
    for team, rating in sorted(TEAMS, key=lambda item: item[1], reverse=True):
        team_stats = stats[team]
        print(
            f"{team},{rating:.1f},"
            f"{pct(team_stats['group_top'], samples):.1f},"
            f"{pct(team_stats['group_top_3'], samples):.1f},"
            f"{pct(team_stats['direct_round_4_playoff'], samples):.1f},"
            f"{pct(team_stats['play_in_after_round_4'], samples):.1f},"
            f"{pct(team_stats['made_playoffs'], samples):.1f},"
            f"{pct(team_stats['champion'], samples):.2f}"
        )

    print()
    print("Champion checkpoint probabilities")
    print(f"Champion was top 4 after regular season: {pct(champion_top_4_regular, samples):.2f}%")
    print(f"Champion was top 4 after Swiss: {pct(champion_top_4_swiss, samples):.2f}%")
    print(f"Champion was top 4 after both: {pct(champion_top_4_both, samples):.2f}%")
    print(f"Champion was top 4 after either: {pct(champion_top_4_either, samples):.2f}%")
    print(f"Champion was not top 4 at either checkpoint: {pct(champion_neither, samples):.2f}%")
    print(f"Average champion regular-season rank: {champion_regular_rank_sum / samples:.2f}")
    print(f"Average champion Swiss rank: {champion_swiss_rank_sum / samples:.2f}")

    print()
    print("Slot probabilities of at least 5%")
    slot_names = ["U1", "U2", "U3", "U4", "L1", "L2", "L3", "L4", "Q1", "Q2", "Q3", "E1", "E2", "E3"]
    for team, _ in sorted(TEAMS, key=lambda item: item[1], reverse=True):
        slot_probs = [
            f"{slot} {pct(stats[team][slot], samples):.1f}%"
            for slot in slot_names
            if pct(stats[team][slot], samples) >= 5
        ]
        print(f"{team}: {', '.join(slot_probs)}")


def main():
    parser = argparse.ArgumentParser(description="Monte Carlo simulator for the 12-team season format.")
    parser.add_argument("--samples", type=int, default=10_000)
    parser.add_argument("--seed", type=int, default=20260807)
    args = parser.parse_args()

    run(samples=args.samples, seed=args.seed)


if __name__ == "__main__":
    main()

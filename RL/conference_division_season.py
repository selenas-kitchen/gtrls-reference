import argparse
import random
from collections import defaultdict
from itertools import combinations


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

CONFERENCES = ("Gravy", "Train")
DIVISIONS = ("East", "West")


class ConferenceSeasonSimulator:
    def __init__(self, teams, rng):
        self.teams = teams
        self.rating = dict(teams)
        self.rng = rng

    def game_win_probability(self, team_a, team_b):
        return 1 / (1 + 10 ** ((self.rating[team_b] - self.rating[team_a]) / 400))

    def play_series(self, team_a, team_b, best_of=5):
        wins_needed = best_of // 2 + 1
        games_a = 0
        games_b = 0

        while games_a < wins_needed and games_b < wins_needed:
            if self.rng.random() < self.game_win_probability(team_a, team_b):
                games_a += 1
            else:
                games_b += 1

        if games_a > games_b:
            return team_a, team_b, games_a, games_b
        return team_b, team_a, games_a, games_b

    def assign_league(self):
        names = [team for team, _ in self.teams]
        self.rng.shuffle(names)

        alignment = {}
        index = 0
        for conference in CONFERENCES:
            for division in DIVISIONS:
                for team in names[index : index + 3]:
                    alignment[team] = (conference, division)
                index += 3
        return alignment

    @staticmethod
    def new_record():
        return {
            "wins": 0,
            "losses": 0,
            "games_for": 0,
            "games_against": 0,
            "division_wins": 0,
            "division_losses": 0,
            "conference_wins": 0,
            "conference_losses": 0,
        }

    def record_series(self, team_a, team_b, alignment, records, head_to_head):
        winner, loser, games_a, games_b = self.play_series(team_a, team_b)
        records[winner]["wins"] += 1
        records[loser]["losses"] += 1
        records[team_a]["games_for"] += games_a
        records[team_a]["games_against"] += games_b
        records[team_b]["games_for"] += games_b
        records[team_b]["games_against"] += games_a
        head_to_head[winner][loser] += 1

        conference_a, division_a = alignment[team_a]
        conference_b, division_b = alignment[team_b]
        if conference_a == conference_b:
            records[winner]["conference_wins"] += 1
            records[loser]["conference_losses"] += 1
            if division_a == division_b:
                records[winner]["division_wins"] += 1
                records[loser]["division_losses"] += 1

        return winner, loser

    @staticmethod
    def win_rate(wins, losses):
        games = wins + losses
        return wins / games if games else 0

    def rank(self, teams, records, head_to_head):
        random_tiebreak = {team: self.rng.random() for team in teams}

        def key(team):
            tied = [
                opponent
                for opponent in teams
                if opponent != team and records[opponent]["wins"] == records[team]["wins"]
            ]
            h2h_wins = sum(head_to_head[team][opponent] for opponent in tied)
            h2h_losses = sum(head_to_head[opponent][team] for opponent in tied)
            record = records[team]
            return (
                record["wins"],
                self.win_rate(h2h_wins, h2h_losses),
                self.win_rate(record["division_wins"], record["division_losses"]),
                self.win_rate(record["conference_wins"], record["conference_losses"]),
                record["games_for"] - record["games_against"],
                self.rating[team],
                random_tiebreak[team],
            )

        return sorted(teams, key=key, reverse=True)

    def build_schedule(self, alignment):
        schedule = []

        # Division opponents play twice.
        for conference in CONFERENCES:
            for division in DIVISIONS:
                division_teams = [
                    team
                    for team, location in alignment.items()
                    if location == (conference, division)
                ]
                for team_a, team_b in combinations(division_teams, 2):
                    schedule.extend([(team_a, team_b), (team_a, team_b)])

        # Teams play every member of the other division in their conference once.
        for conference in CONFERENCES:
            east = [team for team, location in alignment.items() if location == (conference, "East")]
            west = [team for team, location in alignment.items() if location == (conference, "West")]
            schedule.extend((team_a, team_b) for team_a in east for team_b in west)

        # A random perfect matching gives every team one interconference series.
        gravy = [team for team, location in alignment.items() if location[0] == "Gravy"]
        train = [team for team, location in alignment.items() if location[0] == "Train"]
        self.rng.shuffle(gravy)
        self.rng.shuffle(train)
        schedule.extend(zip(gravy, train))
        self.rng.shuffle(schedule)
        return schedule

    def conference_seeds(self, conference, alignment, records, head_to_head):
        division_rankings = {}
        for division in DIVISIONS:
            teams = [
                team
                for team, location in alignment.items()
                if location == (conference, division)
            ]
            division_rankings[division] = self.rank(teams, records, head_to_head)

        division_winners = [division_rankings[division][0] for division in DIVISIONS]
        top_seeds = self.rank(division_winners, records, head_to_head)
        conference_teams = [
            team for team, location in alignment.items() if location[0] == conference
        ]
        wild_cards = self.rank(
            [team for team in conference_teams if team not in division_winners],
            records,
            head_to_head,
        )[:2]
        seeds = top_seeds + wild_cards
        return seeds, division_rankings

    def playoff_series(self, team_a, team_b):
        winner, loser, _, _ = self.play_series(team_a, team_b, best_of=5)
        return winner, loser

    def play_double_elimination(self, gravy_seeds, train_seeds):
        # Cross-conference opening round: G1-T4, T2-G3, T1-G4, G2-T3.
        upper_round_1 = [
            (gravy_seeds[0], train_seeds[3]),
            (train_seeds[1], gravy_seeds[2]),
            (train_seeds[0], gravy_seeds[3]),
            (gravy_seeds[1], train_seeds[2]),
        ]
        ur1 = [self.playoff_series(*matchup) for matchup in upper_round_1]

        upper_semifinal_1 = self.playoff_series(ur1[0][0], ur1[1][0])
        upper_semifinal_2 = self.playoff_series(ur1[2][0], ur1[3][0])

        lower_round_1_a = self.playoff_series(ur1[0][1], ur1[1][1])
        lower_round_1_b = self.playoff_series(ur1[2][1], ur1[3][1])

        lower_round_2_a = self.playoff_series(lower_round_1_a[0], upper_semifinal_2[1])
        lower_round_2_b = self.playoff_series(lower_round_1_b[0], upper_semifinal_1[1])

        upper_final = self.playoff_series(upper_semifinal_1[0], upper_semifinal_2[0])
        lower_round_3 = self.playoff_series(lower_round_2_a[0], lower_round_2_b[0])
        lower_final = self.playoff_series(lower_round_3[0], upper_final[1])

        first_final = self.playoff_series(upper_final[0], lower_final[0])
        bracket_reset = first_final[0] == lower_final[0]
        if bracket_reset:
            champion, runner_up = self.playoff_series(upper_final[0], lower_final[0])
        else:
            champion, runner_up = first_final

        return {
            "champion": champion,
            "runner_up": runner_up,
            "bracket_reset": bracket_reset,
        }

    def simulate_one_season(self):
        alignment = self.assign_league()
        records = {team: self.new_record() for team, _ in self.teams}
        head_to_head = {
            team: defaultdict(int) for team, _ in self.teams
        }

        for team_a, team_b in self.build_schedule(alignment):
            self.record_series(team_a, team_b, alignment, records, head_to_head)

        gravy_seeds, gravy_divisions = self.conference_seeds(
            "Gravy", alignment, records, head_to_head
        )
        train_seeds, train_divisions = self.conference_seeds(
            "Train", alignment, records, head_to_head
        )
        playoff_result = self.play_double_elimination(gravy_seeds, train_seeds)

        overall_rank = self.rank(
            [team for team, _ in self.teams], records, head_to_head
        )
        playoff_teams = set(gravy_seeds + train_seeds)
        division_winners = {
            gravy_divisions[division][0] for division in DIVISIONS
        } | {
            train_divisions[division][0] for division in DIVISIONS
        }

        return {
            "alignment": alignment,
            "records": records,
            "overall_rank": overall_rank,
            "gravy_seeds": gravy_seeds,
            "train_seeds": train_seeds,
            "playoff_teams": playoff_teams,
            "division_winners": division_winners,
            **playoff_result,
        }


def percentage(count, samples):
    return 100 * count / samples


def run(samples, seed):
    rng = random.Random(seed)
    simulator = ConferenceSeasonSimulator(TEAMS, rng)
    stats = {team: defaultdict(int) for team, _ in TEAMS}
    champion_top_four = 0
    champion_made_division_win = 0
    bracket_resets = 0
    champion_rank_total = 0

    for _ in range(samples):
        result = simulator.simulate_one_season()
        champion = result["champion"]
        stats[champion]["champion"] += 1
        stats[result["runner_up"]]["runner_up"] += 1
        bracket_resets += result["bracket_reset"]

        for team in result["division_winners"]:
            stats[team]["division_winner"] += 1
        for team in result["playoff_teams"]:
            stats[team]["made_playoffs"] += 1
        for conference_seed, team in enumerate(result["gravy_seeds"], start=1):
            stats[team][f"seed_{conference_seed}"] += 1
        for conference_seed, team in enumerate(result["train_seeds"], start=1):
            stats[team][f"seed_{conference_seed}"] += 1

        champion_rank = result["overall_rank"].index(champion) + 1
        champion_rank_total += champion_rank
        champion_top_four += champion_rank <= 4
        champion_made_division_win += champion in result["division_winners"]

    print(f"Samples: {samples:,}")
    print(f"Seed: {seed}")
    print("Regular season: 8 best-of-5 series per team")
    print("Playoffs: 8 teams, double elimination, best-of-5, bracket reset")
    print()
    print("team,rating,division_winner%,playoffs%,conference_1_seed%,champion%")
    for team, rating in sorted(TEAMS, key=lambda item: item[1], reverse=True):
        print(
            f"{team},{rating:.1f},"
            f"{percentage(stats[team]['division_winner'], samples):.2f},"
            f"{percentage(stats[team]['made_playoffs'], samples):.2f},"
            f"{percentage(stats[team]['seed_1'], samples):.2f},"
            f"{percentage(stats[team]['champion'], samples):.2f}"
        )

    print()
    print("Champion checkpoints")
    print(f"Champion was top 4 overall after regular season: {percentage(champion_top_four, samples):.2f}%")
    print(f"Champion won its division: {percentage(champion_made_division_win, samples):.2f}%")
    print(f"Average champion regular-season rank: {champion_rank_total / samples:.2f}")
    print(f"Grand final required a bracket reset: {percentage(bracket_resets, samples):.2f}%")


def main():
    parser = argparse.ArgumentParser(
        description="Monte Carlo simulator for the Gravy/Train conference season."
    )
    parser.add_argument("--samples", type=int, default=10_000)
    parser.add_argument("--seed", type=int, default=20260919)
    args = parser.parse_args()
    run(args.samples, args.seed)


if __name__ == "__main__":
    main()

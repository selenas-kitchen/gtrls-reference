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


class RoundRobinSimulator:
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

    def regular_season(self):
        names = [team for team, _ in self.teams]
        records = {
            team: {
                "wins": 0,
                "losses": 0,
                "games_for": 0,
                "games_against": 0,
            }
            for team in names
        }
        head_to_head = {team: defaultdict(int) for team in names}
        opponents_beaten = {team: [] for team in names}
        schedule = list(combinations(names, 2))
        self.rng.shuffle(schedule)

        for team_a, team_b in schedule:
            winner, loser, games_a, games_b = self.play_series(team_a, team_b)
            records[winner]["wins"] += 1
            records[loser]["losses"] += 1
            records[team_a]["games_for"] += games_a
            records[team_a]["games_against"] += games_b
            records[team_b]["games_for"] += games_b
            records[team_b]["games_against"] += games_a
            head_to_head[winner][loser] += 1
            opponents_beaten[winner].append(loser)

        random_tiebreak = {team: self.rng.random() for team in names}

        def ranking_key(team):
            tied = [
                opponent
                for opponent in names
                if opponent != team and records[opponent]["wins"] == records[team]["wins"]
            ]
            h2h_wins = sum(head_to_head[team][opponent] for opponent in tied)
            h2h_games = sum(
                head_to_head[team][opponent] + head_to_head[opponent][team]
                for opponent in tied
            )
            h2h_rate = h2h_wins / h2h_games if h2h_games else 0
            game_differential = records[team]["games_for"] - records[team]["games_against"]
            strength_of_victory = sum(records[opponent]["wins"] for opponent in opponents_beaten[team])
            return (
                records[team]["wins"],
                h2h_rate,
                game_differential,
                records[team]["games_for"],
                strength_of_victory,
                self.rating[team],
                random_tiebreak[team],
            )

        standings = sorted(names, key=ranking_key, reverse=True)
        return standings, records

    def play_match(self, team_a, team_b, best_of=5):
        winner, loser, _, _ = self.play_series(team_a, team_b, best_of)
        return winner, loser

    def play_in(self, seeds):
        matchups = [(5, 12), (6, 11), (7, 10), (8, 9)]
        survivors = list(seeds[:4])
        eliminated = []
        for high_seed, low_seed in matchups:
            winner, loser = self.play_match(seeds[high_seed - 1], seeds[low_seed - 1])
            survivors.append(winner)
            eliminated.append(loser)
        survivors.sort(key=seeds.index)
        return survivors, eliminated

    @staticmethod
    def quarterfinal_matchups(survivors, seeds):
        ordered = sorted(survivors, key=seeds.index)
        return [
            (ordered[0], ordered[-1]),
            (ordered[3], ordered[4]),
            (ordered[1], ordered[-2]),
            (ordered[2], ordered[5]),
        ]

    def single_elimination(self, seeds):
        survivors, play_in_eliminated = self.play_in(seeds)
        quarterfinals = [
            self.play_match(*matchup)
            for matchup in self.quarterfinal_matchups(survivors, seeds)
        ]
        semifinal_1 = self.play_match(quarterfinals[0][0], quarterfinals[1][0])
        semifinal_2 = self.play_match(quarterfinals[2][0], quarterfinals[3][0])
        champion, runner_up = self.play_match(semifinal_1[0], semifinal_2[0], best_of=7)
        return {
            "champion": champion,
            "runner_up": runner_up,
            "main_bracket": set(survivors),
            "play_in_eliminated": set(play_in_eliminated),
            "bracket_reset": False,
        }

    def double_elimination(self, seeds):
        survivors, play_in_eliminated = self.play_in(seeds)
        upper_round_1 = [
            self.play_match(*matchup)
            for matchup in self.quarterfinal_matchups(survivors, seeds)
        ]

        upper_semifinal_1 = self.play_match(upper_round_1[0][0], upper_round_1[1][0])
        upper_semifinal_2 = self.play_match(upper_round_1[2][0], upper_round_1[3][0])
        lower_round_1_a = self.play_match(upper_round_1[0][1], upper_round_1[1][1])
        lower_round_1_b = self.play_match(upper_round_1[2][1], upper_round_1[3][1])
        lower_round_2_a = self.play_match(lower_round_1_a[0], upper_semifinal_2[1])
        lower_round_2_b = self.play_match(lower_round_1_b[0], upper_semifinal_1[1])
        upper_final = self.play_match(upper_semifinal_1[0], upper_semifinal_2[0])
        lower_round_3 = self.play_match(lower_round_2_a[0], lower_round_2_b[0])
        lower_final = self.play_match(lower_round_3[0], upper_final[1])

        first_final = self.play_match(upper_final[0], lower_final[0], best_of=7)
        bracket_reset = first_final[0] == lower_final[0]
        if bracket_reset:
            champion, runner_up = self.play_match(upper_final[0], lower_final[0], best_of=7)
        else:
            champion, runner_up = first_final

        return {
            "champion": champion,
            "runner_up": runner_up,
            "main_bracket": set(survivors),
            "play_in_eliminated": set(play_in_eliminated),
            "bracket_reset": bracket_reset,
        }


def percentage(value, samples):
    return 100 * value / samples


def run(samples, seed):
    rng = random.Random(seed)
    simulator = RoundRobinSimulator(TEAMS, rng)
    stats = {
        playoff_format: {team: defaultdict(int) for team, _ in TEAMS}
        for playoff_format in ("double", "single")
    }
    checkpoints = {
        playoff_format: defaultdict(int) for playoff_format in ("double", "single")
    }

    for _ in range(samples):
        standings, _ = simulator.regular_season()
        results = {
            "double": simulator.double_elimination(standings),
            "single": simulator.single_elimination(standings),
        }

        for playoff_format, result in results.items():
            format_stats = stats[playoff_format]
            champion = result["champion"]
            champion_seed = standings.index(champion) + 1
            format_stats[champion]["champion"] += 1
            format_stats[result["runner_up"]]["runner_up"] += 1
            for team in standings[:4]:
                format_stats[team]["bye"] += 1
            for team in result["main_bracket"]:
                format_stats[team]["main_bracket"] += 1
            for team in standings[4:]:
                format_stats[team]["played_in"] += 1
            checkpoints[playoff_format]["champion_top_4"] += champion_seed <= 4
            checkpoints[playoff_format]["champion_top_seed"] += champion_seed == 1
            checkpoints[playoff_format]["champion_play_in"] += champion_seed >= 5
            checkpoints[playoff_format]["champion_seed_sum"] += champion_seed
            checkpoints[playoff_format]["bracket_reset"] += result["bracket_reset"]

    print(f"Samples per playoff format: {samples:,}")
    print(f"Seed: {seed}")
    print("Regular season: 11 best-of-5 series per team")
    print("Seeds 1-4 receive byes; seeds 5-12 enter the play-in")

    for playoff_format in ("double", "single"):
        label = "Double elimination" if playoff_format == "double" else "Single elimination"
        print()
        print(label)
        print("team,rating,top4_bye%,main_bracket%,runner_up%,champion%")
        for team, rating in sorted(TEAMS, key=lambda item: item[1], reverse=True):
            team_stats = stats[playoff_format][team]
            print(
                f"{team},{rating:.1f},"
                f"{percentage(team_stats['bye'], samples):.2f},"
                f"{percentage(team_stats['main_bracket'], samples):.2f},"
                f"{percentage(team_stats['runner_up'], samples):.2f},"
                f"{percentage(team_stats['champion'], samples):.2f}"
            )

        format_checkpoints = checkpoints[playoff_format]
        print("Champion checkpoints")
        print(
            "Champion had a top-4 bye: "
            f"{percentage(format_checkpoints['champion_top_4'], samples):.2f}%"
        )
        print(
            "Champion was the #1 regular-season seed: "
            f"{percentage(format_checkpoints['champion_top_seed'], samples):.2f}%"
        )
        print(
            "Champion came through the play-in: "
            f"{percentage(format_checkpoints['champion_play_in'], samples):.2f}%"
        )
        print(
            "Average champion regular-season seed: "
            f"{format_checkpoints['champion_seed_sum'] / samples:.2f}"
        )
        if playoff_format == "double":
            print(
                "Grand final required a bracket reset: "
                f"{percentage(format_checkpoints['bracket_reset'], samples):.2f}%"
            )


def main():
    parser = argparse.ArgumentParser(
        description="Compare double- and single-elimination playoffs after a full round robin."
    )
    parser.add_argument("--samples", type=int, default=10_000)
    parser.add_argument("--seed", type=int, default=20260919)
    args = parser.parse_args()
    run(args.samples, args.seed)


if __name__ == "__main__":
    main()

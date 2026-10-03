# -*- coding: utf-8 -*-
"""
Convert raw OCR extraction output into the Player Stats CSV shape.

This does not touch dashboard data. It reads the raw OCR CSV from Downloads and
writes a standardized review CSV beside it.
"""

import argparse
from pathlib import Path

import pandas as pd


DEFAULT_RAW_CSV = Path(r"C:\Users\thoma\Downloads\rocket_league_ocr_player_stats_new.csv")
DEFAULT_OUTPUT_CSV = Path(r"C:\Users\thoma\Downloads\rocket_league_ocr_player_stats_new_standardized.csv")


def clean_team(value: object) -> str:
    if pd.isna(value):
        return ""
    text = str(value).strip()
    if not text or text.lower() == "nan":
        return ""

    replacements = {
        "S DECEPTIT4RDS": "Deceptitards",
        "ÄOECEPTlT4RDS": "Deceptitards",
        "OECEPTIT4RDS": "Deceptitards",
        "0ECEPTIT4RDS": "Deceptitards",
        "CROSSBAR CARTEL": "Crossbar Cartel",
        "SUPERNOVA ABYSS": "Supernova Abyss",
        "THE COX": "The Cox",
    }
    upper = text.upper()
    if upper in replacements:
        return replacements[upper]

    return text.title().replace(" Sc", " SC").replace("Fc", "FC")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw", type=Path, default=DEFAULT_RAW_CSV)
    parser.add_argument("--out", type=Path, default=DEFAULT_OUTPUT_CSV)
    args = parser.parse_args()

    raw = pd.read_csv(args.raw)

    file_order = (
        raw[["source_file", "series_id"]]
        .drop_duplicates()
        .sort_values(["series_id", "source_file"])
        .copy()
    )
    file_order["game_no"] = file_order.groupby("series_id").cumcount() + 1

    raw = raw.merge(file_order, on=["source_file", "series_id"], how="left")
    raw["team_clean"] = raw["scoreboard_team"].map(clean_team)
    raw["opp_clean"] = raw["opponent"].map(clean_team)
    raw["series_key"] = raw.apply(
        lambda row: f"{row['team_clean']} vs {row['opp_clean']}"
        if row["team_clean"] and row["opp_clean"]
        else "",
        axis=1,
    )

    standardized = pd.DataFrame(
        {
            "season": "",
            "split": "",
            "stage": "OCR Extraction",
            "series_key": raw["series_key"],
            "game_no": raw["game_no"],
            "date_range": "",
            "week_round": "",
            "home_team": "",
            "away_team": "",
            "team": raw["team_clean"],
            "player": raw["player"],
            "score": raw["score"],
            "goals": raw["goals"],
            "assists": raw["assists"],
            "saves": raw["saves"],
            "shots": raw["shots"],
            "ping": raw["ping"],
            "schedule_match_status": raw["needs_review"].map(
                lambda value: "ocr_needs_review" if bool(value) else "ocr_extracted"
            ),
        }
    )

    standardized.to_csv(args.out, index=False, encoding="utf-8-sig")
    print(f"Wrote {len(standardized)} rows to {args.out}")


if __name__ == "__main__":
    main()

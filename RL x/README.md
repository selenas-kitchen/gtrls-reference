# RL Season Dashboard

This folder contains a static dashboard for the replay CSV exports in `Replays s5` and `Replays s6`.

Historical S1-S4 aggregate data lives in `manual-history.js` and is merged into the dashboard at load time. This keeps pasted historical stats separate from replay-generated CSV stats.
S5 manual spreadsheet totals are also in `manual-history.js` and replace matching partial replay-generated S5 team/player rows so totals are not double counted.

## Refresh Stats

Run this after adding or replacing replay CSV files:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-dashboard-data.ps1
```

The script rebuilds `dashboard-data.js` with team and player aggregates by season.

Manual history does not need this rebuild step unless you edit `manual-history.js`.

The builder also normalizes known team aliases:

- `GIGA'S IN PARIS` and `GIGAS IN PARIS` are combined as `GIGAS IN PARIS`.
- `MUSTY M1LKERS` and `BMM` are combined as `BMM`.
- Files under `Replays s6\scrims` are combined into a `Scrims` season.
- Files under playoff folders such as `quarterfinals` and `semis` are combined into a separate `S5 Playoffs` season.

Known player aliases are normalized too:

- `Axim0v` and `Ax1mov` are combined as `Ax1mov`.
- `diastriko` is combined as `Ax1mov`.
- `Squirt` is combined as `Ramen`.
- `Selena Gomez` and `selena.` are combined as `Selena Gomez`.

Player rows stay scoped by season and show `Team(s) This Season`, so a player can appear with different teams in different seasons.

The dashboard also has lifetime team and lifetime player tabs. Lifetime rows aggregate the normalized season rows by team or player, while preserving all teams a player has represented.

Scrims are hidden from the default dashboard views. Turn on `Include scrims` to add the `Scrims` season back into all-season summaries, lifetime tabs, leaderboards, and key figures.

`S5 Playoffs` is separate from regular-season and lifetime totals. Select it from the season dropdown to view playoff team, player, roster, leader, and game-log stats.

S2-S4 historical playoff brackets and S3-S4 team info are loaded from manual history. S3/S4 team pages show captain, home stadium, home server, and average MMR when available.
S2-S4 playoff brackets are selectable as their own playoff seasons. The Standings tab shows season standings in the spreadsheet-style order, and draft rows appear on player/team pages when available.

Rows are clickable:

- Click a team row to see that team's player stats for the selected season, or all-time roster from the lifetime team tab.
- Click a player row to see that player's season-by-season career table.
- Click a player season row to see that player's individual game log for that season.
- Click a leaderboard appearance season to see compact season-leader cards for every tracked stat.
- Use the Awards tab to see award history, then click an award to see its race/contenders.
- Search shows the top likely team/player matches without filtering the current table.

Team pages show record and standings points in the header. Standings points are scored as 3 for a sweep, 2 for another series win, 1 for a game-5 series loss, and 0 otherwise.

Player career pages include a career totals row, bolded season career highs, asterisks for season-leading records, leaderboard appearances, S5 awards for players present in the dataset, 2026 World Cup Champion awards, and placeholder sections for future honors. Game logs display clean dates and simplified `Game N` labels.

Player shooting percentage leaders and the `Most Efficient` key figure require at least 15 shots in the selected season.

## Added Metrics

- Team Pressure Rate: `(Shots + Opponent Saves Forced + Boost Stolen + Demos Inflicted) / Games`
- Team Miss %: `(Shots - Goals - Opponent Saves Forced) / Shots`
- Team Save %: `Saves / Shots Allowed`
- Opponent Shooting %: `Goals Allowed / Shots Allowed`
- Player Pressure Rate: `(Shots + Boost Stolen + Demos Inflicted) / Games`
- Pressure Index: `(1.0 * Shots/G) + (1.5 * Opponent Saves Forced/G) + (0.05 * Boost Stolen/G) + (1.0 * Demos/G)`
- PER: `(0.1 * Goals) + (0.05 * Assists) + ((2 / 30) * Saves) + (0.01 * Shots) - (Games Played * 0.1)`
- PER/G: `PER / Games Played`

Team opponent saves forced are exact from the opposing team's saves in the same game. Player opponent saves forced are estimated by each player's share of team non-goal shots, because the CSVs do not attribute opponent saves to individual shooters.

## Run Locally

If Node is available on `PATH`:

```powershell
node .\scripts\server.mjs
```

In this Codex workspace, the bundled Node runtime is here:

```powershell
& 'C:\Users\thoma\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\scripts\server.mjs
```

Then open:

```text
http://127.0.0.1:8765/
```

You can also open `index.html` directly, but the local server is more reliable in modern browsers.

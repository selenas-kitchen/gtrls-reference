Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$teamFiles = Get-ChildItem -Path $root -Recurse -File -Filter "*-teams-games*.csv"
$playerFiles = Get-ChildItem -Path $root -Recurse -File -Filter "*-players-games*.csv"

function Get-SeasonFromPath($path) {
    if ($path -match "\\scrims\\") { return "Scrims" }
    if ($path -match "quarterfinals|semis") { return "S5 Playoffs" }
    if ($path -match "Replays s(\d+)") { return "S$($Matches[1])" }
    return "Unknown"
}

function Get-CleanDate($dateValue) {
    if ([string]::IsNullOrWhiteSpace($dateValue)) { return "" }
    return ([string]$dateValue).Split(" ")[0]
}

function Get-GameLabel($title) {
    $text = [string]$title
    if ($text -match "(?i)\bgame\s*([0-9]+)\b") { return "Game $($Matches[1])" }
    if ($text -match "(?i)\bg+\s*([0-9]+)\b") { return "Game $($Matches[1])" }
    return ""
}

function Get-TeamAliasKey($name) {
    return ([string]$name).ToUpperInvariant() -replace "[^A-Z0-9]", ""
}

function Get-TeamName($name) {
    $key = Get-TeamAliasKey $name
    $aliases = @{
        "GIGASINPARIS" = "GIGAS IN PARIS"
        "MUSTYM1LKERS" = "BMM"
        "BMM" = "BMM"
    }

    if ($aliases.ContainsKey($key)) { return $aliases[$key] }
    return ([string]$name).Trim()
}

function Get-PlayerAliasKey($name) {
    return ([string]$name).ToUpperInvariant() -replace "[^A-Z0-9]", ""
}

function Get-PlayerName($name) {
    $key = Get-PlayerAliasKey $name
    $aliases = @{
        "AXIM0V" = "Ax1mov"
        "AX1MOV" = "Ax1mov"
        "DIASTRIKO" = "Ax1mov"
        "SQUIRT" = "Ramen"
        "SELENAGOMEZ" = "Selena Gomez"
        "SELENA" = "Selena Gomez"
    }

    if ($aliases.ContainsKey($key)) { return $aliases[$key] }
    return ([string]$name).Trim()
}

function Read-SemiCsv($path) {
    $lines = [System.IO.File]::ReadAllLines($path)
    if ($lines.Count -lt 2) { return @() }

    $headers = $lines[0].Split(";")
    $rows = New-Object System.Collections.Generic.List[object]

    for ($i = 1; $i -lt $lines.Count; $i++) {
        if ([string]::IsNullOrWhiteSpace($lines[$i])) { continue }
        $values = $lines[$i].Split(";")
        $row = @{}
        for ($c = 0; $c -lt $headers.Count; $c++) {
            if ($row.ContainsKey($headers[$c])) { continue }
            $row[$headers[$c]] = if ($c -lt $values.Count) { $values[$c] } else { "" }
        }
        $rows.Add($row)
    }

    return $rows
}

function To-Number($value) {
    $out = 0.0
    if ([double]::TryParse([string]$value, [System.Globalization.NumberStyles]::Any, [System.Globalization.CultureInfo]::InvariantCulture, [ref]$out)) {
        return $out
    }
    return 0.0
}

function Ensure-Team($table, $season, $name) {
    $key = "$season|$name"
    if (-not $table.ContainsKey($key)) {
        $table[$key] = [ordered]@{
            season = $season
            name = $name
            games = 0
            wins = 0
            losses = 0
            standingsPoints = 0.0
            score = 0.0
            goals = 0.0
            assists = 0.0
            saves = 0.0
            shots = 0.0
            shotsConceded = 0.0
            goalsConceded = 0.0
            opponentSavesForced = 0.0
            demosInflicted = 0.0
            demosTaken = 0.0
            amountCollected = 0.0
            amountStolen = 0.0
            totalDistance = 0.0
            firstDate = ""
            lastDate = ""
        }
    }
    return $table[$key]
}

function Ensure-Player($table, $season, $name) {
    $key = "$season|$name"
    if (-not $table.ContainsKey($key)) {
        $table[$key] = [ordered]@{
            season = $season
            name = $name
            teams = @{}
            games = 0
            wins = 0
            losses = 0
            standingsPoints = 0.0
            score = 0.0
            goals = 0.0
            assists = 0.0
            saves = 0.0
            shots = 0.0
            shotsConceded = 0.0
            goalsConceded = 0.0
            lastDefenderGoalsConceded = 0.0
            opponentSavesForced = 0.0
            demosInflicted = 0.0
            demosTaken = 0.0
            avgSpeedTotal = 0.0
            avgBoostTotal = 0.0
            amountCollected = 0.0
            amountStolen = 0.0
            totalDistance = 0.0
            firstDate = ""
            lastDate = ""
        }
    }
    return $table[$key]
}

function Add-DateRange($target, $dateValue) {
    if ([string]::IsNullOrWhiteSpace($dateValue)) { return }
    if ($target.firstDate -eq "" -or $dateValue -lt $target.firstDate) { $target.firstDate = $dateValue }
    if ($target.lastDate -eq "" -or $dateValue -gt $target.lastDate) { $target.lastDate = $dateValue }
}

function Add-DateRangeFromItem($target, $item) {
    Add-DateRange $target $item.firstDate
    Add-DateRange $target $item.lastDate
}

function Add-TeamToLifetime($table, $item) {
    $team = Ensure-Team $table "Lifetime" $item.name
    foreach ($field in @("games","wins","losses","standingsPoints","score","goals","assists","saves","shots","shotsConceded","goalsConceded","opponentSavesForced","demosInflicted","demosTaken","amountCollected","amountStolen","totalDistance")) {
        $team[$field] += $item[$field]
    }
    Add-DateRangeFromItem $team $item
}

function Add-PlayerToLifetime($table, $item) {
    $player = Ensure-Player $table "Lifetime" $item.name
    $teamNames = if ($item.teams -is [array]) { $item.teams } else { $item.teams.Keys }
    foreach ($teamName in $teamNames) {
        $player.teams[$teamName] = $true
    }
    foreach ($field in @("games","wins","losses","standingsPoints","score","goals","assists","saves","shots","shotsConceded","goalsConceded","lastDefenderGoalsConceded","opponentSavesForced","demosInflicted","demosTaken","avgSpeedTotal","avgBoostTotal","amountCollected","amountStolen","totalDistance")) {
        $player[$field] += $item[$field]
    }
    Add-DateRangeFromItem $player $item
}

$teams = @{}
$players = @{}
$files = New-Object System.Collections.Generic.List[object]
$seasonGames = @{}
$teamGameRows = New-Object System.Collections.Generic.List[object]
$teamGameLookup = @{}
$playerGameList = New-Object System.Collections.Generic.List[object]

foreach ($file in $teamFiles) {
    $season = Get-SeasonFromPath $file.FullName
    $files.Add([ordered]@{ season = $season; type = "team"; path = $file.FullName.Substring($root.Length + 1) })
    foreach ($row in (Read-SemiCsv $file.FullName)) {
        $teamName = Get-TeamName $row["team name"]
        $opponentName = Get-TeamName $row["opposing team name"]
        $gameKey = "$season|$($row["replay id"])"
        $seasonGames[$gameKey] = $true
        $teamGameKey = "$gameKey|$teamName"
        $teamGameRow = [ordered]@{
            season = $season
            replayId = $row["replay id"]
            teamName = $teamName
            opponentName = $opponentName
            row = $row
            saves = To-Number $row["saves"]
            shots = To-Number $row["shots"]
            goals = To-Number $row["goals"]
        }
        $teamGameRows.Add($teamGameRow)
        $teamGameLookup[$teamGameKey] = $teamGameRow
    }
}

foreach ($gameRow in $teamGameRows) {
    $row = $gameRow.row
    $season = $gameRow.season
    $team = Ensure-Team $teams $season $gameRow.teamName
    $team.games++
    if ($row["result"] -eq "win") { $team.wins++ } else { $team.losses++ }
    foreach ($field in @("score","goals","assists","saves","shots","shots conceded","goals conceded","demos inflicted","demos taken","amount collected","amount stolen","total distance")) {
        $prop = ($field -replace " ","")
        if ($field -eq "shots conceded") { $prop = "shotsConceded" }
        if ($field -eq "goals conceded") { $prop = "goalsConceded" }
        if ($field -eq "demos inflicted") { $prop = "demosInflicted" }
        if ($field -eq "demos taken") { $prop = "demosTaken" }
        if ($field -eq "amount collected") { $prop = "amountCollected" }
        if ($field -eq "amount stolen") { $prop = "amountStolen" }
        if ($field -eq "total distance") { $prop = "totalDistance" }
        $team[$prop] += To-Number $row[$field]
    }
    $opponentKey = "$season|$($gameRow.replayId)|$($gameRow.opponentName)"
    if ($teamGameLookup.ContainsKey($opponentKey)) {
        $team.opponentSavesForced += $teamGameLookup[$opponentKey].saves
    }
    Add-DateRange $team $row["date"]
}

$teamSeriesGroups = $teamGameRows | Group-Object {
    "$($_.season)|$($_.teamName)|$($_.opponentName)|$(Get-CleanDate $_.row["date"])"
}
foreach ($group in $teamSeriesGroups) {
    $first = $group.Group[0]
    $team = Ensure-Team $teams $first.season $first.teamName
    $wins = @($group.Group | Where-Object { $_.row["result"] -eq "win" }).Count
    $losses = @($group.Group | Where-Object { $_.row["result"] -ne "win" }).Count
    $gamesInSeries = $group.Group.Count
    if ($wins -gt $losses) {
        $team.standingsPoints += if ($losses -eq 0) { 3 } else { 2 }
    } elseif ($gamesInSeries -ge 5) {
        $team.standingsPoints += 1
    }
}

foreach ($file in $playerFiles) {
    $season = Get-SeasonFromPath $file.FullName
    $files.Add([ordered]@{ season = $season; type = "player"; path = $file.FullName.Substring($root.Length + 1) })
    foreach ($row in (Read-SemiCsv $file.FullName)) {
        $teamName = Get-TeamName $row["team name"]
        $player = Ensure-Player $players $season (Get-PlayerName $row["player name"])
        $player.games++
        $player.teams[$teamName] = $true
        if ($row["result"] -eq "win") { $player.wins++ } else { $player.losses++ }
        $fieldMap = @{
            "score" = "score"; "goals" = "goals"; "assists" = "assists"; "saves" = "saves"; "shots" = "shots";
            "shots conceded" = "shotsConceded"; "goals conceded" = "goalsConceded";
            "goals conceded while last defender" = "lastDefenderGoalsConceded";
            "demos inflicted" = "demosInflicted"; "demos taken" = "demosTaken";
            "amount collected" = "amountCollected"; "amount stolen" = "amountStolen"; "total distance" = "totalDistance"
        }
        foreach ($field in $fieldMap.Keys) {
            $player[$fieldMap[$field]] += To-Number $row[$field]
        }
        $player.avgSpeedTotal += To-Number $row["avg speed"]
        $player.avgBoostTotal += To-Number $row["avg boost amount"]
        $teamGameKey = "$season|$($row["replay id"])|$teamName"
        $playerOpponentSavesForced = 0.0
        if ($teamGameLookup.ContainsKey($teamGameKey)) {
            $teamGame = $teamGameLookup[$teamGameKey]
            $teamMissableShots = [math]::Max(0, $teamGame.shots - $teamGame.goals)
            $playerMissableShots = [math]::Max(0, (To-Number $row["shots"]) - (To-Number $row["goals"]))
            if ($teamMissableShots -gt 0) {
                $opponentKey = "$season|$($row["replay id"])|$($teamGame.opponentName)"
                if ($teamGameLookup.ContainsKey($opponentKey)) {
                    $playerOpponentSavesForced = ($playerMissableShots / $teamMissableShots) * $teamGameLookup[$opponentKey].saves
                    $player.opponentSavesForced += $playerOpponentSavesForced
                }
            }
        }
        Add-DateRange $player $row["date"]

        $games = 1.0
        $playerShots = To-Number $row["shots"]
        $playerBoostStolen = To-Number $row["amount stolen"]
        $playerDemos = To-Number $row["demos inflicted"]
        $playerGameList.Add([ordered]@{
            season = $season
            replayId = $row["replay id"]
            replayTitle = Get-GameLabel $row["replay title"]
            sortDate = $row["date"]
            date = Get-CleanDate $row["date"]
            result = $row["result"]
            team = $teamName
            opponent = Get-TeamName $row["opposing team name"]
            player = Get-PlayerName $row["player name"]
            score = To-Number $row["score"]
            goals = To-Number $row["goals"]
            assists = To-Number $row["assists"]
            saves = To-Number $row["saves"]
            shots = $playerShots
            shotsConceded = To-Number $row["shots conceded"]
            goalsConceded = To-Number $row["goals conceded"]
            opponentSavesForced = [math]::Round($playerOpponentSavesForced, 2)
            shootingPct = if ($playerShots -gt 0) { [math]::Round(((To-Number $row["goals"]) / $playerShots) * 100, 1) } else { 0 }
            avgSpeed = To-Number $row["avg speed"]
            avgBoost = To-Number $row["avg boost amount"]
            boostCollected = To-Number $row["amount collected"]
            boostStolen = $playerBoostStolen
            demosInflicted = $playerDemos
            demosTaken = To-Number $row["demos taken"]
            per = [math]::Round((0.1 * (To-Number $row["goals"])) + (0.05 * (To-Number $row["assists"])) + ((2.0 / 30.0) * (To-Number $row["saves"])) + (0.01 * $playerShots) - ($games * 0.1), 2)
            perPerGame = [math]::Round(((0.1 * (To-Number $row["goals"])) + (0.05 * (To-Number $row["assists"])) + ((2.0 / 30.0) * (To-Number $row["saves"])) + (0.01 * $playerShots) - ($games * 0.1)) / $games, 3)
            pressureRate = [math]::Round(($playerShots + $playerBoostStolen + $playerDemos) / $games, 2)
            pressureIndex = [math]::Round(
                $playerShots +
                (1.5 * $playerOpponentSavesForced) +
                (0.05 * $playerBoostStolen) +
                $playerDemos,
                2
            )
        })
    }
}

$playerGameGroups = $playerGameList | Group-Object { "$($_.season)|$($_.player)" }
foreach ($group in $playerGameGroups) {
    $index = 1
    foreach ($game in ($group.Group | Sort-Object sortDate)) {
        if ([string]::IsNullOrWhiteSpace($game.replayTitle)) {
            $game.replayTitle = "Game $index"
        }
        $index++
    }
}

function Finalize-Common($item) {
    $games = [math]::Max(1, $item.games)
    $item.winPct = [math]::Round(($item.wins / $games) * 100, 1)
    $item.avgScore = [math]::Round($item.score / $games, 1)
    $item.goalsPerGame = [math]::Round($item.goals / $games, 2)
    $item.assistsPerGame = [math]::Round($item.assists / $games, 2)
    $item.savesPerGame = [math]::Round($item.saves / $games, 2)
    $item.shotsPerGame = [math]::Round($item.shots / $games, 2)
    $item.shotsConcededPerGame = [math]::Round($item.shotsConceded / $games, 2)
    $item.goalsConcededPerGame = [math]::Round($item.goalsConceded / $games, 2)
    $item.per = [math]::Round((0.1 * $item.goals) + (0.05 * $item.assists) + ((2.0 / 30.0) * $item.saves) + (0.01 * $item.shots) - ($item.games * 0.1), 2)
    $item.perPerGame = [math]::Round($item.per / $games, 3)
    $item.shootingPct = if ($item.shots -gt 0) { [math]::Round(($item.goals / $item.shots) * 100, 1) } else { 0 }
    $item.teamSaveRate = if ($item.shotsConceded -gt 0) { [math]::Round(($item.saves / $item.shotsConceded) * 100, 1) } else { 0 }
    $item.opponentShootingPct = if ($item.shotsConceded -gt 0) { [math]::Round(($item.goalsConceded / $item.shotsConceded) * 100, 1) } else { 0 }
    $item.pointsPerGame = [math]::Round($item.standingsPoints / $games, 2)
    $item.goalDiff = $item.goals - $item.goalsConceded
    $item.demosPerGame = [math]::Round($item.demosInflicted / $games, 2)
    $item.distancePerGame = [math]::Round($item.totalDistance / $games, 0)
    $item.boostCollectedPerGame = [math]::Round($item.amountCollected / $games, 0)
    $item.boostStolenPerGame = [math]::Round($item.amountStolen / $games, 0)
    $item.opponentSavesForcedPerGame = [math]::Round($item.opponentSavesForced / $games, 2)
    $item.pressureIndex = [math]::Round(
        ($item.shots / $games) +
        (1.5 * ($item.opponentSavesForced / $games)) +
        (0.05 * ($item.amountStolen / $games)) +
        ($item.demosInflicted / $games),
        2
    )
}

$teamList = New-Object System.Collections.Generic.List[object]
foreach ($item in $teams.Values) {
    Finalize-Common $item
    $item.pressureRate = [math]::Round(($item.shots + $item.opponentSavesForced + $item.amountStolen + $item.demosInflicted) / [math]::Max(1, $item.games), 2)
    $item.missPct = if ($item.shots -gt 0) { [math]::Round((($item.shots - $item.goals - $item.opponentSavesForced) / $item.shots) * 100, 1) } else { 0 }
    $teamList.Add([pscustomobject]$item)
}

$playerList = New-Object System.Collections.Generic.List[object]
foreach ($item in $players.Values) {
    Finalize-Common $item
    $item.avgSpeed = [math]::Round($item.avgSpeedTotal / [math]::Max(1, $item.games), 0)
    $item.avgBoost = [math]::Round($item.avgBoostTotal / [math]::Max(1, $item.games), 1)
    $item.pressureRate = [math]::Round(($item.shots + $item.amountStolen + $item.demosInflicted) / [math]::Max(1, $item.games), 2)
    $item.teams = @($item.teams.Keys | Sort-Object)
    $playerList.Add([pscustomobject]$item)
}

$lifetimeTeams = @{}
foreach ($item in $teams.Values) {
    Add-TeamToLifetime $lifetimeTeams $item
}

$lifetimePlayers = @{}
foreach ($item in $players.Values) {
    Add-PlayerToLifetime $lifetimePlayers $item
}

$lifetimeTeamList = New-Object System.Collections.Generic.List[object]
foreach ($item in $lifetimeTeams.Values) {
    Finalize-Common $item
    $item.pressureRate = [math]::Round(($item.shots + $item.opponentSavesForced + $item.amountStolen + $item.demosInflicted) / [math]::Max(1, $item.games), 2)
    $item.missPct = if ($item.shots -gt 0) { [math]::Round((($item.shots - $item.goals - $item.opponentSavesForced) / $item.shots) * 100, 1) } else { 0 }
    $lifetimeTeamList.Add([pscustomobject]$item)
}

$lifetimePlayerList = New-Object System.Collections.Generic.List[object]
foreach ($item in $lifetimePlayers.Values) {
    Finalize-Common $item
    $item.avgSpeed = [math]::Round($item.avgSpeedTotal / [math]::Max(1, $item.games), 0)
    $item.avgBoost = [math]::Round($item.avgBoostTotal / [math]::Max(1, $item.games), 1)
    $item.pressureRate = [math]::Round(($item.shots + $item.amountStolen + $item.demosInflicted) / [math]::Max(1, $item.games), 2)
    $item.teams = @($item.teams.Keys | Sort-Object)
    $lifetimePlayerList.Add([pscustomobject]$item)
}

$seasons = @($teamList | Select-Object -ExpandProperty season -Unique | Sort-Object)
$summary = New-Object System.Collections.Generic.List[object]
foreach ($season in $seasons) {
    $summary.Add([ordered]@{
        season = $season
        games = @($seasonGames.Keys | Where-Object { $_ -like "$season|*" }).Count
        teams = @($teamList | Where-Object { $_.season -eq $season }).Count
        players = @($playerList | Where-Object { $_.season -eq $season }).Count
    })
}

$payload = [ordered]@{
    generatedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    seasons = $seasons
    summary = $summary
    teams = @($teamList | Sort-Object season,name)
    players = @($playerList | Sort-Object season,name)
    lifetimeTeams = @($lifetimeTeamList | Sort-Object name)
    lifetimePlayers = @($lifetimePlayerList | Sort-Object name)
    playerGames = @($playerGameList | Sort-Object season,player,date)
    files = @($files | Sort-Object season,type,path)
}

$json = $payload | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText((Join-Path $root "dashboard-data.js"), "window.RL_DASHBOARD_DATA = $json;`n")
Write-Host "Wrote dashboard-data.js with $($teamList.Count) team rows, $($playerList.Count) player rows, $($lifetimeTeamList.Count) lifetime teams, and $($lifetimePlayerList.Count) lifetime players."

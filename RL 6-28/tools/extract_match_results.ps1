param(
  [string]$AttachmentsDir = "C:\Users\thoma\Dropbox\GTRLS\match_results\media\attachments",
  [string]$OutCsv = "C:\Users\thoma\Dropbox\RL\match_results_player_stats_master.csv",
  [string]$OutReviewCsv = "C:\Users\thoma\Dropbox\RL\match_results_review.csv"
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.FileAccessMode, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.Streams.IRandomAccessStream, Windows.Storage.Streams, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null

function Await-Operation($Operation, [Type]$ResultType) {
  $method = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq "AsTask" -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 } |
    Select-Object -First 1
  $task = $method.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.Wait()
  $task.Result
}

function Normalize-Name([string]$Text) {
  if ([string]::IsNullOrWhiteSpace($Text)) { return "" }
  $clean = $Text.Trim()
  $clean = $clean -replace "\[[^\]]+\]\s*", ""
  $clean = $clean -replace "^[\[\(]?[A-Za-z0-9]{1,5}[\]\)]\s*", ""
  $clean = $clean -replace "^(GTI|GT|PXG|GVO|STOP|POST|Q|5|TRA|RAN|GS|NEM)\s+", ""
  $clean = $clean -replace "^[^\w]+", ""
  $clean = $clean -replace "\s+", " "
  $clean.Trim()
}

function Normalize-Team([string]$Text) {
  if ([string]::IsNullOrWhiteSpace($Text)) { return "" }
  $clean = $Text.Trim().ToUpperInvariant()
  $clean = $clean -replace "CART.L", "CARTEL"
  $clean = $clean -replace "OECEPT", "DECEPT"
  $clean = $clean -replace "0ECEPT", "DECEPT"
  $clean = $clean -replace "\s+", " "
  $clean.Trim()
}

function Get-UploadDateFromName([string]$Name, [datetime]$Fallback) {
  if ($Name -match "^[^_]+_(\d{13})\.(png|jpg|jpeg)$") {
    try {
      return [DateTimeOffset]::FromUnixTimeMilliseconds([Int64]$Matches[1]).ToLocalTime().DateTime
    } catch {
      return $Fallback
    }
  }
  $Fallback
}

function Get-NumberInBand($Words, [double]$Y, [double]$XMin, [double]$XMax) {
  $values = $Words |
    Where-Object { $_.x -ge $XMin -and $_.x -lt $XMax -and [math]::Abs($_.cy - $Y) -lt 18 -and $_.text -match "^-?\d+$" } |
    Sort-Object x |
    ForEach-Object { $_.text }
  if (-not $values -or $values.Count -eq 0) { return 0 }
  [int]($values -join "")
}

function Get-TeamName($Lines, [double]$YMin, [double]$YMax) {
  $candidates = $Lines |
    Where-Object {
      $_.x -ge 500 -and $_.x -le 980 -and $_.y -ge $YMin -and $_.y -le $YMax -and
      $_.text -notmatch "SERIES|WINNER|SCORE|GOALS|ASSISTS|SAVES|SHOTS|PING|SPECTATING"
    } |
    Sort-Object @{ Expression = "y" }, @{ Expression = "x" }
  if (-not $candidates -or $candidates.Count -eq 0) { return "" }
  $best = $candidates | Sort-Object @{ Expression = { -1 * $_.height } }, @{ Expression = "y" } | Select-Object -First 1
  Normalize-Team $best.text
}

function Get-PlayerRows($Words, [double]$YMin, [double]$YMax) {
  $scoreWords = $Words |
    Where-Object { $_.x -ge 960 -and $_.x -lt 1065 -and $_.y -ge $YMin -and $_.y -le $YMax -and $_.text -match "^\d+$" } |
    Sort-Object y, x
  $rows = @()
  foreach ($word in $scoreWords) {
    $near = $rows | Where-Object { [math]::Abs($_.y - $word.cy) -lt 16 } | Select-Object -First 1
    if ($near) {
      $near.y = ($near.y + $word.cy) / 2
    } else {
      $rows += [pscustomobject]@{ y = $word.cy }
    }
  }
  $rows |
    Sort-Object y |
    ForEach-Object {
      $rowY = $_.y
      $nameText = ($Words |
        Where-Object { $_.x -ge 635 -and $_.x -lt 910 -and [math]::Abs($_.cy - $rowY) -lt 18 -and $_.height -ge 15 } |
        Sort-Object x |
        ForEach-Object { $_.text }) -join " "
      [pscustomobject]@{ y = $_.y; player = (Normalize-Name $nameText) }
    } |
    Where-Object { $_.player -and $_.player -notmatch "^(ELITE|S13|TEAM|S21|GRAND|CROSSBAR|TOURNAMENT|WINNER|CHAMPION|USA)$" }
}

function Read-Ocr($Path, $Engine) {
  $file = Await-Operation ([Windows.Storage.StorageFile]::GetFileFromPathAsync($Path)) ([Windows.Storage.StorageFile])
  $stream = Await-Operation ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $decoder = Await-Operation ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bitmap = Await-Operation ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $result = Await-Operation ($Engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])

  $lines = @()
  $words = @()
  foreach ($line in $result.Lines) {
    $lineWords = @($line.Words)
    if ($lineWords.Count -eq 0) { continue }
    $x = [double]::PositiveInfinity
    $y = [double]::PositiveInfinity
    $x2 = 0.0
    $y2 = 0.0
    foreach ($wordForBounds in $lineWords) {
      $bounds = $wordForBounds.BoundingRect
      if ($bounds.X -lt $x) { $x = $bounds.X }
      if ($bounds.Y -lt $y) { $y = $bounds.Y }
      if (($bounds.X + $bounds.Width) -gt $x2) { $x2 = $bounds.X + $bounds.Width }
      if (($bounds.Y + $bounds.Height) -gt $y2) { $y2 = $bounds.Y + $bounds.Height }
    }
    $lines += [pscustomobject]@{
      text = $line.Text
      x = [double]$x
      y = [double]$y
      width = [double]($x2 - $x)
      height = [double]($y2 - $y)
    }
    foreach ($word in $lineWords) {
      $r = $word.BoundingRect
      $words += [pscustomobject]@{
        text = $word.Text
        x = [double]$r.X
        y = [double]$r.Y
        width = [double]$r.Width
        height = [double]$r.Height
        cy = [double]($r.Y + ($r.Height / 2))
      }
    }
  }
  [pscustomobject]@{ Lines = $lines; Words = $words }
}

$lang = New-Object Windows.Globalization.Language "en-US"
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
if ($null -eq $engine) { throw "Windows OCR engine for en-US is unavailable." }

$files = Get-ChildItem -LiteralPath $AttachmentsDir -File |
  Where-Object { $_.Extension -match "^\.(png|jpg|jpeg)$" } |
  Sort-Object {
    if ($_.BaseName -match "^(\d+)_") { [int]$Matches[1] } else { 999999 }
  }, Name

$allRows = New-Object System.Collections.Generic.List[object]
$reviewRows = New-Object System.Collections.Generic.List[object]
$index = 0

foreach ($file in $files) {
  $index += 1
  Write-Progress -Activity "Extracting Rocket League scoreboards" -Status $file.Name -PercentComplete (($index / [math]::Max($files.Count, 1)) * 100)

  try {
    $ocr = Read-Ocr $file.FullName $engine
    $lines = @($ocr.Lines)
    $words = @($ocr.Words)
    $uploadDate = Get-UploadDateFromName $file.Name $file.CreationTime
    $seriesId = if ($file.BaseName -match "^(\d+)_") { $Matches[1] } else { "" }

    $topTeam = Get-TeamName $lines 170 240
    $bottomTeam = Get-TeamName $lines 430 500
    $topPlayers = @(Get-PlayerRows $words 235 390)
    $bottomPlayers = @(Get-PlayerRows $words 495 650)
    $topScore = Get-NumberInBand $words 210 515 610
    $bottomScore = Get-NumberInBand $words 470 515 610
    if ($topScore -eq 0 -and $bottomScore -eq 0) {
      $seriesWinnerScore = @($words | Where-Object { $_.x -ge 520 -and $_.x -le 600 -and $_.y -ge 175 -and $_.y -le 235 -and $_.text -match "^\d+$" } | Sort-Object x | Select-Object -First 1)
      if ($seriesWinnerScore.Count) { $topScore = [int]$seriesWinnerScore[0].text }
    }

    foreach ($entry in @(
      @{ Team = $topTeam; Opponent = $bottomTeam; TeamScore = $topScore; OpponentScore = $bottomScore; Players = $topPlayers },
      @{ Team = $bottomTeam; Opponent = $topTeam; TeamScore = $bottomScore; OpponentScore = $topScore; Players = $bottomPlayers }
    )) {
      foreach ($playerRow in $entry.Players) {
        $y = $playerRow.y
        $score = Get-NumberInBand $words $y 960 1065
        $goals = Get-NumberInBand $words $y 1080 1160
        $assists = Get-NumberInBand $words $y 1180 1265
        $saves = Get-NumberInBand $words $y 1285 1365
        $shots = Get-NumberInBand $words $y 1385 1460
        $ping = Get-NumberInBand $words $y 1475 1540
        $allRows.Add([pscustomobject]@{
          source_file = $file.Name
          series_id = $seriesId
          upload_date = $uploadDate.ToString("yyyy-MM-dd HH:mm:ss")
          file_created = $file.CreationTime.ToString("yyyy-MM-dd HH:mm:ss")
          home_team = ""
          away_team = ""
          scoreboard_team = $entry.Team
          opponent = $entry.Opponent
          team_score = $entry.TeamScore
          opponent_score = $entry.OpponentScore
          player = $playerRow.player
          score = $score
          goals = $goals
          assists = $assists
          saves = $saves
          shots = $shots
          ping = $ping
          needs_review = (($entry.Team -eq "") -or ($entry.Opponent -eq "") -or ($playerRow.player -eq "") -or ($score -eq 0 -and $goals -eq 0 -and $assists -eq 0 -and $saves -eq 0 -and $shots -eq 0))
        })
      }
    }

    if ($topPlayers.Count -lt 2 -or $bottomPlayers.Count -lt 2 -or -not $topTeam -or -not $bottomTeam) {
      $reviewRows.Add([pscustomobject]@{
        source_file = $file.Name
        series_id = $seriesId
        upload_date = $uploadDate.ToString("yyyy-MM-dd HH:mm:ss")
        top_team = $topTeam
        bottom_team = $bottomTeam
        top_players = ($topPlayers.player -join "; ")
        bottom_players = ($bottomPlayers.player -join "; ")
        ocr_text = (($lines | ForEach-Object { $_.text }) -join " | ")
      })
    }
  } catch {
    $reviewRows.Add([pscustomobject]@{
      source_file = $file.Name
      series_id = ""
      upload_date = ""
      top_team = ""
      bottom_team = ""
      top_players = ""
      bottom_players = ""
      ocr_text = "ERROR: $($_.Exception.Message)"
    })
  }
}

$allRows | Export-Csv -LiteralPath $OutCsv -NoTypeInformation -Encoding UTF8
$reviewRows | Export-Csv -LiteralPath $OutReviewCsv -NoTypeInformation -Encoding UTF8

Write-Host "Wrote $($allRows.Count) player rows to $OutCsv"
Write-Host "Wrote $($reviewRows.Count) review rows to $OutReviewCsv"

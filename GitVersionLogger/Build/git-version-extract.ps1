Param(
  [string]$filePath
)
$time = Get-Date

$time.ToShortDateString() + " " + $time.ToLongTimeString() + " - " + (git rev-parse --abbrev-ref HEAD) + " - " + (git describe --dirty --always) | Out-File $filePath
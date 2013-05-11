Param(
  [string]$filePath
)
$time = Get-Date

$time.ToShortDateString() + " " + $time.ToLongTimeString() + " - " + (git describe --dirty --always) | Out-File $filePath
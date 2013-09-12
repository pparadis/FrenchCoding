Param(
  [string]$filePath
)
$time = Get-Date
$data = $time.ToShortDateString() + " " + $time.ToLongTimeString() + " - " + (git rev-parse --abbrev-ref HEAD) + " - " + (git describe --dirty --always)

$data | Out-File "$filePath\version.txt"

$original_file = $filePath + "/\Build\AssemblyInfo.template.cs"
$destination_file =  $filePath + "\Properties\AssemblyInfo.cs"

(Get-Content $original_file) -replace "##GIT-VERSION-INFO##", $data | Set-Content $destination_file
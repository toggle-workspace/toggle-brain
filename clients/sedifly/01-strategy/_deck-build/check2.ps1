param([string]$src, [string]$out)
if (Test-Path $out) { Remove-Item -Recurse -Force $out -Confirm:$false }
New-Item -ItemType Directory -Force $out | Out-Null
$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open($src, $true, $false, $false)
$problems = 0
foreach ($sl in $pres.Slides) {
  foreach ($sh in $sl.Shapes) {
    if ($sh.HasTextFrame -and $sh.TextFrame2.HasText) {
      $tr = $sh.TextFrame2.TextRange
      $need = $tr.BoundHeight
      if ($need -gt $sh.Height + 3) {
        $problems++
        $t = $tr.Text; if ($t.Length -gt 60) { $t = $t.Substring(0,60) }
        "S{0}: needs {1:N0}pt, box {2:N0}pt  [{3}]" -f $sl.SlideIndex, $need, $sh.Height, $t
      }
    }
  }
}
"problems: $problems"
$pres.SaveCopyAs($out, 18)
$pres.Close(); $app.Quit()

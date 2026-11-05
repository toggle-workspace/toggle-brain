param([string]$src, [string]$out)
# Overflow check + PNG export of every slide via PowerPoint COM.
if (Test-Path $out) { Remove-Item -Recurse -Force $out -Confirm:$false }
New-Item -ItemType Directory -Force $out | Out-Null
$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open($src, $true, $false, $false)
$problems = 0
foreach ($sl in $pres.Slides) {
  foreach ($sh in $sl.Shapes) {
    if ($sh.HasTextFrame -and $sh.TextFrame2.HasText) {
      $need = $sh.TextFrame2.TextRange.BoundHeight
      if ($need -gt $sh.Height + 3) {
        $problems++
        $t = $sh.TextFrame2.TextRange.Text; if ($t.Length -gt 60) { $t = $t.Substring(0,60) }
        "S{0}: needs {1:N0}pt, box {2:N0}pt  [{3}]" -f $sl.SlideIndex, $need, $sh.Height, $t
      }
    }
    if ($sh.HasTable) {
      $tb = $sh.Table; $sum = 0
      for ($r = 1; $r -le $tb.Rows.Count; $r++) { $sum += $tb.Rows.Item($r).Height }
      if (($sh.Top + $sum) -gt 488) { $problems++; "S{0}: table bottom at {1:N0}pt (limit 488)" -f $sl.SlideIndex, ($sh.Top + $sum) }
    }
  }
  $sl.Export((Join-Path $out ("s{0:D2}.png" -f $sl.SlideIndex)), 'PNG', 1600, 900)
}
"problems: $problems"
$pres.Close(); $app.Quit()

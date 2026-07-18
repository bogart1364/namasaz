$ErrorActionPreference = 'Stop'
$out = "C:\botiq\public\assets\renders"

$bg='#0a0a0a'; $bg2='#0e0d0c'; $line='#6b665e'; $line2='#3a3733'
$wood='#9c7b54'; $stone='#b8b4ac'; $steel='#a8a39b'; $red='#c0392b'

function Header {
@"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="$bg2"/><stop offset="1" stop-color="$bg"/></linearGradient>
<radialGradient id="vig" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.5"/></radialGradient></defs>
<rect width="1200" height="800" fill="url(#bg)"/>
"@
}
function Footer { '<rect width="1200" height="800" fill="url(#vig)"/></svg>' }
function Base($accent=$red){
  $l = @()
  $l += "<line x1='0' y1='640' x2='1200' y2='640' stroke='$line2' stroke-width='1'/>"
  $l += "<circle cx='980' cy='200' r='46' fill='none' stroke='$stone' stroke-opacity='0.18' stroke-width='1.5'/>"
  $l += "<rect x='0' y='636' width='1200' height='3' fill='$accent' opacity='0.35'/>"
  $l -join "`n"
}

# 06 Interior Lighting
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='300' y='220' width='600' height='420'/>`n") | Out-Null
$sb.Append("<line x1='300' y1='220' x2='900' y2='220' stroke='$stone' stroke-width='2' opacity='0.6'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
for($i=0;$i -lt 5;$i++){ $x=350+$i*100; $sb.Append("<line x1='$x' y1='220' x2='$('{0}' -f ($x-40))' y2='640' stroke='$stone' stroke-width='1.2' opacity='0.18'/>`n") | Out-Null }
$sb.Append("<line x1='600' y1='220' x2='600' y2='640' stroke='$red' stroke-width='3' opacity='0.7'/>`n") | Out-Null
$sb.Append("<circle cx='600' cy='210' r='30' fill='none' stroke='$red' stroke-width='2' opacity='0.9'/>`n") | Out-Null
Set-Content -Path "$out/article-06.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 07 Wooden Northern Homes
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
for($i=0;$i -lt 3;$i++){ $x=200+$i*300
  $sb.Append("<rect x='$x' y='400' width='200' height='190'/>`n") | Out-Null
  $sb.Append("<path d='M$x 400 L $('{0}' -f ($x+100)) 340 L $('{0}' -f ($x+200)) 400 Z'/>`n") | Out-Null
}
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$wood' stroke-width='2' opacity='0.8' fill='none'>`n") | Out-Null
for($i=0;$i -lt 3;$i++){ $x=200+$i*300; for($k=0;$k -lt 4;$k++){ $y=430+$k*40; $sb.Append("<line x1='$x' y1='$y' x2='$('{0}' -f ($x+200))' y2='$y'/>`n") | Out-Null } }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<polyline points='120,600 400,560 700,600 1000,560 1140,600' fill='none' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
Set-Content -Path "$out/article-07.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 08 Concrete & Wood dialogue
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<rect x='140' y='240' width='460' height='400' fill='none' stroke='$line' stroke-width='2'/>`n") | Out-Null
$sb.Append("<g stroke='$line2' stroke-width='1.5' opacity='0.5' fill='none'>`n") | Out-Null
for($j=1;$j -lt 5;$j++){ $y=240+$j*80; $sb.Append("<line x1='140' y1='$y' x2='600' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='640' y='240' width='460' height='400' fill='none' stroke='$wood' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
$sb.Append("<g stroke='$wood' stroke-width='1.5' opacity='0.6' fill='none'>`n") | Out-Null
for($k=0;$k -lt 6;$k++){ $y=270+$k*65; $sb.Append("<line x1='640' y1='$y' x2='1100' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='560' y='240' width='80' height='400' fill='none' stroke='$red' stroke-width='2.5' opacity='0.8'/>`n") | Out-Null
Set-Content -Path "$out/article-08.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 09 Facade Design
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='260' y='200' width='680' height='440'/>`n") | Out-Null
for($i=1;$i -lt 7;$i++){ $x=260+$i*97; $sb.Append("<line x1='$x' y1='200' x2='$x' y2='640'/>`n") | Out-Null }
for($j=1;$j -lt 5;$j++){ $y=200+$j*88; $sb.Append("<line x1='260' y1='$y' x2='940' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='450' y='360' width='160' height='200' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
$sb.Append("<line x1='260' y1='200' x2='940' y2='200' stroke='$stone' stroke-width='2' opacity='0.5'/>`n") | Out-Null
Set-Content -Path "$out/article-09.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 10 Brutalism
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2.5' fill='none'>`n") | Out-Null
$sb.Append("<rect x='240' y='300' width='300' height='340'/>`n") | Out-Null
$sb.Append("<rect x='560' y='220' width='400' height='420'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$line2' stroke-width='1.5' opacity='0.5' fill='none'>`n") | Out-Null
for($i=1;$i -lt 5;$i++){ $y=220+$i*84; $sb.Append("<line x1='560' y1='$y' x2='960' y2='$y'/>`n") | Out-Null }
for($i=1;$i -lt 4;$i++){ $x=560+$i*100; $sb.Append("<line x1='$x' y1='220' x2='$x' y2='640'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='600' y='440' width='120' height='120' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
Set-Content -Path "$out/article-10.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 11 Small Smart Spaces
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='420' y='240' width='360' height='360'/>`n") | Out-Null
$sb.Append("<line x1='600' y1='240' x2='600' y2='600' opacity='0.5'/>`n") | Out-Null
$sb.Append("<line x1='420' y1='420' x2='780' y2='420' opacity='0.5'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='450' y='270' width='120' height='120' fill='none' stroke='$wood' stroke-width='2' opacity='0.8'/>`n") | Out-Null
$sb.Append("<rect x='630' y='450' width='120' height='120' fill='none' stroke='$steel' stroke-width='2' opacity='0.8'/>`n") | Out-Null
$sb.Append("<circle cx='690' cy='330' r='26' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
Set-Content -Path "$out/article-11.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 12 Color in Architecture
$sb = [System.Text.StringBuilder]::new()
$sb.Append("<g stroke='$line2' stroke-width='1.5' fill='none'>`n") | Out-Null
$sb.Append((Base)) | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g fill='none'>`n") | Out-Null
$sb.Append("<circle cx='360' cy='360' r='80' stroke='$stone' stroke-width='2' opacity='0.7'/>`n") | Out-Null
$sb.Append("<circle cx='600' cy='360' r='80' stroke='$wood' stroke-width='2' opacity='0.8'/>`n") | Out-Null
$sb.Append("<circle cx='840' cy='360' r='80' stroke='$red' stroke-width='2.5' opacity='0.9'/>`n") | Out-Null
$sb.Append("<circle cx='480' cy='500' r='80' stroke='$steel' stroke-width='2' opacity='0.7'/>`n") | Out-Null
$sb.Append("<circle cx='720' cy='500' r='80' stroke='$line' stroke-width='2' opacity='0.7'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
Set-Content -Path "$out/article-12.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 13 Iranian Courtyard
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='280' y='260' width='640' height='380'/>`n") | Out-Null
$sb.Append("<rect x='430' y='410' width='340' height='230'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$wood' stroke-width='2' opacity='0.75' fill='none'>`n") | Out-Null
$sb.Append("<line x1='280' y1='330' x2='920' y2='330'/>`n") | Out-Null
$sb.Append("<line x1='280' y1='560' x2='920' y2='560'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<line x1='600' y1='410' x2='600' y2='640' stroke='$red' stroke-width='2.5' opacity='0.8'/>`n") | Out-Null
$sb.Append("<circle cx='600' cy='360' r='20' fill='none' stroke='$stone' stroke-width='1.5' opacity='0.5'/>`n") | Out-Null
Set-Content -Path "$out/article-13.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 14 Minimal Interior
$sb = [System.Text.StringBuilder]::new()
$sb.Append("<rect width='1200' height='800' fill='url(#bg)'/>`n".Replace('url(#bg)','url(#bg)')) | Out-Null
$sb.Append("<g stroke='$line2' stroke-width='1.5' fill='none'>`n") | Out-Null
$sb.Append("<line x1='0' y1='560' x2='1200' y2='560'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='250' y='360' width='300' height='40'/>`n") | Out-Null
$sb.Append("<rect x='650' y='300' width='220' height='260'/>`n") | Out-Null
$sb.Append("<line x1='250' y1='440' x2='250' y2='560'/>`n") | Out-Null
$sb.Append("<line x1='550' y1='440' x2='550' y2='560'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<circle cx='760' cy='430' r='22' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
$sb.Append("<line x1='0' y1='556' x2='1200' y2='556' stroke='$red' stroke-width='3' opacity='0.3'/>`n") | Out-Null
Set-Content -Path "$out/article-14.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 15 Industry & Architecture
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$steel' stroke-width='2' fill='none' opacity='0.9'>`n") | Out-Null
$sb.Append("<rect x='220' y='280' width='760' height='360'/>`n") | Out-Null
for($i=1;$i -lt 9;$i++){ $x=220+$i*84; $sb.Append("<line x1='$x' y1='280' x2='$x' y2='640'/>`n") | Out-Null }
for($j=1;$j -lt 4;$j++){ $y=280+$j*90; $sb.Append("<line x1='220' y1='$y' x2='980' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$red' stroke-width='2.5' opacity='0.85' fill='none'>`n") | Out-Null
for($i=0;$i -lt 4;$i++){ $x=340+$i*150; $sb.Append("<line x1='$x' y1='320' x2='$x' y2='600'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
Set-Content -Path "$out/article-15.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 16 Renovation
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='300' y='240' width='360' height='400'/>`n") | Out-Null
$sb.Append("<path d='M300 240 L480 180 L660 240 Z'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$wood' stroke-width='2' opacity='0.8' stroke-dasharray='8 6' fill='none'>`n") | Out-Null
$sb.Append("<rect x='540' y='320' width='340' height='320'/>`n") | Out-Null
$sb.Append("<line x1='540' y1='320' x2='880' y2='480'/>`n") | Out-Null
$sb.Append("<line x1='880' y1='320' x2='540' y2='480'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='440' y='460' width='120' height='140' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
Set-Content -Path "$out/article-16.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 17 Solar & Sustainability
$sb = [System.Text.StringBuilder]::new()
$sb.Append("<circle cx='600' cy='280' r='70' fill='none' stroke='$red' stroke-width='3' opacity='0.85'/>`n") | Out-Null
$sb.Append("<g stroke='$stone' stroke-width='1.5' opacity='0.5'>`n") | Out-Null
for($i=0;$i -lt 12;$i++){ $a=$i*30; $x=[math]::Round(600+[math]::Cos($a*3.14159/180)*150); $y=[math]::Round(280-[math]::Sin($a*3.14159/180)*150); $sb.Append("<line x1='600' y1='280' x2='$x' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='420' y='470' width='360' height='170'/>`n") | Out-Null
for($i=1;$i -lt 4;$i++){ $x=420+$i*90; $sb.Append("<line x1='$x' y1='470' x2='$x' y2='640'/>`n") | Out-Null }
$sb.Append("<line x1='420' y1='540' x2='780' y2='540' opacity='0.5'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<line x1='0' y1='640' x2='1200' y2='640' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
Set-Content -Path "$out/article-17.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 18 Modern Villa Design
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='260' y='300' width='680' height='300'/>`n") | Out-Null
$sb.Append("<line x1='260' y1='420' x2='940' y2='420' stroke='$wood' stroke-width='2' opacity='0.8'/>`n") | Out-Null
for($i=1;$i -lt 6;$i++){ $x=260+$i*113; $sb.Append("<line x1='$x' y1='420' x2='$x' y2='600'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='540' y='350' width='160' height='70' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
$sb.Append("<rect x='160' y='640' width='880' height='2' stroke='$steel' stroke-width='1.5' opacity='0.4'/>`n") | Out-Null
$sb.Append("<polyline points='160,685 400,670 600,685 800,670 1040,685' fill='none' stroke='$line2' stroke-width='1.5' opacity='0.7'/>`n") | Out-Null
Set-Content -Path "$out/article-18.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 19 Handcrafted Rustic Furniture
$sb = [System.Text.StringBuilder]::new()
$sb.Append("<rect width='1200' height='800' fill='url(#bg)'/>`n".Replace('url(#bg)','url(#bg)')) | Out-Null
$sb.Append("<g stroke='$wood' stroke-width='2.5' fill='none' opacity='0.9'>`n") | Out-Null
$sb.Append("<path d='M360 560 L360 420 Q360 380 420 380 L760 380 Q820 380 820 420 L820 560'/>`n") | Out-Null
$sb.Append("<line x1='360' y1='470' x2='820' y2='470' opacity='0.6'/>`n") | Out-Null
$sb.Append("<line x1='420' y1='560' x2='420' y2='600'/>`n") | Out-Null
$sb.Append("<line x1='760' y1='560' x2='760' y2='600'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$line2' stroke-width='1.2' opacity='0.6' fill='none'>`n") | Out-Null
for($i=0;$i -lt 6;$i++){ $x=380+$i*75; $sb.Append("<line x1='$x' y1='390' x2='$x' y2='460'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<circle cx='600' cy='300' r='24' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
$sb.Append("<line x1='0' y1='600' x2='1200' y2='600' stroke='$red' stroke-width='3' opacity='0.3'/>`n") | Out-Null
Set-Content -Path "$out/article-19.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 20 Architecture & Local Identity
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<path d='M200 600 L420 360 L640 600'/>`n") | Out-Null
$sb.Append("<path d='M440 600 L660 380 L880 600'/>`n") | Out-Null
$sb.Append("<path d='M680 600 L860 420 L1040 600'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$wood' stroke-width='2' opacity='0.7' fill='none'>`n") | Out-Null
$sb.Append("<line x1='200' y1='600' x2='1040' y2='600'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<circle cx='660' cy='380' r='26' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
Set-Content -Path "$out/article-20.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

Write-Host "Generated article SVGs 06-20:"; Get-ChildItem $out -Filter "article-*.svg" | Select-Object Name | Format-Table -HideTableHeaders
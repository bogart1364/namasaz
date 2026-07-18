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
  $lines = @()
  $lines += "<line x1='0' y1='640' x2='1200' y2='640' stroke='$line2' stroke-width='1'/>"
  $lines += "<circle cx='980' cy='200' r='46' fill='none' stroke='$stone' stroke-opacity='0.18' stroke-width='1.5'/>"
  $lines += "<rect x='0' y='636' width='1200' height='3' fill='$accent' opacity='0.35'/>"
  $lines -join "`n"
}

# 1 White Hostel
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='140' y='360' width='920' height='240'/>`n") | Out-Null
foreach($y in @(400,440,480,520,560)){ $sb.Append("<line x1='140' y1='$y' x2='1060' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$wood' stroke-width='2' opacity='0.8'>`n") | Out-Null
for($i=0;$i -lt 22;$i++){ $x=160+$i*43; $sb.Append("<line x1='$x' y1='365' x2='$x' y2='395'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<path d='M140 360 L1060 360 L1040 330 L160 330 Z' fill='none' stroke='$stone' stroke-width='2' opacity='0.7'/>`n") | Out-Null
$sb.Append("<rect x='700' y='470' width='220' height='130' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
$sb.Append("<polyline points='120,600 360,560 600,600 840,560 1080,600' fill='none' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
Set-Content -Path "$out/project-01.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 2 Wire & Cable Factory
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$steel' stroke-width='2' fill='none' opacity='0.9'>`n") | Out-Null
$sb.Append("<rect x='120' y='300' width='960' height='340'/>`n") | Out-Null
for($i=1;$i -lt 13;$i++){ $x=120+$i*74; $sb.Append("<line x1='$x' y1='300' x2='$x' y2='640'/>`n") | Out-Null }
for($j=1;$j -lt 5;$j++){ $y=300+$j*62; $sb.Append("<line x1='120' y1='$y' x2='1080' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='300' y='380' width='560' height='200' fill='none' stroke='$line' stroke-width='2'/>`n") | Out-Null
$sb.Append("<g stroke='$red' stroke-width='2.5' opacity='0.85'>`n") | Out-Null
foreach($x in @(420,560,700,840)){ $sb.Append("<line x1='$x' y1='380' x2='$x' y2='580'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<polyline points='120,640 300,600 500,640 700,600 900,640 1080,600' fill='none' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
Set-Content -Path "$out/project-02.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 3 Iran Desa Motor
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='220' y='240' width='760' height='400'/>`n") | Out-Null
for($i=1;$i -lt 8;$i++){ $x=220+$i*95; $sb.Append("<line x1='$x' y1='240' x2='$x' y2='640'/>`n") | Out-Null }
for($j=1;$j -lt 5;$j++){ $y=240+$j*80; $sb.Append("<line x1='220' y1='$y' x2='980' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='220' y='240' width='760' height='40' fill='none' stroke='$stone' stroke-width='2' opacity='0.6'/>`n") | Out-Null
$sb.Append("<rect x='540' y='520' width='160' height='120' fill='none' stroke='$red' stroke-width='3' opacity='0.9'/>`n") | Out-Null
Set-Content -Path "$out/project-03.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 4 Amin Office (interior perspective)
$sb = [System.Text.StringBuilder]::new()
$sb.Append("<polygon points='120,300 1080,300 1180,640 20,640' fill='none' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
$sb.Append("<polygon points='120,300 1080,300 980,255 220,255' fill='none' stroke='$line2' stroke-width='1.5' opacity='0.5'/>`n") | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
for($i=0;$i -lt 4;$i++){ $x=250+$i*200; $sb.Append("<rect x='$x' y='430' width='120' height='150'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$steel' stroke-width='1.5' opacity='0.7' fill='none'>`n") | Out-Null
for($i=0;$i -lt 4;$i++){ $x=310+$i*200; $sb.Append("<line x1='$x' y1='255' x2='$x' y2='430'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g fill='none' stroke='$red' stroke-width='2' opacity='0.9'>`n") | Out-Null
for($i=0;$i -lt 4;$i++){ $x=310+$i*200; $sb.Append("<circle cx='$x' cy='248' r='9'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<line x1='20' y1='640' x2='1180' y2='640' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
Set-Content -Path "$out/project-04.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 5 Borhan Villa Township
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
for($i=0;$i -lt 5;$i++){ $x=90+$i*220
  $sb.Append("<rect x='$x' y='420' width='150' height='170'/>`n") | Out-Null
  $sb.Append("<path d='M$x 420 L $( $x+75 ) 365 L $( $x+150 ) 420 Z'/>`n") | Out-Null
  $sb.Append("<rect x='$( $x+55 )' y='500' width='40' height='90'/>`n") | Out-Null
}
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$wood' stroke-width='2' opacity='0.75' fill='none'>`n") | Out-Null
for($i=0;$i -lt 5;$i++){ $x=90+$i*220; $sb.Append("<line x1='$x' y1='455' x2='$( $x+150 )' y2='455'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<polyline points='60,600 300,565 600,600 900,565 1140,600' fill='none' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
Set-Content -Path "$out/project-05.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# 6 Modern Villa North
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='240' y='300' width='720' height='300'/>`n") | Out-Null
$sb.Append("<line x1='240' y1='420' x2='960' y2='420' stroke='$wood' stroke-width='2' opacity='0.8'/>`n") | Out-Null
for($i=1;$i -lt 6;$i++){ $x=240+$i*120; $sb.Append("<line x1='$x' y1='420' x2='$x' y2='600'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='520' y='350' width='150' height='70' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
$sb.Append("<rect x='120' y='640' width='960' height='2' stroke='$steel' stroke-width='1.5' opacity='0.4'/>`n") | Out-Null
$sb.Append("<rect x='120' y='648' width='960' height='40' fill='none' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
$sb.Append("<polyline points='120,690 360,675 600,690 840,675 1080,690' fill='none' stroke='$line2' stroke-width='1.5' opacity='0.7'/>`n") | Out-Null
Set-Content -Path "$out/project-06.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# A1 Exposed Concrete
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='240' y='200' width='720' height='400'/>`n") | Out-Null
for($i=1;$i -lt 8;$i++){ $x=240+$i*90; $sb.Append("<line x1='$x' y1='200' x2='$x' y2='600' opacity='0.5'/>`n") | Out-Null }
for($j=1;$j -lt 5;$j++){ $y=200+$j*80; $sb.Append("<line x1='240' y1='$y' x2='960' y2='$y' opacity='0.5'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='460' y='340' width='280' height='220' fill='none' stroke='$red' stroke-width='2.5' opacity='0.85'/>`n") | Out-Null
Set-Content -Path "$out/article-01.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# A2 Landscape
$sb = [System.Text.StringBuilder]::new()
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
for($i=0;$i -lt 7;$i++){ $x=130+$i*150
  $sb.Append("<line x1='$x' y1='470' x2='$x' y2='560' stroke='$wood' stroke-width='2' opacity='0.8'/>`n") | Out-Null
  $sb.Append("<circle cx='$x' cy='450' r='32'/>`n") | Out-Null
}
$sb.Append("</g>`n") | Out-Null
$sb.Append("<polyline points='0,560 200,520 400,560 600,520 800,560 1000,520 1200,560' fill='none' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
$sb.Append("<polyline points='0,610 200,575 400,610 600,575 800,610 1000,575 1200,610' fill='none' stroke='$line2' stroke-width='1.5' opacity='0.6'/>`n") | Out-Null
$sb.Append("<rect x='0' y='556' width='1200' height='3' fill='$red' opacity='0.3'/>`n") | Out-Null
Set-Content -Path "$out/article-02.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# A3 Natural Light
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='300' y='160' width='600' height='480'/>`n") | Out-Null
$sb.Append("<line x1='300' y1='160' x2='900' y2='160' stroke='$stone' stroke-width='2' opacity='0.6'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<polygon points='560,160 640,160 820,640 380,640' fill='$stone' opacity='0.10'/>`n") | Out-Null
$sb.Append("<line x1='600' y1='160' x2='600' y2='640' stroke='$red' stroke-width='3' opacity='0.7'/>`n") | Out-Null
$sb.Append("<circle cx='600' cy='150' r='34' fill='none' stroke='$stone' stroke-width='1.5' opacity='0.4'/>`n") | Out-Null
Set-Content -Path "$out/article-03.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# A4 Sustainable
$sb = [System.Text.StringBuilder]::new()
$sb.Append("<circle cx='600' cy='280' r='70' fill='none' stroke='$red' stroke-width='3' opacity='0.85'/>`n") | Out-Null
$sb.Append("<g stroke='$stone' stroke-width='1.5' opacity='0.5'>`n") | Out-Null
for($i=0;$i -lt 12;$i++){ $a=$i*30; $x=[math]::Round(600+[math]::Cos($a*3.14159/180)*150); $y=[math]::Round(280-[math]::Sin($a*3.14159/180)*150); $sb.Append("<line x1='600' y1='280' x2='$x' y2='$y'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='430' y='470' width='340' height='170'/>`n") | Out-Null
for($i=1;$i -lt 4;$i++){ $x=430+$i*85; $sb.Append("<line x1='$x' y1='470' x2='$x' y2='640'/>`n") | Out-Null }
$sb.Append("<line x1='430' y1='540' x2='770' y2='540' opacity='0.5'/>`n") | Out-Null
$sb.Append("</g>`n") | Out-Null
$sb.Append("<line x1='0' y1='640' x2='1200' y2='640' stroke='$line2' stroke-width='1.5'/>`n") | Out-Null
Set-Content -Path "$out/article-04.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

# A5 Traditional & Modern
$sb = [System.Text.StringBuilder]::new()
$sb.Append((Base)) | Out-Null
$sb.Append("<g stroke='$line' stroke-width='2' fill='none'>`n") | Out-Null
$sb.Append("<rect x='120' y='240' width='440' height='400'/>`n") | Out-Null
$sb.Append("<path d='M180 640 Q340 360 500 640' stroke='$wood' stroke-width='2.5' opacity='0.8'/>`n") | Out-Null
$sb.Append("<rect x='640' y='240' width='440' height='400'/>`n") | Out-Null
for($i=1;$i -lt 5;$i++){ $y=240+$i*80; $sb.Append("<line x1='640' y1='$y' x2='1080' y2='$y' opacity='0.5'/>`n") | Out-Null }
for($i=1;$i -lt 4;$i++){ $x=640+$i*110; $sb.Append("<line x1='$x' y1='240' x2='$x' y2='640' opacity='0.5'/>`n") | Out-Null }
$sb.Append("</g>`n") | Out-Null
$sb.Append("<rect x='560' y='240' width='80' height='400' fill='none' stroke='$red' stroke-width='2.5' opacity='0.8'/>`n") | Out-Null
Set-Content -Path "$out/article-05.svg" -Value ((Header) + $sb.ToString() + (Footer)) -NoNewline

Write-Host "Rewrote renders (clean line-art):"; Get-ChildItem $out | Select-Object Name

$ErrorActionPreference = 'Stop'
$out = "C:\botiq\public\assets\renders"

# Brand palette
$bg      = '#0a0a0a'
$bg2     = '#121110'
$concrete= '#8a857c'
$concreteD='#4a4641'
$wood    = '#9c7b54'
$woodD   = '#5e4a32'
$steel   = '#a8a39b'
$stone   = '#b8b4ac'
$red     = '#c0392b'
$grid    = '#26241f'

function Wrap($inner, $w=1200, $h=800) {
@"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $w $h" width="$w" height="$h">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="$bg2"/><stop offset="1" stop-color="$bg"/>
  </linearGradient>
  <radialGradient id="vig" cx="50%" cy="42%" r="75%">
    <stop offset="0" stop-color="#000000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000000" stop-opacity="0.55"/>
  </radialGradient>
  <linearGradient id="conc" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="$concrete"/><stop offset="1" stop-color="$concreteD"/>
  </linearGradient>
  <linearGradient id="wd" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="$wood"/><stop offset="1" stop-color="$woodD"/>
  </linearGradient>
</defs>
<rect width="$w" height="$h" fill="url(#sky)"/>
$inner
<rect width="$w" height="$h" fill="url(#vig)"/>
</svg>
"@
}

function Grid($op=0.06){
  $s=''
  for($x=0;$x -le 1200;$x+=60){ $s += "<line x1='$x' y1='0' x2='$x' y2='800' stroke='$grid' stroke-opacity='$op' stroke-width='1'/>" }
  for($y=0;$y -le 800;$y+=60){ $s += "<line x1='0' y1='$y' x2='1200' y2='$y' stroke='$grid' stroke-opacity='$op' stroke-width='1'/>" }
  $s
}

# 1. White Hostel — Mazandaran nature, wood/concrete/steel/stone, horizontal slatted volume
$hostel = Grid + @"
<rect x='120' y='300' width='960' height='320' fill='url(#conc)'/>
<g stroke='$wood' stroke-width='6' opacity='0.85'>
$(for($i=0;$i -lt 16;$i++){ $x=150+$i*58; "<line x1='$x' y1='320' x2='$x' y2='470'/>" })
</g>
<rect x='120' y='470' width='960' height='150' fill='$stone' opacity='0.9'/>
<rect x='700' y='500' width='300' height='110' fill='#1a1817'/>
<rect x='720' y='520' width='260' height='70' fill='$bg' opacity='0.6'/>
<circle cx='980' cy='230' r='70' fill='$bg2' stroke='$stone' stroke-opacity='0.25' stroke-width='2'/>
<path d='M0 620 L300 560 L600 620 L900 560 L1200 620 L1200 800 L0 800 Z' fill='#0e0d0c'/>
<rect x='120' y='300' width='960' height='6' fill='$red' opacity='0.8'/>
"@
Set-Content -Path "$out/project-01.svg" -Value (Wrap $hostel) -NoNewline

# 2. Wire & Cable Factory — industrial metal profiles, aluminum facade
$factory = Grid + @"
<rect x='80' y='260' width='1040' height='380' fill='#15140f'/>
<g stroke='$steel' stroke-width='4' opacity='0.7'>
$(for($i=0;$i -lt 26;$i++){ $x=110+$i*40; "<line x1='$x' y1='280' x2='$x' y2='620'/>" })
</g>
<g stroke='$steel' stroke-width='3' opacity='0.5'>
$(for($j=0;$j -lt 9;$j++){ $y=300+$j*40; "<line x1='80' y1='$y' x2='1120' y2='$y'/>" })
</g>
<rect x='300' y='360' width='600' height='200' fill='url(#conc)' opacity='0.85'/>
<g fill='$bg'>
$(for($i=0;$i -lt 8;$i++){ $x=330+$i*70; "<rect x='$x' y='400' width='40' height='120'/>" })
</g>
<rect x='80' y='260' width='1040' height='8' fill='$red' opacity='0.8'/>
<path d='M0 640 L1200 600 L1200 660 L0 700 Z' fill='#0e0d0c'/>
"@
Set-Content -Path "$out/project-02.svg" -Value (Wrap $factory) -NoNewline

# 3. Iran Desa Motor — commercial, exposed concrete, glass, steel
$desa = Grid + @"
<rect x='160' y='200' width='880' height='440' fill='url(#conc)'/>
<rect x='160' y='200' width='880' height='440' fill='none' stroke='$steel' stroke-width='3' opacity='0.4'/>
<g fill='#0c0b0a' opacity='0.9'>
$(for($r=0;$r -lt 4;$r++){ for($c=0;$c -lt 7;$c++){ $x=200+$c*115; $y=250+$r*95; "<rect x='$x' y='$y' width='90' height='70'/>" } })
</g>
<rect x='500' y='520' width='200' height='120' fill='$red' opacity='0.85'/>
<rect x='160' y='200' width='880' height='6' fill='$stone' opacity='0.6'/>
<path d='M0 640 L400 600 L800 640 L1200 600 L1200 800 L0 800 Z' fill='#0e0d0c'/>
"@
Set-Content -Path "$out/project-03.svg" -Value (Wrap $desa) -NoNewline

# 4. Amin Office Furniture — interior, display, lighting
$office = Grid + @"
<rect x='0' y='0' width='1200' height='800' fill='#0d0c0b'/>
<rect x='100' y='180' width='1000' height='430' fill='#16140f'/>
<rect x='100' y='180' width='1000' height='430' fill='none' stroke='$stone' stroke-opacity='0.2' stroke-width='2'/>
<g>
$(for($i=0;$i -lt 4;$i++){ $x=180+$i*230;
  "<rect x='$x' y='420' width='160' height='150' fill='url(#wd)'/>" +
  "<rect x='$('{0}' -f ($x+30))' y='230' width='14' height='180' fill='$steel' opacity='0.6'/>" +
  "<circle cx='$('{0}' -f ($x+80))' cy='210' r='10' fill='$red' opacity='0.9'/>"
})
</g>
<rect x='100' y='570' width='1000' height='14' fill='$stone' opacity='0.3'/>
<path d='M0 600 L1200 580 L1200 800 L0 800 Z' fill='#0a0908'/>
"@
Set-Content -Path "$out/project-04.svg" -Value (Wrap $office) -NoNewline

# 5. Borhan Villa Township — northern villas, nature, unified style
$borhan = Grid + @"
<g>
$(for($i=0;$i -lt 5;$i++){ $x=80+$i*220;
  "<rect x='$x' y='340' width='160' height='180' fill='url(#conc)'/>" +
  "<path d='M$x 340 L $('{0}' -f ($x+80)) 280 L $('{0}' -f ($x+160)) 340 Z' fill='$stone' opacity='0.85'/>" +
  "<rect x='$('{0}' -f ($x+50))' y='420' width='60' height='100' fill='#0c0b0a' opacity='0.9'/>"
})
</g>
<rect x='0' y='520' width='1200' height='4' fill='$red' opacity='0.5'/>
<path d='M0 520 Q300 470 600 520 T1200 520 L1200 800 L0 800 Z' fill='#0e0d0c'/>
<circle cx='980' cy='180' r='55' fill='$bg2' stroke='$stone' stroke-opacity='0.2' stroke-width='2'/>
"@
Set-Content -Path "$out/project-05.svg" -Value (Wrap $borhan) -NoNewline

# 6. Modern Villa North — concrete, wood, glass, pool
$villa = Grid + @"
<rect x='200' y='250' width='800' height='360' fill='url(#conc)'/>
<rect x='200' y='250' width='800' height='120' fill='$wood' opacity='0.8'/>
<g fill='#0a0a0a' opacity='0.92'>
$(for($c=0;$c -lt 6;$c++){ $x=240+$c*125; "<rect x='$x' y='420' width='90' height='150'/>" })
</g>
<rect x='520' y='300' width='160' height='60' fill='$red' opacity='0.85'/>
<rect x='120' y='610' width='960' height='60' fill='$steel' opacity='0.25'/>
<path d='M120 610 L1080 610 L1080 670 L120 670 Z' fill='#15191c'/>
<rect x='120' y='610' width='960' height='3' fill='$stone' opacity='0.4'/>
<path d='M0 670 L1200 650 L1200 800 L0 800 Z' fill='#0a0908'/>
"@
Set-Content -Path "$out/project-06.svg" -Value (Wrap $villa) -NoNewline

# Articles
# A1 Exposed Concrete
$a1 = Grid + @"
<rect x='150' y='150' width='900' height='500' fill='url(#conc)'/>
<g stroke='#3a3733' stroke-width='2' opacity='0.5'>
$(for($i=1;$i -lt 9;$i++){ $y=150+$i*55; "<line x1='150' y1='$y' x2='1050' y2='$y'/>" })
</g>
<rect x='400' y='300' width='400' height='250' fill='#0c0b0a' opacity='0.85'/>
<rect x='400' y='300' width='400' height='6' fill='$red' opacity='0.8'/>
"@
Set-Content -Path "$out/article-01.svg" -Value (Wrap $a1) -NoNewline

# A2 Landscape / urban green
$a2 = Grid + @"
<path d='M0 560 Q200 480 400 540 T800 520 T1200 560 L1200 800 L0 800 Z' fill='#11140f'/>
<g fill='$wood' opacity='0.85'>
$(for($i=0;$i -lt 7;$i++){ $x=120+$i*150; "<rect x='$x' y='460' width='10' height='100'/><circle cx='$('{0}' -f ($x+5))' cy='450' r='34'/>" })
</g>
<rect x='0' y='555' width='1200' height='3' fill='$red' opacity='0.4'/>
"@
Set-Content -Path "$out/article-02.svg" -Value (Wrap $a2) -NoNewline

# A3 Natural Light
$a3 = Grid + @"
<rect x='250' y='120' width='700' height='560' fill='#0e0d0c'/>
<polygon points='250,120 950,120 950,680 250,680' fill='url(#conc)' opacity='0.4'/>
<polygon points='250,120 600,120 250,680' fill='$stone' opacity='0.18'/>
<polygon points='950,120 600,120 950,680' fill='$bg2'/>
<line x1='600' y1='120' x2='600' y2='680' stroke='$red' stroke-width='4' opacity='0.7'/>
<circle cx='600' cy='120' r='40' fill='$stone' opacity='0.3'/>
"@
Set-Content -Path "$out/article-03.svg" -Value (Wrap $a3) -NoNewline

# A4 Sustainable Architecture
$a4 = Grid + @"
<rect x='0' y='500' width='1200' height='300' fill='#0e0d0c'/>
<circle cx='600' cy='300' r='90' fill='$red' opacity='0.85'/>
<g stroke='$stone' stroke-width='3' opacity='0.5'>
$(for($i=0;$i -lt 12;$i++){ $a=$i*30; "<line x1='600' y1='300' x2='$('{0:N0}' -f (600+[math]::Cos($a*3.14159/180)*210))' y2='$('{0:N0}' -f (300-[math]::Sin($a*3.14159/180)*210))'/>" })
</g>
<rect x='520' y='420' width='160' height='80' fill='url(#wd)'/>
"@
Set-Content -Path "$out/article-04.svg" -Value (Wrap $a4) -NoNewline

# A5 Traditional & Modern Materials
$a5 = Grid + @"
<rect x='120' y='200' width='460' height='400' fill='url(#wd)'/>
<rect x='620' y='200' width='460' height='400' fill='url(#conc)'/>
<rect x='560' y='200' width='80' height='400' fill='$stone' opacity='0.7'/>
<rect x='120' y='200' width='460' height='8' fill='$red' opacity='0.8'/>
<rect x='620' y='200' width='460' height='8' fill='$red' opacity='0.8'/>
"@
Set-Content -Path "$out/article-05.svg" -Value (Wrap $a5) -NoNewline

Write-Host "Generated renders:"; Get-ChildItem $out | Select-Object Name

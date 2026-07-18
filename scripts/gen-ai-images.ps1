$ErrorActionPreference = 'Stop'
$key = "sk-khgjvmgf1EARjhMh3lS2sbxumO4tSshrJpWsqFX30wF5Sf52"
$base = "https://api.gapgpt.app/v1"
$out = "C:\botiq\public\assets\renders"
New-Item -ItemType Directory -Path $out -Force | Out-Null

$common = "Architectural photography, photorealistic, cinematic natural lighting, high detail, professional architecture portfolio, muted earthy palette, minimalist, no text, no watermark."

$projects = @(
  @{
    id='01'; name='White Hostel'
    prompt="A modern boutique hostel nestled in the forests of Mazandaran, northern Iran. Facade and structure crafted from warm wood, exposed concrete, black steel and local stone, expressing an intimate contemporary architectural language. Soft diffused natural light, surrounding lush greenery, serene atmosphere. $common"
  },
  @{
    id='02'; name='Wire and Cable Factory — Amol'
    prompt="Industrial factory facade in Amol, Mazandaran. Modern office building entrance with vertical metal profiles and brushed aluminum composite panels, contemporary industrial architecture. Overcast daylight, clean geometric composition. $common"
  },
  @{
    id='03'; name='Iran Desa Motor'
    prompt="Modern industrial car showroom entrance in Tehran. Combination of exposed concrete, large glass curtain walls and black steel framework creating a strong automotive brand identity. Dramatic showroom lighting, sleek minimalist interior glimpse. $common"
  },
  @{
    id='04'; name='Amin Office Furniture'
    prompt="Interior of a modern office furniture showroom in Tehran. Minimalist display of designer desks and chairs under professional track lighting, open spacious layout, warm wood and neutral tones, elegant product presentation. $common"
  },
  @{
    id='05'; name='Borhan Villa Township'
    prompt="Aerial-style view of a unified northern Iran villa township. Row of contemporary villas with consistent architectural style surrounded by green landscape, sports and public spaces, nature-inspired design, calm eco-harmonious living. $common"
  },
  @{
    id='06'; name='Modern Villa — North Iran'
    prompt="A modern villa in northern Iran with a private infinity pool. Combination of exposed concrete, natural wood cladding and floor-to-ceiling glass, open spaces connecting directly to surrounding nature, evening golden light reflections on water. $common"
  }
)

$headers = @{ Authorization = "Bearer $key"; 'Content-Type' = 'application/json' }

foreach ($p in $projects) {
  Write-Host "Generating $($p.id) - $($p.name) ..."
  $body = @{ model='gpt-image-1'; prompt=$p.prompt; n=1; size='1536x1024' } | ConvertTo-Json
  try {
    $r = Invoke-WebRequest -Uri "$base/images/generations" -Method Post -Headers $headers -Body $body -UseBasicParsing -TimeoutSec 180
    $c = $r.Content | ConvertFrom-Json
    $b64 = $c.data[0].b64_json
    if (-not $b64) { throw "No b64_json in response. Keys: $($c.data[0].PSObject.Properties.Name -join ',')" }
    $bytes = [System.Convert]::FromBase64String($b64)
    $path = Join-Path $out "project-$($p.id).png"
    [System.IO.File]::WriteAllBytes($path, $bytes)
    Write-Host "  saved $path ($([math]::Round($bytes.Length/1KB)) KB)"
  } catch {
    Write-Host "  FAILED: $($_.Exception.Message)"
    if ($_.Exception.Response) {
      $sr = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
      Write-Host "  $($sr.ReadToEnd())"
    }
  }
}
Write-Host "Done."
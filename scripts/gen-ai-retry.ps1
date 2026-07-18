$ErrorActionPreference = 'Stop'
$key = "sk-khgjvmgf1EARjhMh3lS2sbxumO4tSshrJpWsqFX30wF5Sf52"
$base = "https://api.gapgpt.app/v1"
$out = "C:\botiq\public\assets\renders"

$common = "Architectural photography, photorealistic, cinematic natural lighting, high detail, professional architecture portfolio, muted earthy palette, minimalist, no text, no watermark."

$projects = @(
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
  $path = Join-Path $out "project-$($p.id).png"
  if (Test-Path $path) { Write-Host "Skip $($p.id) (exists)"; continue }
  $ok = $false
  for ($attempt=1; $attempt -le 5 -and -not $ok; $attempt++) {
    Write-Host "Generating $($p.id) - $($p.name) (attempt $attempt) ..."
    $body = @{ model='gpt-image-1'; prompt=$p.prompt; n=1; size='1536x1024' } | ConvertTo-Json
    try {
      $r = Invoke-WebRequest -Uri "$base/images/generations" -Method Post -Headers $headers -Body $body -UseBasicParsing -TimeoutSec 180
      $c = $r.Content | ConvertFrom-Json
      $b64 = $c.data[0].b64_json
      if (-not $b64) { throw "No b64" }
      [System.IO.File]::WriteAllBytes($path, [System.Convert]::FromBase64String($b64))
      Write-Host "  saved ($([math]::Round((Get-Item $path).Length/1KB)) KB)"
      $ok = $true
    } catch {
      Write-Host "  FAILED: $($_.Exception.Response.StatusCode)"
      if ($_.Exception.Response) { $sr=[System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream()); Write-Host "  $($sr.ReadToEnd())" }
      Start-Sleep -Seconds (15 * $attempt)
    }
  }
  if ($ok) { Start-Sleep -Seconds 20 }
}
Write-Host "Done."
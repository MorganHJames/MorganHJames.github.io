Param(
    [string]$Version = "2.16.105",
    [string]$Destination = "./"
)

# PowerShell script to download pdf.min.js and pdf.worker.min.js from cdnjs
# Usage: .\download_pdfjs.ps1 -Version 2.16.105 -Destination .\

$baseUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/$Version"

if (-not (Test-Path $Destination)) {
    New-Item -ItemType Directory -Path $Destination | Out-Null
}

$files = @("pdf.min.js", "pdf.worker.min.js")

foreach ($f in $files) {
    $url = "$baseUrl/$f"
    $out = Join-Path -Path $Destination -ChildPath $f
    Write-Host "Downloading $url -> $out"
    try {
        Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
        Write-Host "Saved $f"
    } catch {
        Write-Warning "Failed to download $url: $_"
    }
}

Write-Host "Done. Place the files under Resources/vendor/pdfjs/ if you ran this from another folder."

# PowerShell script to copy a beautiful hero background image

$sourceDir = "C:\Users\puyols\Downloads\flowers_belka\image\catalog"
$targetDir = "C:\Users\puyols\Downloads\flowers_belka\flowers-belka-nextjs\public\images"

# Create target directory if it doesn't exist
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force
}

# Copy a beautiful image for hero background
$heroImage = "2022-02-13 18-47-47.JPG"
$sourcePath = Join-Path $sourceDir $heroImage

if (Test-Path $sourcePath) {
    $targetPath = Join-Path $targetDir "hero-background.jpg"
    Copy-Item $sourcePath $targetPath -Force
    Write-Host "Copied hero background: $heroImage -> hero-background.jpg"
} else {
    Write-Host "Hero image not found: $heroImage"
}

Write-Host "Done!"

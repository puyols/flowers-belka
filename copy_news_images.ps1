# PowerShell script to copy images for news

$sourceDir = "C:\Users\puyols\Downloads\flowers_belka\image\catalog"
$targetDir = "C:\Users\puyols\Downloads\flowers_belka\flowers-belka-nextjs\public\images\news"

# Create target directory if it doesn't exist
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force
}

# List of images for news
$newsImages = @(
    "2021-01-31 11-24-53.JPG",
    "2021-02-06 19-03-51.JPG", 
    "2021-04-20 13-21-17.JPG",
    "2021-07-07 17-42-08.JPG",
    "2022-02-01 14-31-15.JPG"
)

Write-Host "Copying news images..."

foreach ($image in $newsImages) {
    $sourcePath = Join-Path $sourceDir $image
    if (Test-Path $sourcePath) {
        $targetPath = Join-Path $targetDir $image
        Copy-Item $sourcePath $targetPath -Force
        Write-Host "Copied: $image"
    } else {
        Write-Host "Not found: $image"
    }
}

Write-Host "Done copying news images!"

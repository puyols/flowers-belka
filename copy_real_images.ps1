# PowerShell script to copy real flower images to Next.js project

$sourceDir = "C:\Users\puyols\Downloads\flowers_belka\image\catalog"
$targetDir = "C:\Users\puyols\Downloads\flowers_belka\flowers-belka-nextjs\public\images\products"

# Create target directory if it doesn't exist
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force
}

# List of specific images to copy (the best ones)
$imagesToCopy = @(
    "image_fx_ (44).jpg",
    "image_fx_ (75).jpg", 
    "image_fx_ (100).jpg",
    "image_fx_ (38).jpg",
    "image_fx_ (39).jpg",
    "image_fx_ (40).jpg",
    "image_fx_ (41).jpg",
    "image_fx_ (42).jpg",
    "image_fx_ (43).jpg",
    "image_fx_ (45).jpg",
    "image_fx_ (46).jpg",
    "image_fx_ (47).jpg",
    "image_fx_ (48).jpg",
    "image_fx_ (49).jpg",
    "image_fx_ (99).jpg",
    "2022-02-13 18-47-47.JPG",
    "2021-03-08 12-51-46.JPG",
    "2021-06-01 10-53-42.JPG",
    "2021-07-07 17-42-08.JPG",
    "2021-09-01 11-02-02.JPG",
    "2022-03-17 20-02-43.JPG",
    "2022-06-05 19-55-31.JPG",
    "2022-08-06 13-52-23.JPG",
    "2022-09-02 22-13-51.JPG",
    "2023-01-02 20-55-16.JPG"
)

Write-Host "Copying flower images..."

foreach ($image in $imagesToCopy) {
    $sourcePath = Join-Path $sourceDir $image
    if (Test-Path $sourcePath) {
        $targetPath = Join-Path $targetDir $image
        Copy-Item $sourcePath $targetPath -Force
        Write-Host "Copied: $image"
    } else {
        Write-Host "Not found: $image"
    }
}

Write-Host "Done copying images!"

#!/bin/bash

# Advanced Image Processing Script
# Generates multiple sizes and formats for responsive images

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if ImageMagick is installed (for resizing)
if ! command -v convert &> /dev/null; then
    echo -e "${RED}Error: ImageMagick is not installed. Please install ImageMagick first.${NC}"
    echo "Installation instructions:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu/Debian: sudo apt install imagemagick"
    exit 1
fi

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: FFmpeg is not installed. Please install FFmpeg first.${NC}"
    echo "Installation instructions:"
    echo "  macOS: brew install ffmpeg"
    echo "  Ubuntu/Debian: sudo apt install ffmpeg"
    exit 1
fi

# Base directory for project images
BASE_DIR="public/images/projects"

# Responsive breakpoints (width in pixels)
SIZES=(320 640 768 1024 1280 1920)

# Function to generate responsive images
generate_responsive_images() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file" .jpg)
    local filename_no_ext=$(basename "$input_file" .jpg)
    
    echo -e "${BLUE}Processing: $input_file${NC}"
    
    # Create output directory if it doesn't exist
    mkdir -p "$output_dir"
    
    # Get original dimensions
    original_width=$(identify -format "%w" "$input_file")
    original_height=$(identify -format "%h" "$input_file")
    
    echo -e "  ${YELLOW}Original: ${original_width}x${original_height}${NC}"
    
    # Generate different sizes
    for size in "${SIZES[@]}"; do
        # Only resize if the original is larger than the target size
        if [ "$original_width" -gt "$size" ]; then
            echo -e "  ${YELLOW}→ Generating ${size}px variants${NC}"
            
            # Calculate height maintaining aspect ratio
            new_height=$((size * original_height / original_width))
            
            # Generate AVIF
            ffmpeg -i "$input_file" -vf "scale=${size}:${new_height}" -c:v libaom-av1 -crf 30 -b:v 0 -y "$output_dir/${filename_no_ext}-${size}w.avif" 2>/dev/null
            
            # Generate WebP
            ffmpeg -i "$input_file" -vf "scale=${size}:${new_height}" -c:v libwebp -quality 80 -y "$output_dir/${filename_no_ext}-${size}w.webp" 2>/dev/null
            
            # Generate JPEG (fallback)
            convert "$input_file" -resize "${size}x${new_height}" -quality 85 "$output_dir/${filename_no_ext}-${size}w.jpg" 2>/dev/null
        fi
    done
    
    # Also generate the original size in different formats
    echo -e "  ${YELLOW}→ Generating original size variants${NC}"
    ffmpeg -i "$input_file" -c:v libaom-av1 -crf 30 -b:v 0 -y "$output_dir/${filename_no_ext}.avif" 2>/dev/null
    ffmpeg -i "$input_file" -c:v libwebp -quality 80 -y "$output_dir/${filename_no_ext}.webp" 2>/dev/null
    
    echo -e "  ${GREEN}✓ Responsive images generated${NC}"
    echo ""
}

# Function to process all images in a directory
process_directory() {
    local project_dir="$1"
    local project_name=$(basename "$project_dir")
    
    echo -e "${BLUE}Processing project: $project_name${NC}"
    
    # Find all JPEG files in the project directory
    find "$project_dir" -name "*.jpg" -o -name "*.jpeg" | while read -r image_file; do
        generate_responsive_images "$image_file" "$project_dir"
    done
}

# Function to generate srcSet string for Next.js
generate_srcset() {
    local project_dir="$1"
    local filename="$2"
    
    echo -e "${YELLOW}Generated srcSet for $filename:${NC}"
    echo ""
    
    # AVIF srcSet
    echo -e "${BLUE}AVIF srcSet:${NC}"
    echo "const avifSrcSet = \`"
    for size in "${SIZES[@]}"; do
        if [ -f "$project_dir/${filename}-${size}w.avif" ]; then
            echo "  /images/projects/$(basename "$project_dir")/${filename}-${size}w.avif ${size}w,"
        fi
    done
    echo "  /images/projects/$(basename "$project_dir")/${filename}.avif 1920w"
    echo "\`;"
    echo ""
    
    # WebP srcSet
    echo -e "${BLUE}WebP srcSet:${NC}"
    echo "const webpSrcSet = \`"
    for size in "${SIZES[@]}"; do
        if [ -f "$project_dir/${filename}-${size}w.webp" ]; then
            echo "  /images/projects/$(basename "$project_dir")/${filename}-${size}w.webp ${size}w,"
        fi
    done
    echo "  /images/projects/$(basename "$project_dir")/${filename}.webp 1920w"
    echo "\`;"
    echo ""
    
    # JPEG fallback srcSet
    echo -e "${BLUE}JPEG fallback srcSet:${NC}"
    echo "const jpegSrcSet = \`"
    for size in "${SIZES[@]}"; do
        if [ -f "$project_dir/${filename}-${size}w.jpg" ]; then
            echo "  /images/projects/$(basename "$project_dir")/${filename}-${size}w.jpg ${size}w,"
        fi
    done
    echo "  /images/projects/$(basename "$project_dir")/${filename}.jpg 1920w"
    echo "\`;"
    echo ""
}

# Main execution
echo -e "${GREEN}🚀 Starting responsive image generation...${NC}"
echo ""

# Check if base directory exists
if [ ! -d "$BASE_DIR" ]; then
    echo -e "${RED}Error: Directory $BASE_DIR does not exist.${NC}"
    exit 1
fi

# Process each project directory
for project_dir in "$BASE_DIR"/*; do
    if [ -d "$project_dir" ]; then
        process_directory "$project_dir"
    fi
done

echo -e "${GREEN}✅ Responsive image generation completed!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Use the generated images with Next.js Image component:"
echo "   - Implement srcSet with different formats and sizes"
echo "   - Use priority loading for above-the-fold images"
echo ""
echo "2. Consider implementing a custom hook for responsive images:"
echo "   - Automatic format detection based on browser support"
echo "   - Lazy loading for images below the fold"
echo ""
echo "3. Monitor Core Web Vitals to measure performance improvements"

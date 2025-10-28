#!/bin/bash

# FFmpeg Image Format Conversion Script
# Converts JPEG images to AVIF and WebP formats for better performance

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: FFmpeg is not installed. Please install FFmpeg first.${NC}"
    echo "Installation instructions:"
    echo "  macOS: brew install ffmpeg"
    echo "  Ubuntu/Debian: sudo apt install ffmpeg"
    echo "  Windows: Download from https://ffmpeg.org/download.html"
    exit 1
fi

# Base directory for project images
BASE_DIR="public/images/projects"

# Function to convert a single image
convert_image() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file" .jpg)
    
    echo -e "${BLUE}Converting: $input_file${NC}"
    
    # Create output directory if it doesn't exist
    mkdir -p "$output_dir"
    
    # Convert to AVIF (best compression, modern browsers)
    echo -e "  ${YELLOW}→ AVIF${NC}"
    ffmpeg -i "$input_file" -c:v libaom-av1 -crf 30 -b:v 0 -y "$output_dir/${filename}.avif" 2>/dev/null
    
    # Convert to WebP (good compression, wider browser support)
    echo -e "  ${YELLOW}→ WebP${NC}"
    ffmpeg -i "$input_file" -c:v libwebp -quality 80 -y "$output_dir/${filename}.webp" 2>/dev/null
    
    # Get file sizes for comparison
    original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
    avif_size=$(stat -f%z "$output_dir/${filename}.avif" 2>/dev/null || stat -c%s "$output_dir/${filename}.avif" 2>/dev/null)
    webp_size=$(stat -f%z "$output_dir/${filename}.webp" 2>/dev/null || stat -c%s "$output_dir/${filename}.webp" 2>/dev/null)
    
    # Calculate compression ratios
    if [ "$original_size" -gt 0 ]; then
        avif_ratio=$((100 - (avif_size * 100 / original_size)))
        webp_ratio=$((100 - (webp_size * 100 / original_size)))
        echo -e "  ${GREEN}✓ AVIF: ${avif_ratio}% smaller${NC}"
        echo -e "  ${GREEN}✓ WebP: ${webp_ratio}% smaller${NC}"
    fi
    
    echo ""
}

# Function to process all images in a directory
process_directory() {
    local project_dir="$1"
    local project_name=$(basename "$project_dir")
    
    echo -e "${BLUE}Processing project: $project_name${NC}"
    
    # Find all JPEG files in the project directory
    find "$project_dir" -name "*.jpg" -o -name "*.jpeg" | while read -r image_file; do
        convert_image "$image_file" "$project_dir"
    done
}

# Main execution
echo -e "${GREEN}🚀 Starting image conversion process...${NC}"
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

echo -e "${GREEN}✅ Image conversion completed!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update your mockData.ts to use the new formats:"
echo "   - Use .avif for modern browsers (best compression)"
echo "   - Use .webp as fallback (wider support)"
echo "   - Keep .jpg as final fallback"
echo ""
echo "2. Consider implementing responsive images with Next.js Image component:"
echo "   - srcSet with different formats and sizes"
echo "   - Automatic format selection based on browser support"
echo ""
echo "3. Test the converted images in different browsers to ensure compatibility"

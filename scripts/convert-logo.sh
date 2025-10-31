#!/bin/bash

# Logo dönüştürme scripti
# PNG'yi AVIF formatına dönüştürür

INPUT_FILE="public/images/logo/logo.png"
OUTPUT_FILE="public/images/logo/logo.avif"

# FFmpeg kontrolü
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg bulunamadı. Lütfen FFmpeg'i yükleyin:"
    echo "   macOS: brew install ffmpeg"
    echo "   Ubuntu/Debian: sudo apt-get install ffmpeg"
    echo "   Windows: https://ffmpeg.org/download.html"
    exit 1
fi

# Giriş dosyası kontrolü
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ Giriş dosyası bulunamadı: $INPUT_FILE"
    exit 1
fi

# Dönüştürme
echo "🔄 Logo dönüştürülüyor: $INPUT_FILE -> $OUTPUT_FILE"

ffmpeg -i "$INPUT_FILE" \
  -vf "scale=200:-1" \
  -c:v libaom-av1 \
  -crf 30 \
  -b:v 0 \
  -an \
  "$OUTPUT_FILE" \
  -y

if [ $? -eq 0 ]; then
    echo "✅ Logo başarıyla AVIF formatına dönüştürüldü: $OUTPUT_FILE"
    
    # Dosya boyutlarını göster
    INPUT_SIZE=$(du -h "$INPUT_FILE" | cut -f1)
    OUTPUT_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo "📊 Dosya boyutları:"
    echo "   PNG: $INPUT_SIZE"
    echo "   AVIF: $OUTPUT_SIZE"
else
    echo "❌ Dönüştürme hatası!"
    exit 1
fi


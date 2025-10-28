# Image Optimization Scripts

Bu klasörde görsel optimizasyonu için kullanabileceğiniz scriptler bulunmaktadır.

## Scripts

### 1. `convert-images.sh` - Temel Format Dönüşümü

JPEG görselleri AVIF ve WebP formatlarına dönüştürür.

**Kullanım:**

```bash
./scripts/convert-images.sh
```

**Gereksinimler:**

- FFmpeg

**Çıktı:**

- Her JPEG dosyası için `.avif` ve `.webp` versiyonları oluşturur
- Dosya boyutu karşılaştırması gösterir

### 2. `generate-responsive-images.sh` - Responsive Görsel Üretimi

Farklı boyutlarda ve formatlarda responsive görseller üretir.

**Kullanım:**

```bash
./scripts/generate-responsive-images.sh
```

**Gereksinimler:**

- FFmpeg
- ImageMagick

**Çıktı:**

- 320px, 640px, 768px, 1024px, 1280px, 1920px boyutlarında görseller
- Her boyut için AVIF, WebP ve JPEG formatları
- Next.js için srcSet string'leri

## Kurulum

### macOS

```bash
brew install ffmpeg imagemagick
```

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install ffmpeg imagemagick
```

### Windows

1. FFmpeg: https://ffmpeg.org/download.html
2. ImageMagick: https://imagemagick.org/script/download.php

## Next.js'te Kullanım

### Temel Kullanım

```tsx
<Image
  src="/images/projects/project-name/image.jpg"
  alt="Project Image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Responsive Images

```tsx
<Image
  src="/images/projects/project-name/image.jpg"
  alt="Project Image"
  fill
  className="object-cover"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Modern Format Desteği

```tsx
<picture>
  <source srcSet="/images/projects/project-name/image.avif" type="image/avif" />
  <source srcSet="/images/projects/project-name/image.webp" type="image/webp" />
  <Image
    src="/images/projects/project-name/image.jpg"
    alt="Project Image"
    width={800}
    height={600}
  />
</picture>
```

## Performans İpuçları

1. **Blur Placeholder**: Tüm görseller için blur placeholder kullanın
2. **Lazy Loading**: Alt kısımdaki görseller için `loading="lazy"` kullanın
3. **Priority Loading**: Üst kısımdaki görseller için `priority={true}` kullanın
4. **Sizes Attribute**: Responsive görseller için doğru `sizes` değeri verin
5. **Format Seçimi**: AVIF > WebP > JPEG sırasını tercih edin

## Dosya Yapısı

```
public/images/projects/
├── project-name/
│   ├── image.jpg (orijinal)
│   ├── image.avif (AVIF format)
│   ├── image.webp (WebP format)
│   ├── image-320w.jpg (320px genişlik)
│   ├── image-320w.avif
│   ├── image-320w.webp
│   ├── image-640w.jpg (640px genişlik)
│   └── ...
```

## Notlar

- Scriptler mevcut JPEG dosyalarını korur
- Yeni formatlar aynı klasöre eklenir
- Dosya boyutu karşılaştırması konsola yazdırılır
- Hata durumunda script durur ve hata mesajı gösterir

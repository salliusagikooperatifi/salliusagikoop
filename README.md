# Şallıuşağı Üretim ve Pazarlama Kooperatifi Web Sitesi

Kooperatifimizin resmi web sitesi - Modern, kullanıcı dostu ve yönetilebilir bir platform.

🌐 **Canlı Site:** [salliusagi-kooperatifi.org.tr](https://salliusagi-kooperatifi.org.tr)

---

## 📖 Proje Hakkında (Proje Sahibi İçin)

Bu web sitesi, Şallıuşağı Üretim ve Pazarlama Kooperatifi'nin dijital varlığını temsil eder. Site üzerinden:

- ✅ **Projelerimizi** tanıtabilir, detaylarını paylaşabilirsiniz
- ✅ **Duyurular** yayınlayarak üyelerinize ulaşabilirsiniz
- ✅ **Haberler** paylaşarak faaliyetlerinizi duyurabilirsiniz
- ✅ **Yönetim kurulu** ve **üye bilgilerini** gösterebilirsiniz
- ✅ **İletişim formu** ile ziyaretçilerden mesaj alabilirsiniz
- ✅ **Admin paneli** ile içerikleri kolayca yönetebilirsiniz

### 🎯 Özellikler

- 📱 **Mobil Uyumlu:** Telefon, tablet ve bilgisayarda mükemmel görünüm
- ⚡ **Hızlı:** Modern teknolojilerle optimize edilmiş performans
- 🔒 **Güvenli:** SSL sertifikası ve güvenlik önlemleri
- 🎨 **Modern Tasarım:** Kullanıcı dostu arayüz
- 🗄️ **Veritabanı:** Supabase ile dinamik içerik yönetimi
- 🔄 **Otomatik Yedekleme:** Supabase projeniz hiç kapanmaz (Heartbeat sistemi)

### 🚀 Site Bölümleri

1. **Anasayfa** - Hero, projeler, duyurular ve haberler
2. **Hakkımızda** - Kooperatif tanıtımı ve amaçları
3. **Projelerimiz** - 6 ana proje kategorisi ve detayları
4. **Üyelerimiz** - Kooperatif üyeleri
5. **Yönetim** - Yönetim kurulu üyeleri
6. **Duyurular** - Önemli duyurular ve güncellemeler
7. **Haberler** - Faaliyetler ve haberler
8. **İletişim** - İletişim bilgileri ve harita

---

## 🛠️ Teknik Bilgiler (Geliştiriciler İçin)

### Kullanılan Teknolojiler

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Dil:** TypeScript
- **UI:** React 19
- **Styling:** Tailwind CSS 4
- **Veritabanı:** [Supabase](https://supabase.com) (PostgreSQL)
- **Deployment:** [Vercel](https://vercel.com)
- **Rich Text Editor:** Lexical
- **İkonlar:** Lucide React
- **Animasyonlar:** Framer Motion

### Proje Yapısı

```
salliusagicoop/
├── .github/
│   └── workflows/
│       └── heartbeat.yml          # Supabase otomatik ping (her 2 günde bir)
├── public/
│   └── images/                    # Görseller (projeler, logo, hero)
├── src/
│   ├── app/
│   │   ├── (site)/                # Public sayfalar
│   │   │   ├── page.tsx           # Anasayfa
│   │   │   ├── hakkimizda/
│   │   │   ├── projeler/
│   │   │   ├── haberler/
│   │   │   ├── duyurular/
│   │   │   ├── uyelerimiz/
│   │   │   ├── yonetim/
│   │   │   └── iletisim/
│   │   ├── admin/                 # Admin paneli (gelecekte)
│   │   ├── api/
│   │   │   └── heartbeat/         # Supabase heartbeat endpoint
│   │   ├── layout.tsx             # Root layout (metadata, fonts)
│   │   └── globals.css            # Global CSS
│   ├── components/
│   │   ├── cards/                 # Kart componentleri
│   │   ├── admin/                 # Admin componentleri
│   │   ├── Header.tsx             # Navbar
│   │   ├── Footer.tsx             # Footer
│   │   └── ...                    # Diğer UI componentleri
│   └── lib/
│       ├── supabase/              # Supabase client/server
│       ├── mockData.ts            # Mock/seed veriler
│       └── types.ts               # TypeScript tipleri
├── .env.local                     # Environment variables (git'e eklenmez)
├── package.json
└── README.md
```

---

## 🚀 Kurulum (Geliştiriciler İçin)

### 1. Projeyi İndirin

```bash
git clone https://github.com/[kullanıcı]/salliusagicoop.git
cd salliusagicoop
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

`.env.local` dosyası oluşturun:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=https://salliusagi-kooperatifi.org.tr

# Supabase (Supabase Dashboard → Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Veritabanı Kurulumu

#### a) Supabase Projesini Oluşturun
1. [supabase.com](https://supabase.com) → Yeni proje
2. Project Settings → API → URL ve anon key'i kopyalayın

#### b) Tabloları Oluşturun

Supabase Dashboard → SQL Editor → Şu SQL'i çalıştırın:

```sql
-- Üyeler Tablosu
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  name text,
  surname text,
  fullName text,
  position text,
  department text,
  email text,
  phone text,
  avatar text,
  bio text,
  joinDate date,
  isActive boolean default true,
  role text check (role in ('member','board','audit','admin')),
  createdAt timestamp default now(),
  updatedAt timestamp default now()
);

-- Yönetim Kurulu Tablosu
create table if not exists board_members (
  id uuid primary key default gen_random_uuid(),
  fullName text not null,
  position text not null,
  email text,
  phone text,
  avatar text,
  bio text,
  joinDate date,
  isActive boolean default true,
  role text default 'board',
  "order" int,
  responsibilities text[],
  createdAt timestamp default now(),
  updatedAt timestamp default now()
);

-- Duyurular Tablosu
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  date date not null,
  published boolean default false,
  createdAt timestamp default now(),
  updatedAt timestamp default now(),
  isImportant boolean default false,
  author text
);

-- Haberler Tablosu
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  author text,
  publishedAt date,
  updatedAt date,
  featuredImage text,
  images text[],
  tags text[],
  isPublished boolean default false,
  isFeatured boolean default false,
  createdAt timestamp default now()
);

-- İndeksler (Performans için)
create index if not exists idx_news_published on news(publishedAt desc) where isPublished = true;
create index if not exists idx_announcements_date on announcements(date desc) where published = true;
```

#### c) Row Level Security (RLS) Ayarlayın

**Geliştirme için (Herkese Açık):**

```sql
-- RLS'i etkinleştir
alter table members enable row level security;
alter table board_members enable row level security;
alter table announcements enable row level security;
alter table news enable row level security;

-- Geliştirme için herkes okuyabilir
create policy "Allow read for all" on members for select using (true);
create policy "Allow read for all" on board_members for select using (true);
create policy "Allow read for all" on announcements for select using (true);
create policy "Allow read for all" on news for select using (true);
```

**⚠️ ÜRETİM İÇİN:** Admin paneli ile authentication eklendiğinde, yazma politikalarını sadece authenticated kullanıcılarla sınırlayın.

#### d) Supabase Auth URL Ayarları

Supabase Dashboard → Authentication → URL Configuration:

- **Site URL:** `https://salliusagi-kooperatifi.org.tr`
- **Redirect URLs:** 
  ```
  https://salliusagi-kooperatifi.org.tr/**
  https://www.salliusagi-kooperatifi.org.tr/**
  http://localhost:3000/**
  ```

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Site açılır: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment (Vercel)

### 1. Vercel'e Deploy Edin

```bash
# Vercel CLI ile
npm i -g vercel
vercel

# Veya GitHub bağlantısı ile otomatik deploy
# https://vercel.com/new → GitHub repo'nuzу bağlayın
```

### 2. Environment Variables Ekleyin

Vercel Dashboard → Project → Settings → Environment Variables:

| Name | Value | Environments |
|------|-------|--------------|
| `NEXT_PUBLIC_SITE_URL` | `https://salliusagi-kooperatifi.org.tr` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_URL` | `your_supabase_url` | Hepsi |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_supabase_anon_key` | Hepsi |

### 3. Custom Domain Bağlayın

Vercel Dashboard → Domains → Add:
- `salliusagi-kooperatifi.org.tr`
- `www.salliusagi-kooperatifi.org.tr`

DNS ayarlarını yapın (Vercel size gösterir).

---

## 🔄 Supabase Heartbeat Sistemi

Supabase Free Tier'da projeler 7 gün inaktif kalırsa pause olur. Bunu önlemek için **çift güvenlik sistemi** kurduk:

### Sistem 1: GitHub Actions

**Dosya:** `.github/workflows/heartbeat.yml`

- **Ne yapar:** Her 2 günde bir `/api/heartbeat` endpoint'ini çağırır
- **Zamanlama:** Her 2 günde bir, 09:00 UTC (12:00 TR)
- **Özellikler:** 
  - 3 retry mekanizması
  - 30 saniye timeout
  - Redirect desteği
  - Detaylı logging

**İzleme:** GitHub → Actions sekmesi

### Sistem 2: cron-job.org (Dış Servis)

**Kurulum:**
1. [cron-job.org](https://cron-job.org) hesabı oluşturun
2. Yeni cronjob ekleyin:
   - **URL:** `https://salliusagi-kooperatifi.org.tr/api/heartbeat`
   - **Schedule:** Her 2 günde bir
   - **Notifications:** Email on failure ✅

**İzleme:** cron-job.org dashboard

### Heartbeat Endpoint

**Endpoint:** `/api/heartbeat`  
**Dosya:** `src/app/api/heartbeat/route.ts`

**Ne yapar:**
- Supabase `announcements` tablosuna hafif bir okuma isteği atar
- Sadece kayıt sayısını alır (çok hafif)
- Cache'lenmez (`no-store`)

**Test:**
```bash
curl https://salliusagi-kooperatifi.org.tr/api/heartbeat
```

**Beklenen Yanıt:**
```json
{
  "ok": true,
  "timestamp": "2025-11-10T10:32:35.577Z",
  "message": "Supabase connection active",
  "recordCount": 1
}
```

---

## 📦 Ana Özellikler

### 🎨 Frontend

- **Responsive Tasarım:** Mobil, tablet, desktop optimizasyonu
- **SEO Optimizasyonu:** Metadata, sitemap, robots.txt
- **Görsel Optimizasyonu:** Next.js Image component ile otomatik optimizasyon
- **Animasyonlar:** Smooth geçişler ve hover efektleri
- **Dinamik Routing:** Proje ve haber detay sayfaları

### 🗄️ Backend (Supabase)

- **Haberler:** Yayınlama, etiketleme, featured işaretleme
- **Duyurular:** Önemli/normal duyurular
- **Üyeler:** Üye bilgileri ve rolleri
- **Yönetim Kurulu:** Yönetici profilleri ve sorumluluklar

### 🔐 Admin Paneli (Geliştirilecek)

- **Yol:** `/admin`
- **Sayfalar:** Üyeler, Yönetim, Duyurular, Haberler
- **Gelecek:** Supabase Auth entegrasyonu

---

## 📂 Önemli Dosyalar

### Environment Variables

`.env.local` (git'e eklenmez):
```env
NEXT_PUBLIC_SITE_URL=https://salliusagi-kooperatifi.org.tr
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Client

- **Client-side:** `src/lib/supabase/client.ts`
- **Server-side:** `src/lib/supabase/server.ts`

### Mock Data

`src/lib/mockData.ts` - Projeler için örnek/seed veriler

### Types

`src/lib/types.ts` - TypeScript tip tanımlamaları

---

## 🎨 Tasarım Sistemi

### Renkler

Proje renk paleti: `src/lib/colors.ts`

- **Ana Renk:** Yeşil (`green-600`)
- **İkincil:** Mavi, Turuncu, Mor
- **Nötr:** Gray scale

### Componentler

**Yeniden Kullanılabilir:**
- `Container` - Merkezi hizalama ve padding
- `Section` - Bölüm wrapper (background varyantları)
- `Breadcrumbs` - Sayfa yolu gösterimi
- `RotatingText` - Anasayfa animasyonlu metin
- `RichTextEditor` - Lexical tabanlı editör

**Kart Componentleri:**
- `ProjectCard` - Proje kartı (basit varyant mevcut)
- `NewsCard` - Haber kartı
- `AnnouncementCard` - Duyuru kartı
- `MemberCard` - Üye kartı

---

## 📝 İçerik Yönetimi

### Projeler

**Ana Projeler (6 adet):**
1. Özel Ağaçlandırma Projesi
2. Hayvansal Üretim Projeleri
3. Bitkisel Üretim Projeleri
4. Tarımsal Sanayi Projeleri
5. El Sanatları Halı-Kilim Üretim Projeleri
6. Eğitim ve Spor Merkezi Projeleri

**Güncelleme:** `src/lib/mockData.ts` dosyasını düzenleyin

**Özellikler:**
- `description` - Paragraflar için `\n\n` kullanın
- `images` - Görsel dizisi
- `hierarchy` - "main" veya "sub"
- `children` - Alt proje ID'leri

### Haberler ve Duyurular

**Supabase Dashboard'dan yönetin:**
- SQL Editor → INSERT sorguları
- Veya admin paneli geliştirerek (gelecek)

---

## 🧪 Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu (lokal test)
npm run start

# Linter
npm run lint
```

---

## 🔍 SEO ve Meta

### Sitemap

Otomatik oluşturulur: `https://salliusagi-kooperatifi.org.tr/sitemap.xml`

**Dosya:** `src/app/sitemap.ts`

### Robots.txt

Otomatik oluşturulur: `https://salliusagi-kooperatifi.org.tr/robots.txt`

**Dosya:** `src/app/robots.ts`

**Engellenenler:**
- `/admin/*`
- `/login`

### Open Graph

Her sayfada özel metadata tanımlı.

**Örnek:** `src/app/(site)/page.tsx` → metadata export

---

## 🐛 Sorun Giderme

### Supabase Bağlantı Hatası

```bash
# .env.local dosyasını kontrol edin
cat .env.local

# Supabase URL ve key'lerin doğru olduğundan emin olun
```

### Heartbeat Çalışmıyor

```bash
# Manuel test
curl https://salliusagi-kooperatifi.org.tr/api/heartbeat

# Beklenen: {"ok":true,...}
```

**GitHub Actions:** Actions → Logs'ta hata mesajlarını kontrol edin

**cron-job.org:** History → Failed execution → Details

### Build Hatası

```bash
# Cache temizle
rm -rf .next
npm install
npm run build
```

### Environment Variables Yüklenmedi

Vercel'de:
1. Settings → Environment Variables
2. Redeploy yapın (env vars değiştiğinde gerekli)

---

## 🔒 Güvenlik

### RLS (Row Level Security)

Supabase'de tüm tablolarda RLS aktif.

**Geliştirme:** Okuma herkese açık  
**Üretim:** Authentication eklenince yazma yetkilerini kısıtlayın

### Environment Variables

- `.env.local` dosyası git'e eklenmez (`.gitignore`)
- Production secrets Vercel'de saklanır
- Asla public key'leri kodda hardcode etmeyin

### HTTPS

- Tüm sayfalar HTTPS ile çalışır
- Vercel otomatik SSL sertifikası sağlar
- HSTS header'ı aktif

---

## 📊 Monitoring ve Bakım

### 1. Supabase Heartbeat

**İki sistem aktif:**
- GitHub Actions (her 2 günde bir, 09:00 UTC)
- cron-job.org (her 2 günde bir, farklı saatte)

**İzleme:**
- GitHub → Actions → "Supabase Heartbeat"
- cron-job.org → Jobs → History

### 2. Error Monitoring

- Vercel Dashboard → Analytics → Errors
- Logs → Runtime logs

### 3. Performance

- Vercel Dashboard → Analytics → Web Vitals
- Lighthouse score kontrolü

---

## 🔄 Güncelleme Workflow'u

### İçerik Güncellemeleri

1. **Projeler:** `src/lib/mockData.ts` düzenle → commit → push
2. **Haberler/Duyurular:** Supabase Dashboard'dan ekle
3. **Görseller:** `public/images/` altına ekle → commit → push

### Kod Güncellemeleri

```bash
# 1. Değişiklik yap
# 2. Test et
npm run dev

# 3. Commit
git add .
git commit -m "feat: Açıklama"
git push origin main

# 4. Vercel otomatik deploy eder
```

### Vercel Redeploy (Env vars değişince)

Settings → Deployments → Latest → ⋯ → Redeploy

---

## 🆘 Destek ve İletişim

### Teknik Sorunlar

1. **GitHub Issues:** Repository → Issues
2. **Email:** [Geliştirici email]

### Dokümantasyon

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## 📜 Lisans

© 2025 Şallıuşağı Üretim ve Pazarlama Kooperatifi. Tüm hakları saklıdır.

---

## 🙏 Katkıda Bulunanlar

- **Proje Sahibi:** Şallıuşağı Kooperatifi
- **Geliştirme:** [Geliştirici bilgileri]
- **Tasarım:** Modern UI/UX prensipleri

---

## 📌 Notlar

### Gelecek Geliştirmeler

- [ ] Admin paneli için Supabase Auth entegrasyonu
- [ ] Rich text editor ile admin'den içerik yönetimi
- [ ] İletişim formu backend entegrasyonu
- [ ] Email bildirimleri (yeni üye, form gönderimi)
- [ ] Multi-language desteği (TR/EN/DE)
- [ ] Analytics dashboard
- [ ] SEO iyileştirmeleri

### Bilinen Sınırlamalar

- Admin paneli henüz authentication gerektirmiyor (geliştirme aşamasında)
- İletişim formu henüz backend'e bağlı değil
- Proje görselleri statik (mockData'dan geliyor)

---

## 🚀 Hızlı Başlangıç (30 saniyede)

```bash
# 1. Clone
git clone [repo-url]
cd salliusagicoop

# 2. Install
npm install

# 3. Env setup
echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" > .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=your_url" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key" >> .env.local

# 4. Run
npm run dev
```

Hazır! 🎉

---

**Son Güncelleme:** Kasım 2025  
**Versiyon:** 1.0.0  
**Next.js:** 16.0.0  
**Domain:** [salliusagi-kooperatifi.org.tr](https://salliusagi-kooperatifi.org.tr)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase Entegrasyonu (Adım Adım)

1. Supabase projesi oluşturun

- https://supabase.com üzerinden yeni bir proje açın.
- Proje URL ve anon key değerlerini not alın.

2. Ortam değişkenlerini ekleyin

- Proje kökünde `.env.local` dosyası oluşturun:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Paketleri yükleyin

```
npm install @supabase/supabase-js
```

4. İstemci kullanımı

- `src/lib/supabaseClient.ts` dosyası hazır. İçe aktararak kullanın:

```ts
import { supabase } from "@/lib/supabaseClient";
```

5. Tabloları oluşturun (Örnek şema)

- SQL Editor > Run:

```sql
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
  role text check (role in ('member','board','audit','admin'))
);

create table if not exists board_members (
  id uuid primary key default gen_random_uuid(),
  fullName text,
  position text,
  email text,
  phone text,
  avatar text,
  bio text,
  joinDate date,
  isActive boolean default true,
  role text default 'board',
  "order" int,
  responsibilities text[]
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text,
  content text,
  date date,
  published boolean default false,
  createdAt timestamp default now(),
  updatedAt timestamp default now(),
  isImportant boolean default false,
  author text
);

create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text,
  slug text unique,
  content text,
  excerpt text,
  author text,
  publishedAt date,
  updatedAt date,
  featuredImage text,
  images text[],
  tags text[],
  isPublished boolean default false,
  isFeatured boolean default false
);
```

6. RLS ve politika (geliştirme için açık erişim)

```sql
alter table members enable row level security;
alter table board_members enable row level security;
alter table announcements enable row level security;
alter table news enable row level security;

create policy "Allow all for anon" on members for all using (true) with check (true);
create policy "Allow all for anon" on board_members for all using (true) with check (true);
create policy "Allow all for anon" on announcements for all using (true) with check (true);
create policy "Allow all for anon" on news for all using (true) with check (true);
```

Not: Canlıya çıkmadan önce yetkilendirme politikalarını kısıtlayın ve Supabase Auth ekleyin.

7. Admin Paneli

- `/admin` altında sol menülü düzen hazır: `src/app/admin/layout.tsx` ve `src/components/admin/Navigation.tsx`.
- Yönetilebilir sayfalar: `/admin/uyeler`, `/admin/yonetim`, `/admin/duyurular`, `/admin/haberler`.

8. Giriş Sayfası (ileride auth)

- `/login` sayfası stub olarak eklendi; Supabase Auth daha sonra bağlanacak.

9. Hata sayfası

- `src/app/not-found.tsx` mevcut.

denme123

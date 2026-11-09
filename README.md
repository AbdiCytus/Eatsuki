# 🍔 Eatsuki — Landing Page

> **Solusi Cepat dan Tepat di Waktu Lapar.**  
> Landing page modern, interaktif, dan responsif dengan tema gaya visual *Claymorphism*.

---

## 📖 Tentang Website Ini

**Eatsuki** adalah website *landing page* promosi dan etalase digital untuk brand kuliner makanan cepat saji (*fast food*) dan aneka *side dish* favorit.

### 💡 Asal-Usul & Filosofi Nama "Eatsuki"
Nama **Eatsuki** memiliki filosofi yang unik, bermakna, dan berkesan:
1. **Gabungan Dua Bahasa:**
   - **Eat** *(Bahasa Inggris)* = Makan
   - **Suki / 好き** *(Bahasa Jepang)* = Suka / Gemar  
   Secara harfiah, nama ini memiliki makna **"Suka Makan"**.
2. **Plesetan dari Nama "Itsuki":**  
   Nama **Eatsuki** juga merupakan pelesetan bunyi kata dari nama karakter maskotnya, yaitu **Itsuki**. Pelafalannya terdengar mirip dan secara cerdas menggambarkan identitas karakter tersebut yang sangat gemar makan.

### 🌸 Karakter Maskot
Website ini mengusung konsep tematik yang terinspirasi dari karakter anime populer **Itsuki Nakano** (dari serial *The Quintessential Quintuplets* / *5-toubun no Hanayome*). Dikenal dengan nafsu makannya yang besar (*glutton / foodie*) dan kecintaannya yang tulus pada makanan enak, Itsuki hadir sebagai maskot utama brand untuk mencerminkan semangat makan kenyang, nikmat, dan tanpa rasa ragu.

Melalui website ini, pengunjung dapat:
- Menjelajahi katalog makanan cepat saji berkualitas (burger jumbo, kebab spesial, ayam krispy, hot dog, pizza, dll.).
- Menemukan aneka camilan dan menu pelengkap (*side dish* seperti dimsum, mendoan, rice bowl, telur gulung, dll.).
- Melihat penawaran paket hemat spesial keluarga/teman dengan diskon menarik.
- Memberikan ulasan dan testimoni interaktif secara langsung yang tersimpan aman di database.

---

## ✨ Fitur Utama

- **🎨 Claymorphism Design System**:
  Tampilan visual bertema *Claymorphism* dengan sudut membulat tebal (*puffy rounded cards*), multi-layer shadow timbul, warna solid bold tanpa gradasi (*Crimson Red* `#DC2626` sebagai warna primer dan *Warm Amber* `#F97316` sebagai aksen sekunder).

- **🦸 Hero Section Dinamis**:
  Menampilkan background banner ilustrasi Itsuki (`itsuki_banner.webp`), slogan brand, dan tombol navigasi aksi (*Call-to-Action*) yang kontras dan jelas.

- **🎁 Section Paket Hemat**:
  Penawaran paket komplit hemat 35% berlatar belakang merah cerah, dilengkapi informasi harga coret, daftar menu komplit, dan maskot *Itsuki Chibi*.

- **🍽️ Katalog Menu Terpadu (Toggle Tab)**:
  Satu section terpusat untuk **Menu Utama** dan **Side Dish** menggunakan filter tombol *toggle* claymorphism. Dioptimalkan dalam susunan **2 kolom** yang rapi di layar ponsel.

- **📖 Section Tentang Kami**:
  Menceritakan filosofi brand dengan 3 selling point utama (*Cepat & Praktis*, *Rasa Autentik*, *Harga Bersahabat*) menggunakan ikon modern dari Heroicons serta visual Itsuki.

- **💬 Sistem Komentar & Ulasan Interaktif (Full CRUD)**:
  - **CRUD Lengkap:** Pengunjung dapat menulis, mengedit, dan menghapus komentar.
  - **Session-Based Security:** Komentar terikat dengan `sessionId` unik per browser. Pengguna lain tidak diizinkan mengubah atau menghapus komentar milik orang lain (dilindungi validasi sisi klien dan *guard* HTTP 403 di server).
  - **Lock Nama Otomatis:** Nama pengguna langsung tersimpan di *local storage* setelah pengiriman pertama sehingga nama tidak berganti-ganti, namun tetap fleksibel dengan opsi "Ganti nama".
  - **Smart Scroll Container:** Hanya menampilkan 2 komentar teratas secara default; komentar berikutnya dapat discroll dengan efek gradasi pudar (*fade overlay*).

- **📱 Mobile-Friendly & Responsif Penuh**:
  Seluruh layout, ukuran font, padding, dan komponen telah dioptimalkan secara presisi agar nyaman digunakan di berbagai ukuran layar smartphone hingga monitor desktop.

---

## 🛠️ Tech Stack

- **Framework Web:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library UI:** [React 19](https://react.dev/)
- **Bahasa Pemrograman:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icon Set:** [Heroicons](https://heroicons.com/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) & [Prisma ORM v7](https://www.prisma.io/) (Driver Adapter `@prisma/adapter-pg`)
- **Runtime:** [Bun](https://bun.sh/)
- **Platform Deployment:** [Vercel](https://vercel.com/)

---

## 📁 Struktur Direktori

```text
eatsuki/
├── app/
│   ├── api/comments/          # Endpoint API Route (GET, POST, PUT, DELETE)
│   ├── components/            # Komponen UI (Navbar, Hero, Menu, About, Comments, Footer)
│   ├── generated/prisma/      # Prisma Client yang digenerate
│   ├── globals.css            # Desain token Tailwind CSS v4 (@theme & styling claymorphism)
│   ├── layout.tsx             # Root layout & konfigurasi font Google
│   └── page.tsx               # Entry page komposisi seluruh section
├── lib/
│   └── db.ts                  # Inisialisasi singleton PrismaClient (Lazy Proxy Pattern)
├── prisma/
│   ├── schema.prisma          # Definisi schema database Comment
│   └── migrations/            # Riwayat migrasi database PostgreSQL
├── public/                    # Aset gambar, maskot Itsuki, dan banner
├── prisma7.config.ts          # Konfigurasi Prisma v7
└── package.json
```

---

## 👤 Author

Dibuat oleh **Abdi Prayuda (AbdiCytus)**.

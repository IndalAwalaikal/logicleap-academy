# Logicleap Academy

Logicleap Academy adalah sebuah platform edukasi interaktif berbasis web yang dibangun untuk memfasilitasi proses pembelajaran melalui materi, latihan, kuis interaktif, hingga permainan (games) edukatif. Aplikasi ini menggunakan teknologi web modern untuk memastikan performa yang cepat, responsif, dan antarmuka yang ramah pengguna.

## 🚀 Fitur Utama

- **Materi Pembelajaran (`Materi.tsx`, `MateriLengkap.tsx`)**: Menyajikan materi pembelajaran yang terstruktur dan komprehensif.
- **Latihan Interaktif (`Latihan.tsx`)**: Modul latihan praktis untuk menguji pemahaman konsep secara langsung.
- **Sistem Kuis (`Kuis.tsx`)**: Evaluasi pembelajaran melalui sistem kuis yang dinamis.
- **Games Edukatif (`Games.tsx`)**: Pendekatan *gamification* untuk membuat proses belajar menjadi lebih menyenangkan.
- **Desain Responsif**: Antarmuka yang beradaptasi dengan baik di berbagai ukuran layar (Desktop, Tablet, dan Mobile) berkat penggunaan Tailwind CSS.
- **Animasi & Interaktivitas**: Menggunakan pustaka seperti Framer Motion/Tailwind Animate dan efek visual (seperti react-confetti) untuk pengalaman pengguna yang lebih hidup.
- **Code Editor Terintegrasi**: Menggunakan `@monaco-editor/react` untuk memungkinkan pengguna menulis dan mengeksekusi kode secara langsung di dalam platform.
- **CI/CD Pipeline Terintegrasi**: Pengujian dan pembangunan aplikasi secara otomatis menggunakan GitHub Actions.

## 🛠️ Tech Stack

Proyek ini dikembangkan menggunakan tumpukan teknologi (tech stack) modern:

- **Framework Core:** [React 18](https://reactjs.org/) dengan [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) (menggunakan SWC plugin untuk kompilasi super cepat)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) dengan plugin Animate & Typography
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (berbasis Radix UI)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) terintegrasi dengan [Zod](https://zod.dev/) untuk validasi skema.
- **State Management / Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Drag and Drop:** [React DnD](https://react-dnd.github.io/react-dnd/about)
- **Code Editor:** Monaco Editor

## 📂 Struktur Proyek

```text
logicleap-academy/
├── .github/
│   └── workflows/
│       └── main.yml        # Konfigurasi CI pipeline GitHub Actions
├── public/                 # Aset statis public
├── src/
│   ├── assets/             # Gambar, ikon, font, dll.
│   ├── components/         # Komponen UI yang dapat digunakan ulang (shadcn/ui dll)
│   ├── hooks/              # Custom React Hooks
│   ├── lib/                # Fungsi utilitas (seperti cn/tailwind-merge)
│   ├── pages/              # Halaman utama aplikasi (Home, Materi, Kuis, dll)
│   ├── App.tsx             # Root component & konfigurasi Routing
│   ├── index.css           # Konfigurasi Tailwind global
│   └── main.tsx            # Entry point aplikasi
├── index.html              # Template utama HTML
├── package.json            # Daftar dependensi & scripts
├── tailwind.config.ts      # Konfigurasi Tailwind CSS
├── tsconfig.json           # Konfigurasi TypeScript
└── vite.config.ts          # Konfigurasi Vite
```

## 🏁 Memulai (Getting Started)

Untuk menjalankan proyek ini secara lokal di mesin Anda, pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (disarankan versi 18 atau 20+) dan `npm`.

### 1. Kloning Repositori

```bash
git clone <URL_REPOSITORI_ANDA>
cd logicleap-academy
```

### 2. Instalasi Dependensi

Instal seluruh paket yang dibutuhkan menggunakan npm:

```bash
npm install
```

### 3. Menjalankan Development Server

Jalankan server Vite untuk pengembangan lokal:

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173/` (atau port lain jika 5173 sedang digunakan).

### 4. Build untuk Production

Untuk menghasilkan *bundle* aplikasi yang siap untuk *deployment*:

```bash
npm run build
```

Hasil build akan berada di dalam folder `dist/`.

## 📜 Daftar Script (NPM Scripts)

- `npm run dev`: Menjalankan server pengembangan (HMR aktif).
- `npm run build`: Membangun aplikasi untuk produksi.
- `npm run build:dev`: Membangun aplikasi dengan mode development.
- `npm run lint`: Menjalankan ESLint untuk memeriksa dan menemukan masalah pada kode (kualitas kode).
- `npm run preview`: Mem-preview hasil build lokal sebelum proses deployment sesungguhnya.

## ⚙️ Continuous Integration (CI/CD)

Proyek ini telah dikonfigurasi dengan GitHub Actions untuk CI. 
Setiap kali ada `push` atau `pull request` ke branch `main`, pipeline secara otomatis akan:
1. Mempersiapkan Node.js (versi 20).
2. Menginstal seluruh dependensi (`npm ci`).
3. Memverifikasi kualitas kode menggunakan ESLint (`npm run lint`).
4. Memastikan bahwa proses build berjalan dengan sukses (`npm run build`).

File konfigurasi workflow dapat ditemukan di `.github/workflows/main.yml`.

---
*Dikembangkan untuk Logicleap Academy.*

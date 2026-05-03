import { useState, ElementType } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileCode,
  Code,
  ExternalLink,
  Clock,
  ArrowRight,
  Lightbulb,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowLeft,
  GitBranch,
  Workflow,
  Layers,
  Settings,
  Cpu,
  Globe,
  Database,
  AlertCircle,
  Target,
} from "lucide-react";
imort Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import goLang from "react-syntax-highlighter/dist/esm/languages/prism/go";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Daftarkan bahasa untuk syntax highlighter
if (typeof SyntaxHighlighter.registerLanguage === "function") {
  SyntaxHighlighter.registerLanguage("go", goLang);
}

type Topic = {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "professional";
  duration: string;
  icon: ElementType;
  locked: boolean;
  content: {
    explanation: string;
    keyPoints: string[];
    example: string;
    tips: string[];
    resources: { title: string; url: string }[];
  };
};

// Data topik dengan penjelasan yang diperpanjang
const topics: Topic[] = [
  {
    id: "intro-golang",
    title: "Pengenalan Go (Golang)",
    description:
      "Pelajari dasar komprehensif Go: sejarah, filosofi, instalasi, struktur program, dan ekosistem pengembangan.",
    level: "beginner",
    duration: "30 menit",
    icon: Lightbulb,
    locked: false,
    content: {
      explanation:
        "Go (juga dikenal sebagai Golang) adalah bahasa pemrograman open-source yang dirancang di Google dan dirilis secara publik pada November 2009. Go dibuat oleh Robert Griesemer, Rob Pike, dan Ken Thompson—para tokoh di balik sistem operasi Unix dan bahasa C. Mereka merancang Go untuk menjawab masalah nyata dalam pengembangan perangkat lunak skala besar: kompilasi lambat, kompleksitas berlebihan, manajemen konkurensi yang rumit, dan ketergantungan pada toolchain eksternal.\n\nGo adalah bahasa compiled, statically typed, dengan garbage collection otomatis, dan kompilasi yang sangat cepat ke binary native. Meskipun dikompilasi seperti C/C++, Go terasa ringan dan mudah seperti bahasa skrip berkat sintaks minimalis dan toolchain terintegrasi.\n\nSalah satu kekuatan utama Go adalah dukungan bawaan untuk konkurensi melalui goroutine (unit eksekusi ringan) dan channel (mekanisme komunikasi aman antar goroutine). Pendekatan ini memungkinkan pengembang membangun aplikasi jaringan dan layanan backend yang sangat efisien dan scalable.\n\nGo sengaja tidak menyertakan fitur seperti inheritance, exception (try/catch), atau operator overloading. Sebagai gantinya, Go mendorong komposisi, antarmuka implisit, dan penanganan error eksplisit melalui nilai kembalian—pendekatan yang membuat kode lebih transparan dan mudah di-debug.\n\nEkosistem Go sangat matang. Proyek-proyek infrastruktur kritis seperti Docker, Kubernetes, Prometheus, Terraform, dan Grafana dibangun dengan Go. Toolchain bawaan (`go build`, `go test`, `go fmt`, `go mod`) memungkinkan pengembangan end-to-end tanpa dependensi eksternal.\n\nUntuk memulai: unduh Go dari https://go.dev/dl/, buat file `.go`, dan jalankan dengan `go run`. Setiap program yang dapat dieksekusi harus berada di `package main` dan memiliki fungsi `func main()`.",
      keyPoints: [
        "Dikembangkan di Google pada 2009 oleh tim yang berpengalaman dalam sistem Unix dan C.",
        "Bahasa compiled, statically typed, dengan garbage collection dan kompilasi sangat cepat.",
        "Dirancang untuk konkurensi: goroutine ringan dan channel untuk komunikasi aman antar proses.",
        "Tidak ada inheritance atau exception—mengandalkan komposisi dan penanganan error eksplisit.",
        "Standard library sangat lengkap: HTTP, JSON, crypto, testing, database/sql, dan lainnya.",
        "Toolchain bawaan terintegrasi: build, test, format, modul, dokumentasi, profiling—semua dalam satu distribusi.",
        "Kompatibilitas mundur dijamin sejak Go 1 (2012)—kode lama tetap berjalan di versi baru tanpa modifikasi.",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, 世界!")\n}`,
      tips: [
        "Instal Go dari https://go.dev/dl/ dan verifikasi dengan perintah `go version` di terminal.",
        "Jalankan program langsung tanpa membuat binary menggunakan `go run namafile.go`.",
        "Format kode otomatis dengan `Ctrl + Enter` (di Go Playground) atau `gofmt -w .` di lokal.",
        "Nama fungsi, tipe, atau variabel yang diawali huruf kapital (misalnya `MyFunc`) bersifat publik dan dapat diekspor ke package lain.",
        "Mulai proyek baru dengan `go mod init namaprojek` untuk mengaktifkan manajemen modul modern.",
        "Eksplorasi standard library di https://pkg.go.dev/std — seringkali Anda tidak perlu library pihak ketiga.",
        "Pelajari gaya penulisan idiomatik Go melalui dokumen 'Effective Go' dan praktik langsung di 'A Tour of Go'.",
      ],
      resources: [
        { title: "Dokumentasi Resmi Go", url: "https://go.dev/doc/" },
        { title: "A Tour of Go (Interaktif)", url: "https://go.dev/tour/" },
        {
          title: "Effective Go – Panduan Menulis Kode Idiomatik",
          url: "https://go.dev/doc/effective_go",
        },
        { title: "Go Playground (Editor Online)", url: "https://go.dev/play/" },
        { title: "Referensi Standard Library", url: "https://pkg.go.dev/std" },
        { title: "Go by Example", url: "https://gobyexample.com/" },
      ],
    },
  },
  {
    id: "structure",
    title: "Struktur Dasar Program Go",
    description:
      "Pelajari komponen inti dari setiap program Go: package, import, fungsi main, serta konvensi penulisan dan eksekusi kode.",
    level: "beginner",
    duration: "20 menit",
    icon: FileCode,
    locked: false,
    content: {
      explanation:
        "Setiap program Go memiliki struktur dasar yang konsisten dan minimalis. Bahasa Go dirancang agar kode mudah dibaca, dirawat, dan diperluas.\n\n" +
        "Struktur program Go biasanya terdiri dari tiga bagian utama: deklarasi package, blok import, dan fungsi utama (main). Berikut penjelasan rinci untuk masing-masing bagian.\n\n" +
        "1. Package\n" +
        "Setiap file Go dimulai dengan pernyataan `package <nama>`. Package berfungsi sebagai cara Go mengorganisasi kode ke dalam modul yang terpisah agar mudah digunakan kembali. Jika Anda membuat program yang dapat dijalankan langsung (executable), gunakan `package main`. Package lain, seperti `package mathutils` atau `package models`, digunakan untuk pustaka (library) yang akan diimpor oleh program lain.\n\n" +
        "Contoh:\n" +
        "```go\npackage main\n```\n" +
        "Jika Anda menulis library untuk digunakan oleh proyek lain, gunakan nama package yang sesuai dengan fungsinya, misalnya:\n" +
        "```go\npackage helper\n```\n\n" +
        "2. Import\n" +
        "Bagian ini digunakan untuk memuat pustaka (library) yang dibutuhkan. Go memiliki standard library yang sangat kaya, mencakup banyak kebutuhan umum seperti input/output, waktu, jaringan, hingga pemrosesan JSON. Impor dapat dilakukan satu per satu atau dalam satu blok agar lebih rapi.\n\n" +
        "Contoh:\n" +
        '```go\nimport (\n    "fmt"\n    "time"\n)\n```\n' +
        "Dengan Go Modules, sistem dependensi akan dikelola secara otomatis tanpa perlu path manual. Anda cukup menggunakan `go mod init` dan `go mod tidy` untuk membuat serta memperbarui dependensi proyek.\n\n" +
        "3. Fungsi main()\n" +
        "Fungsi `main()` adalah titik masuk utama dari program Go. Saat Anda menjalankan `go run`, eksekusi akan dimulai dari fungsi ini. Hanya package `main` yang boleh memiliki fungsi `main()`. Jika fungsi ini tidak ada, file Go hanya dapat digunakan sebagai library.\n\n" +
        "Contoh:\n" +
        '```go\nfunc main() {\n    fmt.Println("Halo, dunia!")\n}\n```\n' +
        "Fungsi ini wajib ada untuk menjalankan program Go secara langsung.\n\n" +
        "4. Sintaks dan Format\n" +
        "Go tidak memerlukan tanda titik koma (;) di akhir setiap baris karena Go akan otomatis menambahkannya saat parsing. Go juga memiliki aturan ketat terkait posisi kurung kurawal.\n\n" +
        "Kurung buka `{` harus berada di akhir baris yang sama dengan deklarasi fungsi atau struktur, bukan di baris baru.\n\n" +
        "Contoh yang benar:\n" +
        '```go\nfunc main() {\n    fmt.Println("Benar")\n}\n```\n' +
        "Contoh yang salah:\n" +
        '```go\nfunc main()\n{\n    fmt.Println("Salah")\n}\n```\n\n' +
        "Selain itu, Go menyediakan tool bawaan bernama `gofmt` yang secara otomatis memformat kode agar seragam di seluruh proyek dan tim.\n\n" +
        "5. Alur Pengembangan\n" +
        "Setelah kode ditulis, ada dua cara utama untuk mengeksekusinya:\n" +
        "- `go run namafile.go` untuk menjalankan program langsung tanpa membuat file biner.\n" +
        "- `go build` untuk mengompilasi kode menjadi file biner (executable) yang dapat dijalankan secara mandiri.\n\n" +
        "Go juga mendukung proses otomatisasi seperti testing (`go test`) dan dokumentasi (`go doc`). Filosofi Go sangat menekankan kesederhanaan, eksplisit, dan efisiensi agar pengembang bisa fokus pada logika, bukan kompleksitas sintaks.\n\n" +
        "Dengan struktur ini, setiap proyek Go menjadi mudah dipahami, cepat dikompilasi, dan mudah diperluas ke skala produksi tanpa harus mengubah pola dasarnya.",

      keyPoints: [
        "Setiap file Go dimulai dengan deklarasi package; gunakan `package main` untuk program yang dapat dieksekusi.",
        "Package digunakan untuk mengorganisasi kode ke dalam modul terpisah dan reusable.",
        "Fungsi `main()` adalah titik masuk utama untuk eksekusi program, hanya boleh ada di package main.",
        "Gunakan blok `import (...)` untuk mengimpor beberapa pustaka sekaligus dengan rapi.",
        "Go tidak memerlukan titik koma; newline digunakan sebagai pemisah antar pernyataan.",
        "Kurung kurawal `{` harus berada di akhir baris deklarasi, bukan di baris baru.",
        "Gunakan `gofmt` agar gaya kode tetap seragam di seluruh proyek.",
        "Standard library Go mencakup kebutuhan umum seperti I/O, HTTP, JSON, dan manajemen waktu.",
        "Go Modules (`go.mod`) mengelola versi dan dependensi secara otomatis dan deterministik.",
      ],

      example:
        'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    fmt.Println("Halo, dunia!")\n    fmt.Println("Waktu saat ini:", time.Now())\n}\n',

      tips: [
        "Gunakan `go mod init namaprojek` untuk membuat proyek baru dengan Go Modules.",
        "Jalankan `gofmt -w .` untuk memformat kode secara otomatis di seluruh file proyek.",
        "Gunakan nama package yang singkat, deskriptif, dan huruf kecil (misalnya `auth`, `config`, `api`).",
        "Hindari `import .` karena dapat menyebabkan ambiguitas nama fungsi atau variabel.",
        "Jika Anda membuat library, gunakan nama package deskriptif seperti `logger` atau `mathutil`, bukan `main`.",
        'Untuk program kecil, Anda dapat mengimpor satu package tanpa blok: `import "fmt"`.',
        "Gunakan `go run` untuk pengujian cepat, dan `go build` untuk distribusi aplikasi.",
        "Gunakan komentar di atas fungsi untuk mendeskripsikan perannya; Go menggunakan komentar tersebut untuk dokumentasi otomatis dengan `go doc`.",
      ],

      resources: [
        {
          title: "Effective Go – Package Names & Program Structure",
          url: "https://go.dev/doc/effective_go#package-names",
        },
        {
          title: "A Tour of Go – Basics",
          url: "https://go.dev/tour/basics/1",
        },
        {
          title: "How to Write Go Code",
          url: "https://go.dev/doc/code",
        },
        {
          title: "Go Modules Reference",
          url: "https://go.dev/ref/mod",
        },
        {
          title: "Go by Example – Hello World",
          url: "https://gobyexample.com/hello-world",
        },
      ],
    },
  },
  {
    id: "variables",
    title: "Variabel dan Tipe Data",
    description:
      "Pelajari cara menyimpan, mengelola, dan memanfaatkan data menggunakan variabel serta tipe data dalam Go.",
    level: "beginner",
    duration: "25 menit",
    icon: Code,
    locked: false,
    content: {
      explanation:
        "Dalam bahasa Go, variabel digunakan untuk menyimpan data agar dapat digunakan kembali di berbagai bagian program. Go adalah bahasa yang bersifat statically typed, artinya setiap variabel harus memiliki tipe data yang diketahui saat kompilasi. Hal ini membuat kode lebih aman dan mudah dipahami, karena kesalahan tipe dapat dideteksi sejak awal sebelum program dijalankan.\n\n" +
        "1. Deklarasi Variabel\n" +
        "Ada dua cara utama untuk mendeklarasikan variabel di Go, yaitu dengan kata kunci `var` dan operator pendek `:=`.\n\n" +
        "- Menggunakan `var`: Digunakan untuk deklarasi eksplisit dengan atau tanpa inisialisasi nilai.\n" +
        "Contoh:\n" +
        '```go\nvar nama string = "Budi"\nvar umur int\numur = 25\n```\n' +
        "Deklarasi ini memberi tahu kompilator bahwa variabel `nama` bertipe string, dan `umur` bertipe int.\n\n" +
        "- Menggunakan `:=`: Dikenal sebagai short variable declaration, biasanya digunakan di dalam fungsi untuk mendeklarasikan variabel sekaligus menginisialisasinya. Go akan otomatis menentukan tipe data berdasarkan nilai yang diberikan.\n" +
        "Contoh:\n" +
        '```go\numur := 25\nnama := "Andi"\n```\n' +
        "Pendekatan ini membuat kode lebih ringkas, namun tidak dapat digunakan di luar fungsi (seperti pada tingkat package).\n\n" +
        "2. Zero Value (Nilai Awal Default)\n" +
        "Jika sebuah variabel dideklarasikan tanpa diberi nilai awal, Go secara otomatis menginisialisasinya dengan nilai default (zero value) sesuai tipe datanya. Tujuan dari zero value adalah untuk memastikan bahwa tidak ada variabel dalam keadaan tidak terdefinisi.\n\n" +
        "Contoh zero value:\n" +
        "- int → 0\n" +
        "- float64 → 0.0\n" +
        '- string → ""\n' +
        "- bool → false\n" +
        "- pointer, interface, slice, map, channel → nil\n\n" +
        "Dengan sistem ini, Go meminimalkan risiko bug akibat variabel yang belum diinisialisasi.\n\n" +
        "3. Tipe Data Dasar\n" +
        "Go menyediakan beberapa tipe data utama yang sering digunakan:\n\n" +
        "- int, int8, int16, int32, int64 → untuk bilangan bulat.\n" +
        "- uint, uint8 (alias byte), uint16, uint32, uint64 → bilangan bulat tanpa tanda.\n" +
        "- float32, float64 → untuk bilangan desimal.\n" +
        "- string → untuk menyimpan teks.\n" +
        "- bool → untuk nilai logika true atau false.\n" +
        "- complex64, complex128 → untuk bilangan kompleks.\n\n" +
        "Go secara default menggunakan `int` dan `float64` jika tipe tidak dispesifikasikan.\n\n" +
        "4. Deklarasi Banyak Variabel Sekaligus\n" +
        "Go mendukung deklarasi beberapa variabel dalam satu baris atau dalam blok agar kode lebih ringkas.\n\n" +
        "Contoh:\n" +
        "```go\nvar x, y, z int = 1, 2, 3\n```\n" +
        "Atau menggunakan blok:\n" +
        '```go\nvar (\n    nama = "Citra"\n    umur = 20\n    aktif = true\n)\n```\n' +
        "Pendekatan ini sangat berguna untuk mengelompokkan variabel yang saling berhubungan.\n\n" +
        "5. Konstanta (const)\n" +
        "Konstanta adalah variabel yang nilainya tidak dapat diubah setelah dideklarasikan. Gunakan kata kunci `const` untuk mendeklarasikannya.\n\n" +
        "Contoh:\n" +
        '```go\nconst Pi = 3.14\nconst AppName = "GoLang Dasar"\n```\n' +
        "Konstanta dapat digunakan di seluruh program untuk nilai tetap seperti batas maksimum, nama aplikasi, atau konfigurasi.\n\n" +
        "6. Konversi Tipe Data (Type Conversion)\n" +
        "Go tidak melakukan konversi tipe secara otomatis, sehingga konversi harus dilakukan secara eksplisit. Ini mencegah kesalahan logika akibat perubahan tipe yang tidak diinginkan.\n\n" +
        "Contoh:\n" +
        "```go\nvar a int = 10\nvar b float64 = float64(a)\nvar c int = int(b)\n```\n" +
        "Perhatikan bahwa hanya tipe yang kompatibel yang dapat dikonversi. Misalnya, string tidak dapat langsung dikonversi ke int tanpa proses parsing.\n\n" +
        "7. Scope (Cakupan Variabel)\n" +
        "Variabel dalam Go memiliki cakupan (scope) berdasarkan tempat deklarasinya:\n" +
        "- Variabel global: dideklarasikan di luar fungsi dan dapat diakses dari seluruh file.\n" +
        "- Variabel lokal: dideklarasikan di dalam fungsi dan hanya berlaku di dalamnya.\n" +
        "Go juga memiliki aturan shadowing: jika variabel dengan nama yang sama dideklarasikan di dalam fungsi, maka variabel global dengan nama sama akan tertimpa (disembunyikan) sementara di dalam fungsi tersebut.\n\n" +
        "8. Praktik Terbaik Penamaan\n" +
        "Go memiliki konvensi penamaan yang khas:\n" +
        "- Gunakan huruf kecil untuk variabel yang bersifat internal (tidak diekspor ke luar package).\n" +
        "- Gunakan huruf kapital di awal nama variabel jika ingin membuatnya dapat diakses dari package lain (exported identifier).\n" +
        "- Pilih nama yang deskriptif dan mudah dimengerti, misalnya `totalHarga` lebih baik daripada `th`.\n\n" +
        "Dengan memahami konsep variabel dan tipe data ini, Anda akan lebih siap menulis program Go yang efisien, aman, dan mudah dibaca. Pengelolaan tipe secara eksplisit adalah salah satu kekuatan Go dalam menjaga stabilitas dan prediktabilitas aplikasi.",

      keyPoints: [
        "Gunakan `var` untuk deklarasi eksplisit di tingkat global atau lokal.",
        "Gunakan operator `:=` untuk deklarasi singkat di dalam fungsi.",
        "Zero value menjamin setiap variabel selalu memiliki nilai awal yang valid.",
        "Go mendukung tipe data dasar: int, float64, string, bool, dan kompleks.",
        "Gunakan `const` untuk nilai tetap yang tidak boleh diubah.",
        "Konversi tipe harus dilakukan secara eksplisit menggunakan nama tipe.",
        "Gunakan nama variabel yang jelas, deskriptif, dan mengikuti konvensi penulisan Go.",
        "Variabel memiliki scope tertentu (global atau lokal) dan dapat mengalami shadowing.",
      ],

      example:
        'package main\n\nimport "fmt"\n\nfunc main() {\n    var nama string = "Budi"\n    umur := 25\n    tinggi := 170.5\n    aktif := true\n\n    const negara = "Indonesia"\n\n    fmt.Printf("Nama: %s\\n", nama)\n    fmt.Printf("Umur: %d tahun\\n", umur)\n    fmt.Printf("Tinggi: %.1f cm\\n", tinggi)\n    fmt.Printf("Aktif: %t\\n", aktif)\n    fmt.Printf("Negara: %s\\n", negara)\n}\n',

      tips: [
        "Gunakan `:=` hanya di dalam fungsi; di luar fungsi gunakan `var`.",
        "Selalu inisialisasi variabel jika memungkinkan untuk kejelasan logika.",
        "Gunakan `const` untuk nilai yang tidak berubah, seperti konfigurasi dan konstanta matematis.",
        "Hindari mendeklarasikan variabel yang tidak digunakan; Go akan menolak kompilasi jika variabel tidak terpakai.",
        "Gunakan tipe yang paling efisien (misalnya `float32` jika tidak membutuhkan presisi tinggi).",
        "Gunakan penamaan yang sesuai konteks — hindari singkatan tidak jelas.",
      ],

      resources: [
        {
          title: "Go Variables – Official Documentation",
          url: "https://go.dev/doc/effective_go#variables",
        },
        {
          title: "A Tour of Go – Variables, Constants, and Types",
          url: "https://go.dev/tour/basics/8",
        },
        {
          title: "W3Schools – Go Variables",
          url: "https://www.w3schools.com/go/go_variables.php",
        },
        {
          title: "Go by Example – Variables and Constants",
          url: "https://gobyexample.com/variables",
        },
      ],
    },
  },
  {
    id: "conditions",
    title: "Percabangan: if, else, switch",
    description: "Membuat keputusan berdasarkan kondisi",
    level: "beginner",
    duration: "25 menit",
    icon: GitBranch,
    locked: false,
    content: {
      explanation:
        "Percabangan di Go memungkinkan program untuk membuat keputusan berdasarkan kondisi tertentu, menggunakan struktur seperti if, else if, else, dan switch. Struktur if di Go sangat sederhana dan tidak memerlukan tanda kurung untuk kondisi, tetapi memerlukan tanda kurung kurawal untuk blok kode, bahkan untuk satu baris. Go juga mendukung inisialisasi variabel langsung dalam pernyataan if, yang berguna untuk variabel sementara yang hanya digunakan dalam blok if tersebut. Misalnya, if x := computeValue(); x > 0 {...} memungkinkan deklarasi x hanya untuk cakupan if. Struktur switch di Go berbeda dari bahasa lain karena tidak memerlukan pernyataan break untuk setiap case; Go secara otomatis keluar dari switch setelah case yang cocok dieksekusi, membuat kode lebih bersih. Switch juga mendukung ekspresi, bukan hanya nilai konstan, dan bahkan bisa digunakan tanpa ekspresi sebagai pengganti rantai if-else yang panjang. Selain itu, Go memiliki fitur seperti fallthrough untuk memaksa eksekusi ke case berikutnya, meskipun ini jarang digunakan. Pendekatan Go dalam percabangan dirancang untuk menghindari kerumitan dan membuat logika keputusan lebih eksplisit, sehingga meningkatkan kejelasan dan mengurangi kesalahan logika dalam kode.",
      keyPoints: [
        "if tidak memerlukan tanda kurung untuk kondisi.",
        "Switch tanpa break otomatis untuk kebersihan kode.",
        "Inisialisasi dalam if untuk variabel sementara.",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc main() {\n    skor := 85\n    if skor >= 90 {\n        fmt.Println("A: Sangat Baik")\n    } else if skor >= 75 {\n        fmt.Println("B: Baik")\n    } else {\n        fmt.Println("C: Perlu Belajar")\n}\n}`,
      tips: [
        "Gunakan inisialisasi dalam if untuk variabel sementara.",
        "Gunakan switch untuk kondisi dengan banyak kemungkinan.",
      ],
      resources: [
        {
          title: "Go Conditions",
          url: "https://www.w3schools.com/go/go_conditions.php",
        },
      ],
    },
  },
  {
    id: "loops",
    title: "Perulangan dan Range",
    description: "Menjalankan kode secara berulang",
    level: "beginner",
    duration: "20 menit",
    icon: Workflow,
    locked: false,
    content: {
      explanation:
        "Go hanya memiliki satu kata kunci untuk perulangan, yaitu for, tetapi sangat fleksibel dan dapat digunakan dalam berbagai bentuk. Pertama, for tradisional (for i := 0; i < n; i++) mirip dengan perulangan di bahasa seperti C, dengan inisialisasi, kondisi, dan pembaruan. Kedua, for dapat digunakan seperti while dengan menghilangkan inisialisasi dan pembaruan, misalnya for kondisi {}, yang terus berjalan selama kondisi benar. Ketiga, Go memperkenalkan kata kunci range untuk mengiterasi struktur data seperti slice, array, string, atau map. Range mengembalikan indeks dan nilai (atau kunci dan nilai untuk map), yang membuat iterasi lebih mudah dan intuitif. Jika indeks tidak diperlukan, Go memungkinkan penggunaan underscore (_) untuk mengabaikannya, misalnya for _, v := range slice. Perulangan di Go dirancang untuk sederhana namun kuat, menghindari kerumitan seperti perulangan do-while atau foreach yang terpisah di bahasa lain. Go juga mendukung pernyataan break untuk keluar dari loop dan continue untuk melompat ke iterasi berikutnya. Penting untuk memastikan bahwa loop tidak berjalan tanpa batas, dan Go menyediakan alat seperti go vet untuk mendeteksi potensi masalah dalam perulangan. Pendekatan ini membuat perulangan di Go efisien dan mudah dipahami, cocok untuk berbagai skenario pemrograman.",
      keyPoints: [
        "for tradisional: for i := 0; i < n; i++ untuk perulangan standar.",
        "for sebagai while: for kondisi {} untuk perulangan berbasis kondisi.",
        "range untuk iterasi slice, array, string, atau map.",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc main() {\n    buah := []string{"Apel", "Jeruk", "Mangga"}\n    for i, v := range buah {\n        fmt.Printf("Indeks: %d, Buah: %s\\n", i, v)\n    }\n}`,
      tips: [
        "Gunakan _ untuk mengabaikan indeks saat menggunakan range.",
        "Pastikan kondisi loop mencegah perulangan tak terbatas.",
      ],
      resources: [
        { title: "Go Loops", url: "https://www.w3schools.com/go/go_loops.php" },
      ],
    },
  },
  {
    id: "arrays-slices",
    title: "Array dan Slice",
    description: "Menyimpan dan mengelola banyak data",
    level: "intermediate",
    duration: "25 menit",
    icon: Layers,
    locked: false,
    content: {
      explanation:
        "Array dan slice adalah struktur data di Go untuk menyimpan koleksi elemen. Array memiliki ukuran tetap yang ditentukan saat deklarasi, misalnya [5]int untuk array dengan 5 elemen bertipe int. Ukuran array adalah bagian dari tipenya, sehingga [5]int dan [10]int dianggap berbeda. Array bersifat statis, artinya ukurannya tidak dapat diubah setelah dideklarasikan. Slice, di sisi lain, adalah struktur dinamis yang dibangun di atas array. Slice tidak memiliki ukuran tetap (ditulis sebagai []T) dan dapat diperpanjang atau dipersingkat menggunakan fungsi seperti append(). Slice sebenarnya adalah struktur data yang terdiri dari pointer ke array dasar, panjang (length), dan kapasitas (capacity). Panjang adalah jumlah elemen saat ini, sedangkan kapasitas adalah jumlah elemen yang dapat ditampung sebelum array dasar perlu dialokasikan ulang. Fungsi seperti make() digunakan untuk menginisialisasi slice dengan panjang atau kapasitas tertentu, misalnya make([]int, 0, 10). Slice sangat fleksibel dan sering digunakan karena kemampuannya untuk tumbuh secara dinamis dan mendukung operasi seperti slicing (mengambil subslice dengan sintaks slice[i:j]). Namun, karena slice berbagi memori dengan array dasar, perubahan pada slice dapat memengaruhi slice lain yang merujuk ke array yang sama. Pemahaman tentang array dan slice sangat penting untuk manipulasi data yang efisien di Go, terutama dalam aplikasi yang membutuhkan pengelolaan koleksi data besar.",
      keyPoints: [
        "Array: Ukuran tetap, ditentukan saat deklarasi ([n]T).",
        "Slice: Dinamis, tanpa ukuran tetap ([]T).",
        "append(): Menambah elemen ke slice secara dinamis.",
        "len() dan cap(): Mengukur panjang dan kapasitas slice.",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc main() {\n    slice := []int{4, 5}\n    slice = append(slice, 6)\n    fmt.Println("Slice:", slice)\n}`,
      tips: [
        "Gunakan make() untuk menginisialisasi slice dengan kapasitas awal.",
        "Hati-hati dengan slicing karena slice berbagi memori dengan array dasar.",
      ],
      resources: [
        { title: "Go Slices", url: "https://go.dev/blog/slices-intro" },
      ],
    },
  },
  {
    id: "functions",
    title: "Fungsi dan Parameter",
    description: "Membagi program menjadi bagian modular",
    level: "intermediate",
    duration: "25 menit",
    icon: Settings,
    locked: false,
    content: {
      explanation:
        "Fungsi adalah blok kode yang melakukan tugas tertentu dan membuat program lebih modular dan mudah dipelihara. Di Go, fungsi didefinisikan dengan kata kunci func, diikuti oleh nama fungsi, parameter (jika ada), tipe kembalian (jika ada), dan blok kode. Go mendukung fitur unik seperti multiple return values, yang memungkinkan fungsi mengembalikan lebih dari satu nilai, sering digunakan untuk mengembalikan hasil dan error secara bersamaan. Misalnya, sebuah fungsi dapat mengembalikan hasil perhitungan dan error jika terjadi masalah, seperti pembagian dengan nol. Go juga mendukung named return values, di mana nilai kembalian dideklarasikan dengan nama di kepala fungsi, membuat kode lebih jelas tetapi harus digunakan dengan hati-hati untuk menghindari kebingungan. Selain itu, Go memiliki variadic parameters (ditandai dengan ...), yang memungkinkan fungsi menerima jumlah argumen yang tidak tetap, seperti dalam fungsi fmt.Printf. Parameter di Go bersifat pass-by-value, artinya salinan nilai dikirim ke fungsi, tetapi pointer dapat digunakan untuk pass-by-reference jika diperlukan. Fungsi juga dapat didefinisikan sebagai closure atau disimpan dalam variabel, memberikan fleksibilitas tambahan. Pendekatan Go terhadap fungsi menekankan eksplisit dan kejelasan, dengan penanganan error yang terintegrasi untuk mencegah bug yang tidak terdeteksi.",
      keyPoints: [
        "Multiple return values: Mengembalikan beberapa nilai sekaligus.",
        "Named return values: Meningkatkan kejelasan tetapi harus hati-hati.",
        "Variadic parameters: Menggunakan ... untuk argumen fleksibel.",
        "Error handling: Mengembalikan error sebagai nilai kembalian.",
      ],
      example: `package main\n\nimport (\n    "fmt"\n    "errors"\n)\n\nfunc bagi(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New("pembagian dengan nol")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    hasil, err := bagi(10, 2)\n    if err != nil {\n        fmt.Println("Error:", err)\n    } else {\n        fmt.Println("Hasil:", hasil)\n    }\n}`,
      tips: [
        "Gunakan multiple return untuk menangani error secara eksplisit.",
        "Pilih nama parameter yang jelas dan deskriptif.",
      ],
      resources: [
        {
          title: "Go Functions",
          url: "https://www.w3schools.com/go/go_functions.php",
        },
      ],
    },
  },
  {
    id: "struct-method-interface",
    title: "Struct, Method, dan Interface",
    description: "Membuat tipe data kustom dan perilaku",
    level: "intermediate",
    duration: "30 menit",
    icon: Database,
    locked: false,
    content: {
      explanation:
        "Struct di Go digunakan untuk membuat tipe data kustom yang mengelompokkan beberapa bidang (field) dengan tipe yang berbeda. Misalnya, struct Orang dapat memiliki field Nama (string) dan Umur (int). Struct mirip dengan class di bahasa lain, tetapi Go tidak mendukung konsep inheritance; sebagai gantinya, Go menggunakan komposisi dengan menyematkan struct lain. Method adalah fungsi yang terkait dengan tipe tertentu (seperti struct) melalui receiver, yang bisa berupa value receiver (T) atau pointer receiver (*T). Value receiver membuat salinan data, sedangkan pointer receiver memungkinkan modifikasi data asli, yang berguna untuk efisiensi atau perubahan state. Interface di Go adalah tipe yang mendefinisikan sekumpulan method tanpa implementasi, dan tipe apa pun yang mengimplementasikan semua method tersebut secara otomatis memenuhi interface tersebut (implicit implementation). Ini berbeda dari bahasa lain yang memerlukan deklarasi eksplisit seperti implements. Interface memungkinkan fleksibilitas dalam desain program, misalnya dengan memungkinkan fungsi menerima berbagai tipe selama mereka memenuhi interface yang sama. Interface kosong (interface{}) dapat digunakan untuk menerima tipe apa pun, meskipun harus digunakan dengan hati-hati. Kombinasi struct, method, dan interface memungkinkan Go untuk mendukung pemrograman berorientasi objek dengan cara yang sederhana dan eksplisit, tanpa kerumitan fitur seperti inheritance atau polymorphism berbasis class.",
      keyPoints: [
        "Struct: Tipe data kustom untuk mengelompokkan field.",
        "Method: Fungsi dengan receiver untuk menambahkan perilaku ke tipe.",
        "Interface: Kontrak perilaku dengan implementasi implisit.",
      ],
      example: `package main\n\nimport "fmt"\n\ntype Orang struct {\n    Nama string\n    Umur int\n}\n\nfunc (o Orang) Perkenalan() string {\n    return fmt.Sprintf("Halo, saya %s, umur %d tahun", o.Nama, o.Umur)\n}\n\nfunc main() {\n    andi := Orang{Nama: "Andi", Umur: 20}\n    fmt.Println(andi.Perkenalan())\n}`,
      tips: [
        "Gunakan pointer receiver untuk modifikasi struct atau efisiensi.",
        "Gunakan interface untuk meningkatkan fleksibilitas kode.",
      ],
      resources: [
        {
          title: "Go Structs",
          url: "https://go.dev/doc/effective_go#interfaces_and_types",
        },
      ],
    },
  },
  {
    id: "concurrency",
    title: "Concurrency: Goroutine dan Channel",
    description: "Menjalankan tugas secara paralel",
    level: "professional",
    duration: "35 menit",
    icon: Cpu,
    locked: false,
    content: {
      explanation:
        "Concurrency adalah salah satu fitur unggulan Go, yang memungkinkan eksekusi tugas secara paralel menggunakan goroutine dan komunikasi antar tugas dengan channel. Goroutine adalah thread ringan yang dikelola oleh runtime Go, bukan sistem operasi, sehingga sangat efisien dengan overhead memori yang kecil (biasanya hanya beberapa kilobyte). Goroutine dibuat dengan kata kunci go diikuti oleh pemanggilan fungsi, misalnya go func(). Ini memungkinkan fungsi berjalan secara asinkronus tanpa menghalangi eksekusi utama. Channel adalah mekanisme untuk komunikasi aman antar goroutine, memungkinkan pengiriman dan penerimaan data dengan sinkronisasi bawaan. Channel dibuat dengan make(chan Tipe) dan mendukung operasi pengiriman (ch <- data) dan penerimaan (<-ch). Go juga menyediakan pernyataan select untuk menangani beberapa channel secara bersamaan, mirip dengan switch untuk komunikasi. Pendekatan Go terhadap konkurensi didasarkan pada model CSP (Communicating Sequential Processes), yang menekankan komunikasi melalui pengiriman pesan daripada berbagi memori, sehingga mengurangi risiko seperti race condition. Go juga menyediakan alat seperti sync.WaitGroup untuk sinkronisasi dan go race untuk mendeteksi race condition. Concurrency di Go dirancang untuk sederhana namun kuat, memungkinkan pengembang membangun aplikasi yang skalabel seperti server web atau sistem terdistribusi dengan mudah.",
      keyPoints: [
        "Goroutine: Thread ringan untuk eksekusi paralel.",
        "Channel: Komunikasi aman antar goroutine.",
        "Select: Menangani beberapa channel secara bersamaan.",
      ],
      example: `package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc cetak(teks string) {\n    for i := 0; i < 3; i++ {\n        fmt.Println(teks, i)\n        time.Sleep(100 * time.Millisecond)\n    }\n}\n\nfunc main() {\n    go cetak("Goroutine 1")\n    go cetak("Goroutine 2")\n    time.Sleep(1 * time.Second)\n}`,
      tips: [
        "Gunakan sync.WaitGroup untuk menunggu goroutine selesai.",
        "Hindari deadlock dengan desain channel yang baik.",
      ],
      resources: [
        {
          title: "Go Concurrency",
          url: "https://go.dev/doc/effective_go#concurrency",
        },
      ],
    },
  },
  {
    id: "error-handling",
    title: "Penanganan Error",
    description: "Menangani error dengan cara idiomatic",
    level: "intermediate",
    duration: "20 menit",
    icon: AlertCircle,
    locked: false,
    content: {
      explanation:
        "Go memiliki pendekatan yang berbeda dalam menangani error dibandingkan bahasa lain yang menggunakan exception seperti try-catch. Di Go, error dianggap sebagai nilai biasa yang dikembalikan oleh fungsi, biasanya sebagai nilai kembalian kedua. Tipe error adalah interface bawaan dengan method Error() string, yang memungkinkan pembuatan error kustom dengan mudah. Fungsi seperti errors.New() digunakan untuk membuat error sederhana, sedangkan fmt.Errorf() memungkinkan pembuatan error dengan format teks. Pengembang harus memeriksa error secara eksplisit menggunakan if err != nil, yang memaksa penanganan error secara sadar untuk mencegah bug yang tidak terdeteksi. Go juga mendukung defer, yang digunakan untuk menjalankan kode pembersihan (seperti menutup file) setelah fungsi selesai, bahkan jika terjadi error. Pendekatan ini membuat kode lebih eksplisit dan mudah diprediksi, menghindari kerumitan exception handling. Selain itu, Go mendukung panic dan recover untuk menangani kasus luar biasa, tetapi ini jarang digunakan dan dianggap tidak idiomatic kecuali untuk error yang benar-benar tidak dapat dipulihkan. Penanganan error yang baik di Go membutuhkan disiplin untuk selalu memeriksa nilai error dan menangani kasus kegagalan dengan tepat, yang pada akhirnya menghasilkan kode yang lebih robust dan mudah dipelihara.",
      keyPoints: [
        "Error sebagai return value untuk penanganan eksplisit.",
        "defer untuk menjalankan pembersihan setelah fungsi selesai.",
        "errors.New dan fmt.Errorf untuk membuat error.",
      ],
      example: `package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc main() {\n    file, err := os.Open("data.txt")\n    if err != nil {\n        fmt.Println("Error:", err)\n        return\n    }\n    defer file.Close()\n    fmt.Println("File berhasil dibuka")\n}`,
      tips: [
        "Selalu periksa nilai error untuk menghindari bug.",
        "Gunakan defer untuk memastikan pembersihan sumber daya.",
      ],
      resources: [
        {
          title: "Go Error Handling",
          url: "https://go.dev/blog/error-handling-and-go",
        },
      ],
    },
  },
  {
    id: "rest-api",
    title: "Membangun REST API dengan Go",
    description: "Membuat API sederhana dengan net/http",
    level: "professional",
    duration: "40 menit",
    icon: Globe,
    locked: false,
    content: {
      explanation:
        "Go memiliki package bawaan net/http yang sangat kuat untuk membangun server HTTP dan REST API tanpa memerlukan dependensi eksternal. Package ini menyediakan fungsi untuk membuat server, menangani permintaan HTTP, dan mengirimkan respons. Fungsi http.HandleFunc memungkinkan pengembang mendaftarkan handler untuk rute tertentu, misalnya /api, yang akan menangani permintaan ke endpoint tersebut. Permintaan HTTP (seperti GET, POST, PUT) dapat diakses melalui objek http.Request, dan respons dikirim melalui http.ResponseWriter. Go juga menyediakan dukungan bawaan untuk encoding JSON melalui package encoding/json, yang memungkinkan pengembang mengirimkan data dalam format JSON dengan mudah menggunakan json.NewEncoder atau json.Marshal. Untuk membangun API yang lebih kompleks, pengembang sering menggunakan router pihak ketiga seperti Gin atau Gorilla Mux, tetapi net/http sudah cukup untuk API sederhana. Salah satu keunggulan Go dalam pengembangan API adalah performanya yang tinggi dan kemampuan konkurensi melalui goroutine, yang memungkinkan server menangani ribuan permintaan secara bersamaan dengan efisien. Selain itu, Go mendukung middleware untuk tugas seperti autentikasi atau logging dengan cara menggabungkan handler. Pengembangan REST API di Go menekankan kesederhanaan, kejelasan, dan performa, menjadikannya pilihan populer untuk microservices dan aplikasi web modern.",
      keyPoints: [
        "net/http: Package bawaan untuk server dan handler HTTP.",
        "encoding/json: Mengelola data JSON untuk respons API.",
        "Router pihak ketiga seperti Gin untuk API kompleks.",
      ],
      example: `package main\n\nimport (\n    "encoding/json"\n    "log"\n    "net/http"\n)\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n    w.Header().Set("Content-Type", "application/json")\n    response := map[string]string{"pesan": "Selamat datang di API Go!"}\n    json.NewEncoder(w).Encode(response)\n}\n\nfunc main() {\n    http.HandleFunc("/api", handler)\n    log.Println("Server berjalan di :8080")\n    http.ListenAndServe(":8080", nil)\n}`,
      tips: [
        "Gunakan http.Status untuk mengatur kode respons HTTP.",
        "Selalu validasi input permintaan untuk keamanan.",
      ],
      resources: [
        { title: "Go Web Apps", url: "https://go.dev/doc/articles/wiki/" },
      ],
    },
  },
  {
    id: "modules",
    title: "Modul dan Manajemen Dependensi",
    description: "Mengelola dependensi dengan go.mod",
    level: "intermediate",
    duration: "20 menit",
    icon: Database,
    locked: false,
    content: {
      explanation:
        "Go memperkenalkan sistem modul sejak versi 1.11 untuk mengelola dependensi dengan lebih baik melalui file go.mod. Modul adalah kumpulan package Go yang dikelompokkan bersama dengan versi tertentu, dan file go.mod mendefinisikan nama modul, versi Go yang digunakan, serta daftar dependensi. Perintah go mod init digunakan untuk menginisialisasi modul baru, menghasilkan file go.mod dengan nama seperti github.com/namauser/proyek. Untuk menambahkan dependensi, perintah go get mengunduh pustaka eksternal dan memperbarui go.mod dengan versi spesifik. File go.mod memastikan bahwa dependensi memiliki versi yang terkunci, sehingga proyek tetap konsisten di berbagai lingkungan. Go juga menyediakan perintah seperti go tidy untuk menghapus dependensi yang tidak digunakan dan go mod vendor untuk membuat folder vendor (meskipun ini jarang digunakan sejak modul diperkenalkan). Sistem modul Go dirancang untuk mengatasi masalah seperti dependensi yang tidak konsisten dan memudahkan kolaborasi tim dengan memastikan semua pengembang menggunakan versi dependensi yang sama. Selain itu, Go mendukung proxy modul dan checksum database untuk memverifikasi integritas dependensi, meningkatkan keamanan dan keandalan proyek.",
      keyPoints: [
        "go mod init: Menginisialisasi modul baru dengan go.mod.",
        "go get: Menambahkan dependensi ke proyek.",
        "go.mod: Mencatat nama modul dan versi dependensi.",
      ],
      example: `// Inisialisasi modul\ngo mod init github.com/namauser/proyek\n\n// Tambahkan dependensi\ngo get github.com/gin-gonic/gin\n\n// Contoh go.mod\nmodule github.com/namauser/proyek\n\ngo 1.20\n\nrequire github.com/gin-gonic/gin v1.9.0`,
      tips: [
        "Gunakan go tidy untuk membersihkan dependensi yang tidak digunakan.",
        "Pastikan versi Go di go.mod sesuai dengan versi yang digunakan.",
      ],
      resources: [
        { title: "Go Modules", url: "https://go.dev/blog/using-go-modules" },
      ],
    },
  },
  {
    id: "pointers",
    title: "Pointer",
    description: "Manipulasi memori dengan pointer",
    level: "intermediate",
    duration: "25 menit",
    icon: Target,
    locked: false,
    content: {
      explanation:
        "Pointer di Go memungkinkan manipulasi memori langsung dengan cara yang aman dan terkontrol. Pointer adalah variabel yang menyimpan alamat memori dari variabel lain, ditandai dengan tanda * untuk tipe (misalnya, *int untuk pointer ke int) dan & untuk mendapatkan alamat variabel. Misalnya, &x menghasilkan alamat memori x, dan *p mengakses nilai di alamat yang disimpan oleh pointer p. Pointer sangat berguna untuk pass-by-reference, di mana perubahan pada parameter dalam fungsi memengaruhi variabel asli, berbeda dengan pass-by-value default di Go. Pointer sering digunakan dengan struct untuk efisiensi, karena meng-copy struct besar bisa mahal secara memori. Selain itu, pointer memungkinkan modifikasi data asli dalam fungsi, seperti mengubah field struct atau menukar nilai dua variabel. Go membatasi operasi pointer untuk mencegah kesalahan seperti pointer arithmetic (seperti di C), sehingga lebih aman. Nilai pointer yang tidak diinisialisasi adalah nil, dan pengembang harus berhati-hati untuk memeriksa nil pointer guna menghindari panic saat dereferencing. Pointer adalah konsep penting dalam Go untuk mengelola memori dengan efisien, terutama dalam aplikasi yang membutuhkan performa tinggi atau manipulasi data kompleks.",
      keyPoints: [
        "&: Mendapatkan alamat memori variabel.",
        "*: Mengakses nilai di alamat pointer.",
        "Pointer untuk modifikasi struct atau efisiensi memori.",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc ubahNilai(p *int) {\n    *p = 100\n}\n\nfunc main() {\n    x := 10\n    fmt.Println("Sebelum:", x)\n    ubahNilai(&x)\n    fmt.Println("Sesudah:", x)\n}`,
      tips: [
        "Gunakan pointer untuk data besar untuk menghemat memori.",
        "Periksa nil pointer untuk mencegah panic.",
      ],
      resources: [
        { title: "Go Pointers", url: "https://go.dev/tour/moretypes/1" },
      ],
    },
  },
  {
    id: "best-practices",
    title: "Best Practices dan Idiomatic Go",
    description: "Menulis kode Go yang bersih dan efisien",
    level: "professional",
    duration: "30 menit",
    icon: Sparkles,
    locked: false,
    content: {
      explanation:
        "Menulis kode Go yang idiomatic berarti mengikuti konvensi dan praktik terbaik komunitas Go untuk menghasilkan kode yang bersih, mudah dipelihara, dan efisien. Salah satu prinsip utama adalah kesederhanaan: Go mendorong kode yang jelas dan eksplisit tanpa fitur berlebihan. Alat seperti gofmt digunakan untuk memformat kode secara otomatis, memastikan konsistensi gaya di seluruh proyek. Pendekatan return early membantu menghindari nesting berlebihan, membuat kode lebih mudah dibaca; misalnya, periksa kondisi error di awal dan kembalikan segera. Penggunaan defer untuk pembersihan sumber daya, seperti menutup file atau koneksi database, adalah praktik standar untuk memastikan kode tetap rapi dan aman. Nama variabel dan fungsi harus pendek namun deskriptif, seperti i untuk indeks loop atau err untuk error, sesuai dengan konteks. Go juga mendorong penanganan error secara eksplisit dan penggunaan interface untuk meningkatkan testability dan fleksibilitas. Dokumentasi kode menggunakan komentar di atas fungsi atau tipe dianggap penting, terutama untuk package yang akan digunakan ulang. Selain itu, Go memiliki alat seperti go vet dan golangci-lint untuk mendeteksi potensi masalah dalam kode. Dengan mengikuti praktik idiomatic, pengembang dapat menghasilkan kode yang tidak hanya berfungsi dengan baik tetapi juga mudah dipahami dan diperluas oleh tim lain.",
      keyPoints: [
        "gofmt: Memformat kode untuk konsistensi gaya.",
        "Return early: Mengurangi nesting untuk kejelasan.",
        "defer: Mengelola pembersihan sumber daya.",
        "Nama variabel pendek tapi jelas sesuai konteks.",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc processData(data string) (string, error) {\n    if data == "" {\n        return "", fmt.Errorf("data tidak boleh kosong")\n    }\n    return "Processed: " + data, nil\n}\n\nfunc main() {\n    result, err := processData("Halo")\n    if err != nil {\n        fmt.Println("Error:", err)\n        return\n    }\n    fmt.Println(result)\n}`,
      tips: [
        "Baca Effective Go untuk panduan resmi praktik terbaik.",
        "Gunakan interface untuk mempermudah pengujian kode.",
      ],
      resources: [
        { title: "Effective Go", url: "https://go.dev/doc/effective_go" },
        {
          title: "Go Code Review Comments",
          url: "https://github.com/golang/go/wiki/CodeReviewComments",
        },
      ],
    },
  },
];

const PenjelasanLengkap = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0]);

  const renderLevelBadge = (level: string) => {
    const config = {
      beginner: { text: "Pemula", bg: "bg-teal-100 text-teal-800" },
      intermediate: { text: "Menengah", bg: "bg-orange-100 text-orange-800" },
      advanced: { text: "Mahir", bg: "bg-purple-100 text-purple-800" },
      professional: { text: "Profesional", bg: "bg-blue-100 text-blue-800" },
    }[level as keyof typeof config] || {
      text: "Level",
      bg: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full font-medium ${config.bg}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2c3e50] text-gray-100">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#26a69a] via-[#f39c12] to-[#26a69a] bg-clip-text text-transparent mb-3">
            Penjelasan Lengkap Pemrograman Go
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Materi teori mendalam dengan penjelasan komprehensif, contoh kode,
            tips, dan sumber belajar berdasarkan{" "}
            <a
              href="https://dasarpemrogramangolang.novalagung.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#26a69a] hover:text-[#f39c12]"
            >
              dasarpemrogramangolang.novalagung.com
            </a>
            , dokumentasi resmi Go, dan prinsip idiomatic Go.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-3 max-h-[70vh] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-[#26a69a]/60 scrollbar-track-transparent">
            {topics.map((topic) => (
              <Card
                key={topic.id}
                onClick={() => !topic.locked && setSelectedTopic(topic)}
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  selectedTopic.id === topic.id
                    ? "border-[#26a69a] bg-[#26a69a]/10 shadow-[0_0_12px_#26a69a50]"
                    : "hover:border-[#26a69a]/50 hover:bg-[#26a69a]/5"
                } ${topic.locked ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      topic.locked ? "bg-gray-700" : "bg-[#26a69a]/20"
                    }`}
                  >
                    {topic.locked ? (
                      <Lock className="h-5 w-5 text-gray-400" />
                    ) : (
                      <topic.icon className="h-5 w-5 text-[#26a69a]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="font-semibold text-sm truncate text-white">
                        {topic.title}
                      </h3>
                      {renderLevelBadge(topic.level)}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" /> {topic.duration}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </aside>

          {/* Konten Utama */}
          <section className="lg:col-span-3 space-y-6">
            {/* Header Topik */}
            <Card className="p-5 sm:p-6 bg-[#34495e] border border-[#26a69a]/20 shadow-lg rounded-xl sm:rounded-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="p-3 bg-[#26a69a]/20 rounded-xl">
                  <selectedTopic.icon className="h-7 w-7 sm:h-8 sm:w-8 text-[#26a69a]" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {selectedTopic.title}
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {selectedTopic.description}
                  </p>
                  <div className="flex justify-center sm:justify-start items-center gap-2 mt-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" /> {selectedTopic.duration}
                  </div>
                </div>
              </div>
            </Card>

            {/* Penjelasan */}
            <Card className="p-5 sm:p-6 bg-[#34495e] border border-[#26a69a]/20 shadow-md rounded-xl sm:rounded-2xl">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2 text-[#f39c12]">
                <BookOpen className="h-5 w-5" /> Penjelasan Konsep
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
                {selectedTopic.content.explanation}
              </p>
              <ul className="space-y-2">
                {selectedTopic.content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#26a69a] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Contoh Kode */}
            <Card className="p-4 sm:p-6 bg-[#2c3e50] border border-[#26a69a]/30 rounded-xl sm:rounded-2xl overflow-x-auto">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2 text-[#f39c12]">
                <Code className="h-5 w-5" /> Contoh Kode
              </h3>
              <div className="text-sm">
                <SyntaxHighlighter
                  language="go"
                  style={{
                    ...oneDark,
                    'pre[class*="language-"]': {
                      background: "#263238",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      margin: 0,
                      overflowX: "auto",
                    },
                    "span.token.keyword": { color: "#26a69a" },
                    "span.token.function": { color: "#f39c12" },
                    "span.token.string": { color: "#f5b041" },
                  }}
                  showLineNumbers
                  customStyle={{ margin: 0 }}
                >
                  {selectedTopic.content.example}
                </SyntaxHighlighter>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-5 sm:p-6 bg-[#34495e] border border-[#26a69a]/20 rounded-xl sm:rounded-2xl">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2 text-[#f39c12]">
                <Lightbulb className="h-5 w-5" /> Tips Belajar
              </h3>
              <ul className="space-y-2">
                {selectedTopic.content.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#26a69a] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Sumber Belajar */}
            <Card className="p-5 sm:p-6 bg-[#34495e] border border-[#26a69a]/20 rounded-xl sm:rounded-2xl">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2 text-[#f39c12]">
                <BookOpen className="h-5 w-5" /> Sumber Belajar Tambahan
              </h3>
              <ul className="space-y-2">
                {selectedTopic.content.resources.map((res, index) => (
                  <li key={index}>
                    <a
                      href={res.url.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#26a69a] hover:text-[#f39c12] transition-colors text-sm sm:text-base"
                    >
                      <ExternalLink className="h-4 w-4" /> {res.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Navigasi Responsif */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#26a69a]/30 mt-8">
              {/* Sebelumnya */}
              {topics.indexOf(selectedTopic) > 0 ? (
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#26a69a]/40 text-[#26a69a] hover:bg-[#26a69a]/20"
                  onClick={() =>
                    setSelectedTopic(topics[topics.indexOf(selectedTopic) - 1])
                  }
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Materi Sebelumnya
                </Button>
              ) : (
                <div className="w-full sm:w-[160px]" />
              )}

              {/* Kembali ke Materi */}
              <Link to="/materi" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#34495e] text-[#26a69a] hover:bg-[#26a69a]/20 shadow-md">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Halaman Materi
                </Button>
              </Link>

              {/* Berikutnya */}
              {topics.indexOf(selectedTopic) < topics.length - 1 ? (
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#26a69a]/40 text-[#26a69a] hover:bg-[#26a69a]/20"
                  onClick={() =>
                    setSelectedTopic(topics[topics.indexOf(selectedTopic) + 1])
                  }
                >
                  Materi Berikutnya <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="w-full sm:w-[160px]" />
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PenjelasanLengkap;

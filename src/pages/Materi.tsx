import { useState } from "react";
import { Link } from "react-router-dom";
import {
  // 📘 Konten & Navigasi
  BookOpen,
  FileCode,
  Code,
  Terminal,
  Video,
  ExternalLink,
  Clock,
  ArrowRight,
  Lightbulb,
  Target,
  Sparkles,

  // ⚙️ Fitur & Interaksi
  Zap,
  Brain,
  CheckCircle2,
  Lock,
  AlertCircle,

  // 🧩 Tambahan (UI & Status)
  PlayCircle,
  PauseCircle,
  ChevronRight,
  ChevronLeft,
  ListChecks,
  Layers,
  Rocket,
  Trophy,
  BarChart3,
  Cpu,
  Globe,
  Workflow,
  Settings,
  GitBranch,
  Database,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ✅ Syntax Highlighter - safe import and registration
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import goLang from "react-syntax-highlighter/dist/esm/languages/prism/go";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Pastikan bahasa terdaftar (mencegah TypeError)
if (typeof SyntaxHighlighter.registerLanguage === "function") {
  SyntaxHighlighter.registerLanguage("go", goLang);
}

type Topic = {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "professional";
  duration: string;
  icon: any;
  locked: boolean;
  content: {
    explanation: string;
    keyPoints: string[];
    example: string;
    simulation: string;
    exercise: string;
    videoId: string;
    tips: string[];
    resources: { title: string; url: string }[];
  };
};

export const topics: Topic[] = [
  // ===================================
  // 🧩 DASAR PEMROGRAMAN GOLANG
  // ===================================
  {
    id: "intro-golang",
    title: "Pengenalan Go (Golang)",
    description: "Mengenal bahasa pemrograman Go dan keunggulannya",
    level: "beginner",
    duration: "15 menit",
    icon: Lightbulb,
    locked: false,
    content: {
      explanation:
        "Go (atau Golang) adalah bahasa pemrograman open-source yang dikembangkan oleh Google pada tahun 2009. Dirancang untuk efisiensi, kejelasan, dan performa tinggi — sangat cocok untuk sistem backend, microservices, dan CLI tools.",
      keyPoints: [
        "Dikembangkan oleh Robert Griesemer, Rob Pike, dan Ken Thompson di Google",
        "Kompilasi cepat ke binary native",
        "Concurrency dengan goroutine dan channel",
        "Garbage collection otomatis",
        "Standard library yang sangat lengkap",
        "Digunakan oleh Docker, Kubernetes, Terraform, dan banyak lagi",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    fmt.Println("Selamat datang di Golang!")\n}`,
      simulation: `// Output:\nHello, World!\nSelamat datang di Golang!\n\n// Penjelasan:\n// - package main → titik masuk program\n// - import "fmt" → untuk fungsi print\n// - func main() → fungsi utama`,
      exercise: `// LATIHAN:\n// 1. Ubah teks menjadi perkenalan diri\n// 2. Tambahkan 2 baris pesan motivasi\n// 3. Jalankan dengan: go run hello.go`,
      videoId: "YS4e4q9oBaU",
      tips: [
        "File Go harus disimpan dengan ekstensi .go",
        "Go tidak memerlukan titik koma di akhir baris",
        "Nama fungsi main() wajib lowercase",
      ],
      resources: [
        { title: "Dokumentasi Resmi Go", url: "https://go.dev/doc/" },
        { title: "A Tour of Go (Interaktif)", url: "https://go.dev/tour/" },
        {
          title: "Buku: Learn Go with Tests",
          url: "https://quii.dev/learn-go-with-tests/",
        },
      ],
    },
  },
  {
    id: "variables",
    title: "Variabel dan Tipe Data",
    description:
      "Belajar cara menyimpan data dalam variabel serta mengenal tipe data dasar",
    level: "beginner",
    duration: "20 menit",
    icon: Code,
    locked: false,
    content: {
      explanation:
        "Variabel digunakan untuk menyimpan nilai agar bisa digunakan kembali di dalam program. Go memiliki tipe data seperti string, int, float, dan bool.",
      keyPoints: [
        "Gunakan keyword var untuk deklarasi variabel",
        "Gunakan := untuk deklarasi cepat",
        "Go bersifat strongly-typed (tipe harus sesuai)",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc main() {\n    var nama string = "Andi"\n    umur := 20\n    fmt.Println("Nama:", nama)\n    fmt.Println("Umur:", umur)\n}`,
      simulation: `// Output:\nNama: Andi\nUmur: 20`,
      exercise: `// LATIHAN:\n// 1. Deklarasikan variabel berat, tinggi, dan hobi.\n// 2. Cetak dalam satu baris.\n// 3. Gunakan := untuk salah satunya.`,
      videoId: "YS4e4q9oBaU",
      tips: [
        "Gunakan var untuk tipe eksplisit, := untuk otomatis",
        "Go membedakan huruf besar & kecil",
        "Nama variabel tidak boleh diawali angka",
      ],
      resources: [
        {
          title: "Go Variables - W3Schools",
          url: "https://www.w3schools.com/go/go_variables.php",
        },
      ],
    },
  },
  {
    id: "conditions",
    title: "Percabangan (if / else)",
    description: "Gunakan logika untuk membuat keputusan dalam program",
    level: "beginner",
    duration: "20 menit",
    icon: GitBranch,
    locked: false,
    content: {
      explanation:
        "Percabangan memungkinkan program memilih jalur eksekusi berdasarkan kondisi tertentu. Struktur dasar: if, else if, else.",
      keyPoints: [
        "Gunakan operator logika seperti >, <, ==, &&, ||",
        "Kondisi tidak perlu tanda kurung",
        "Blok if ditulis dengan kurung kurawal {}",
      ],
      example: `if nilai >= 75 {\n    fmt.Println("Lulus")\n} else {\n    fmt.Println("Tidak Lulus")\n}`,
      simulation: `// Output:\nLulus`,
      exercise: `// LATIHAN:\n// 1. Buat variabel skor.\n// 2. Jika skor >= 90 cetak 'Sangat Baik', 75-89 'Baik', <75 'Perlu Belajar'.`,
      videoId: "YS4e4q9oBaU",
      tips: [
        "Gunakan else if untuk beberapa kondisi",
        "Pastikan tipe boolean di kondisi",
      ],
      resources: [
        {
          title: "Go if Statements",
          url: "https://www.w3schools.com/go/go_conditions.php",
        },
      ],
    },
  },
  {
    id: "loops",
    title: "Perulangan (Looping)",
    description: "Menjalankan blok kode secara berulang dengan for",
    level: "beginner",
    duration: "15 menit",
    icon: Workflow,
    locked: false,
    content: {
      explanation:
        "Go hanya memiliki satu keyword untuk perulangan yaitu for. Namun bisa digunakan sebagai while loop juga.",
      keyPoints: [
        "Gunakan for i := 0; i < n; i++ untuk loop standar",
        "Gunakan for {...} untuk loop tanpa kondisi",
        "Gunakan range untuk iterasi array/slice/map",
      ],
      example: `for i := 1; i <= 5; i++ {\n    fmt.Println("Perulangan ke-", i)\n}`,
      simulation: `// Output:\nPerulangan ke-1\nPerulangan ke-2\nPerulangan ke-3\nPerulangan ke-4\nPerulangan ke-5`,
      exercise: `// LATIHAN:\n// 1. Cetak angka 1–10.\n// 2. Gunakan range untuk mencetak isi slice.`,
      videoId: "YS4e4q9oBaU",
      tips: [
        "Gunakan break untuk menghentikan loop",
        "Gunakan continue untuk melanjutkan ke iterasi berikutnya",
      ],
      resources: [
        { title: "Go Loops", url: "https://www.w3schools.com/go/go_loops.php" },
      ],
    },
  },
  {
    id: "arrays-slices",
    title: "Array dan Slice",
    description: "Menyimpan dan mengelola banyak data sekaligus",
    level: "intermediate",
    duration: "25 menit",
    icon: Layers,
    locked: false,
    content: {
      explanation:
        "Array menyimpan kumpulan data dengan ukuran tetap. Slice adalah versi dinamis dari array yang sering digunakan di Go.",
      keyPoints: [
        "Array memiliki ukuran tetap",
        "Slice dapat bertambah dan berkurang panjangnya",
        "Gunakan range untuk iterasi",
      ],
      example: `angka := []int{1, 2, 3, 4, 5}\nfor _, v := range angka {\n    fmt.Println(v)\n}`,
      simulation: `// Output:\n1\n2\n3\n4\n5`,
      exercise: `// LATIHAN:\n// 1. Buat slice string berisi nama teman.\n// 2. Tambahkan satu elemen baru menggunakan append().`,
      videoId: "YS4e4q9oBaU",
      tips: [
        "Gunakan len() dan cap() untuk panjang dan kapasitas",
        "append() membuat slice baru jika kapasitas penuh",
      ],
      resources: [
        {
          title: "Go Slices Explained",
          url: "https://go.dev/blog/slices-intro",
        },
      ],
    },
  },
  // ===================================
  // ⚙️ TINGKAT MENENGAH
  // ===================================
  {
    id: "functions",
    title: "Fungsi dan Parameter",
    description: "Membagi program menjadi bagian yang lebih modular",
    level: "intermediate",
    duration: "25 menit",
    icon: Settings,
    locked: false,
    content: {
      explanation:
        "Fungsi membantu memecah program besar menjadi bagian kecil yang mudah dikelola dan dapat digunakan ulang.",
      keyPoints: [
        "Gunakan func namaFungsi(param tipe) tipeReturn",
        "Dapat mengembalikan lebih dari satu nilai",
        "Mendukung variadic parameter",
      ],
      example: `func tambah(a int, b int) int {\n    return a + b\n}\n\nfunc main() {\n    fmt.Println(tambah(3, 4))\n}`,
      simulation: `// Output:\n7`,
      exercise: `// LATIHAN:\n// 1. Buat fungsi perkalian dua angka.\n// 2. Tampilkan hasilnya di main().`,
      videoId: "YS4e4q9oBaU",
      tips: [
        "Gunakan return untuk mengembalikan nilai",
        "Fungsi bisa dideklarasikan di luar main",
      ],
      resources: [
        {
          title: "Go Functions",
          url: "https://www.w3schools.com/go/go_functions.php",
        },
      ],
    },
  },
  // ===================================
  // 💼 PROFESIONAL
  // ===================================
  {
    id: "goroutines",
    title: "Concurrency & Goroutine",
    description: "Menjalankan kode secara paralel untuk efisiensi tinggi",
    level: "professional",
    duration: "30 menit",
    icon: Cpu,
    locked: false,
    content: {
      explanation:
        "Goroutine adalah fitur Go untuk menjalankan fungsi secara bersamaan (concurrent). Sangat efisien untuk pemrosesan paralel.",
      keyPoints: [
        "Gunakan keyword go sebelum pemanggilan fungsi",
        "Channel digunakan untuk komunikasi antar goroutine",
        "runtime.Gosched() dapat digunakan untuk yielding",
      ],
      example: `func cetak(text string) {\n    for i := 0; i < 5; i++ {\n        fmt.Println(text)\n    }\n}\n\nfunc main() {\n    go cetak("A")\n    go cetak("B")\n    time.Sleep(time.Second)\n}`,
      simulation: `// Output:\nA\nB\nA\nB\n(dalam urutan acak karena concurrency)`,
      exercise: `// LATIHAN:\n// 1. Buat dua goroutine yang mencetak angka ganjil dan genap.\n// 2. Gunakan time.Sleep agar program menunggu hasil.`,
      videoId: "YS4e4q9oBaU",
      tips: [
        "Gunakan channel untuk sinkronisasi",
        "Hati-hati deadlock jika tidak menerima dari channel",
      ],
      resources: [
        {
          title: "Go Concurrency Patterns",
          url: "https://go.dev/doc/effective_go#concurrency",
        },
      ],
    },
  },
  {
    id: "api-project",
    title: "Membangun REST API dengan Go",
    description: "Membuat API sederhana menggunakan net/http",
    level: "professional",
    duration: "40 menit",
    icon: Globe,
    locked: false,
    content: {
      explanation:
        "REST API adalah cara berkomunikasi antar sistem melalui HTTP. Go memiliki pustaka bawaan yang kuat untuk membuat server web.",
      keyPoints: [
        "Gunakan paket net/http",
        "Handler function menangani setiap request",
        "Gunakan http.ListenAndServe untuk menjalankan server",
      ],
      example: `func handler(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintln(w, "Halo dari API!")\n}\n\nfunc main() {\n    http.HandleFunc("/", handler)\n    http.ListenAndServe(":8080", nil)\n}`,
      simulation: `// Jalankan:\n// go run main.go\n// Lalu buka http://localhost:8080 di browser.`,
      exercise: `// LATIHAN:\n// 1. Buat endpoint /hello yang menampilkan nama kamu.\n// 2. Tambahkan endpoint /time yang menampilkan waktu saat ini.`,
      videoId: "YS4e4q9oBaU",
      tips: [
        "Gunakan json.NewEncoder() untuk mengirim JSON",
        "Gunakan mux router untuk endpoint kompleks",
      ],
      resources: [
        {
          title: "Building Web Apps with Go",
          url: "https://go.dev/doc/articles/wiki/",
        },
      ],
    },
  },
];

const MateriGolang = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0]);

  const renderLevelBadge = (level: string) => {
    const config = {
      beginner: { text: "Pemula", bg: "bg-teal-100 text-teal-800" },
      intermediate: { text: "Menengah", bg: "bg-orange-100 text-orange-800" },
      advanced: { text: "Mahir", bg: "bg-purple-100 text-purple-800" },
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

      <main className="flex-1 container mx-auto px-4 py-10 animate-fadeIn">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#26a69a] via-[#f39c12] to-[#26a69a] bg-clip-text text-transparent mb-3">
            Belajar Golang dari Nol
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Materi interaktif dengan contoh kode, latihan, video, dan sumber
            belajar terbaik untuk pemula hingga mahir.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-3 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#26a69a]/60 scrollbar-track-transparent">
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
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm truncate text-white">
                        {topic.title}
                      </h3>
                      {renderLevelBadge(topic.level)}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {topic.duration}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </aside>

          {/* Konten Utama */}
          <section className="lg:col-span-3 space-y-6">
            {/* Header Topik */}
            <Card className="p-6 bg-[#34495e] border border-[#26a69a]/20 shadow-lg rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#26a69a]/20 rounded-xl">
                  <selectedTopic.icon className="h-8 w-8 text-[#26a69a]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {selectedTopic.title}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {selectedTopic.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" /> {selectedTopic.duration}
                  </div>
                </div>
              </div>
            </Card>

            {/* Penjelasan */}
            <Card className="p-6 bg-[#34495e] border border-[#26a69a]/20 shadow-md rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#f39c12]">
                <BookOpen className="h-5 w-5" /> Penjelasan Konsep
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {selectedTopic.content.explanation}
              </p>
              <ul className="space-y-2">
                {selectedTopic.content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#26a69a] mt-0.5" />
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Video */}
            <Card className="p-6 bg-[#34495e] border border-[#26a69a]/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#f39c12]">
                <Video className="h-5 w-5" /> Video Tutorial
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg border border-[#26a69a]/30">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedTopic.content.videoId}`}
                  title={selectedTopic.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>

            {/* Contoh Kode */}
            <Card className="p-6 bg-[#2c3e50] border border-[#26a69a]/30 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#f39c12]">
                <Code className="h-5 w-5" /> Contoh Kode
              </h3>
              <SyntaxHighlighter
                language="go"
                style={{
                  ...oneDark,
                  'pre[class*="language-"]': {
                    background: "#263238",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    fontSize: "0.9rem",
                  },
                  "span.token.keyword": { color: "#26a69a" },
                  "span.token.function": { color: "#f39c12" },
                  "span.token.string": { color: "#f5b041" },
                }}
                showLineNumbers
                wrapLines
              >
                {selectedTopic.content.example}
              </SyntaxHighlighter>
            </Card>

            {/* Simulasi */}
            <Card className="p-6 bg-[#2c3e50] border border-[#26a69a]/30 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#f39c12]">
                <Terminal className="h-5 w-5" /> Simulasi Output
              </h3>
              <SyntaxHighlighter
                language="go"
                style={{
                  ...oneDark,
                  'pre[class*="language-"]': {
                    background: "#1e272e",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    fontSize: "0.9rem",
                  },
                }}
                wrapLines
              >
                {selectedTopic.content.simulation}
              </SyntaxHighlighter>
            </Card>

            {/* Latihan */}
            <Card className="p-6 bg-[#2c3e50] border border-[#26a69a]/30 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#f39c12]">
                <ListChecks className="h-5 w-5" /> Latihan Mandiri
              </h3>
              <SyntaxHighlighter
                language="go"
                style={{
                  ...oneDark,
                  'pre[class*="language-"]': {
                    background: "#1e272e",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    fontSize: "0.9rem",
                  },
                }}
                wrapLines
              >
                {selectedTopic.content.exercise}
              </SyntaxHighlighter>
            </Card>

            {/* Tips */}
            <Card className="p-6 bg-[#34495e] border border-[#26a69a]/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#f39c12]">
                <Lightbulb className="h-5 w-5" /> Tips Belajar
              </h3>
              <ul className="space-y-2">
                {selectedTopic.content.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-[#26a69a] mt-0.5" />
                    <span className="text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Sumber Belajar */}
            <Card className="p-6 bg-[#34495e] border border-[#26a69a]/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#f39c12]">
                <BookOpen className="h-5 w-5" /> Sumber Belajar Tambahan
              </h3>
              <ul className="space-y-2">
                {selectedTopic.content.resources.map((res, index) => (
                  <li key={index}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#26a69a] hover:text-[#f39c12] transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" /> {res.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Navigasi */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-8 border-t border-[#26a69a]/30 mt-10 pt-6">
              {/* Tombol Materi Sebelumnya */}
              {topics.indexOf(selectedTopic) > 0 ? (
                <Button
                  variant="outline"
                  className="border-[#26a69a]/40 text-[#26a69a] hover:bg-[#26a69a]/20"
                  onClick={() =>
                    setSelectedTopic(topics[topics.indexOf(selectedTopic) - 1])
                  }
                >
                  ← Materi Sebelumnya
                </Button>
              ) : (
                <div className="w-[160px]" /> // placeholder biar layout tetap seimbang
              )}

              {/* Tombol Penjelasan Lengkap */}
              <Link to="/Materi-lengkap" className="flex justify-center">
                <Button className="bg-[#34495e] text-[#26a69a] hover:bg-[#26a69a]/20 shadow-md">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Penjelasan Lengkap
                </Button>
              </Link>

              {/* Tombol Uji Pemahaman */}
              <Link to={`/kuis?topic=${selectedTopic.id}`}>
                <Button className="bg-[#26a69a] text-white hover:opacity-90 shadow-md">
                  Uji Pemahaman
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MateriGolang;

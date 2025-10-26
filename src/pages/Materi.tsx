import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Video, Code, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Topic = {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: {
    explanation: string;
    points: string[];
    example: string;
    videoUrl: string;
  };
};

const topics: Topic[] = [
  {
    id: "variabel",
    title: "Variabel",
    description: "Memahami konsep variabel sebagai tempat penyimpanan data",
    icon: BookOpen,
    content: {
      explanation:
        "Variabel adalah tempat untuk menyimpan data dalam program. Bayangkan variabel seperti kotak yang bisa kamu isi dengan berbagai jenis informasi seperti angka, teks, atau nilai lainnya.",
      points: [
        "Variabel memiliki nama untuk identifikasi",
        "Setiap variabel memiliki tipe data (angka, teks, boolean)",
        "Nilai variabel dapat berubah selama program berjalan",
        "Gunakan nama variabel yang deskriptif dan mudah dipahami",
      ],
      example: `// Contoh deklarasi variabel
let nama = "Budi";
let umur = 17;
let nilaiMatematika = 85.5;
let sudahLulus = false;

// Mengubah nilai variabel
umur = 18;
sudahLulus = true;

console.log(nama + " berumur " + umur + " tahun");`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    id: "perulangan",
    title: "Perulangan (Loop)",
    description: "Mengulangi proses dengan efisien menggunakan loop",
    icon: Video,
    content: {
      explanation:
        "Perulangan atau loop adalah struktur yang memungkinkan kita menjalankan kode yang sama berulang kali. Ini sangat berguna untuk mengotomasi tugas yang repetitif.",
      points: [
        "For loop: digunakan ketika jumlah perulangan sudah diketahui",
        "While loop: digunakan ketika kondisi perulangan belum pasti",
        "Setiap loop memiliki kondisi untuk berhenti",
        "Hindari infinite loop (perulangan tanpa henti)",
      ],
      example: `// For loop - menampilkan angka 1-5
for (let i = 1; i <= 5; i++) {
  console.log("Angka: " + i);
}

// While loop - menghitung mundur
let countdown = 5;
while (countdown > 0) {
  console.log(countdown);
  countdown--;
}
console.log("Start!");

// Loop untuk array
let buah = ["Apel", "Jeruk", "Mangga"];
for (let i = 0; i < buah.length; i++) {
  console.log(buah[i]);
}`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    id: "kondisi",
    title: "Kondisi (If-Else)",
    description: "Membuat keputusan dalam program berdasarkan kondisi",
    icon: Code,
    content: {
      explanation:
        "Struktur kondisi memungkinkan program membuat keputusan berdasarkan kondisi tertentu. Program dapat mengeksekusi kode yang berbeda tergantung apakah kondisi terpenuhi atau tidak.",
      points: [
        "If: menjalankan kode jika kondisi benar",
        "Else: menjalankan kode alternatif jika kondisi salah",
        "Else if: memeriksa kondisi tambahan",
        "Operator perbandingan: ==, !=, <, >, <=, >=",
      ],
      example: `// Menentukan grade berdasarkan nilai
let nilai = 85;

if (nilai >= 90) {
  console.log("Grade: A - Excellent!");
} else if (nilai >= 80) {
  console.log("Grade: B - Good!");
} else if (nilai >= 70) {
  console.log("Grade: C - Cukup");
} else {
  console.log("Grade: D - Perlu Belajar Lebih Giat");
}

// Mengecek bilangan genap atau ganjil
let angka = 7;
if (angka % 2 === 0) {
  console.log(angka + " adalah bilangan genap");
} else {
  console.log(angka + " adalah bilangan ganjil");
}`,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
];

const Materi = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Materi Pembelajaran</h1>
          <p className="text-muted-foreground text-lg">
            Pilih topik di bawah untuk mulai belajar
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Topic List */}
          <div className="lg:col-span-1 space-y-3">
            {topics.map((topic) => (
              <Card
                key={topic.id}
                className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-soft ${
                  selectedTopic.id === topic.id
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <topic.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <Card className="p-6 bg-gradient-card animate-scale-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-primary rounded-xl">
                  <selectedTopic.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedTopic.title}</h2>
                  <p className="text-muted-foreground">{selectedTopic.description}</p>
                </div>
              </div>
            </Card>

            {/* Explanation */}
            <Card className="p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Penjelasan
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {selectedTopic.content.explanation}
              </p>
              <div className="space-y-2">
                {selectedTopic.content.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Video */}
            <Card className="p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Video Pembelajaran
              </h3>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src={selectedTopic.content.videoUrl}
                  title={`Video ${selectedTopic.title}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>

            {/* Code Example */}
            <Card className="p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Contoh Kode
              </h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{selectedTopic.content.example}</code>
              </pre>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6">
              <div>
                {topics.indexOf(selectedTopic) > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTopic(topics[topics.indexOf(selectedTopic) - 1])}
                  >
                    Materi Sebelumnya
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Link to={`/kuis?topic=${selectedTopic.id}`}>
                  <Button variant="default">
                    Lanjut ke Kuis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Materi;

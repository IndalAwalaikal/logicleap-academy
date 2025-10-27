import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Code, Play, RotateCcw, Lightbulb, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import goLang from "react-syntax-highlighter/dist/esm/languages/prism/go";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Daftarkan bahasa Go untuk syntax highlighter
if (typeof SyntaxHighlighter.registerLanguage === "function") {
  SyntaxHighlighter.registerLanguage("go", goLang);
}

type Challenge = {
  id: number;
  title: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
};

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Cetak Nama 3 Kali",
    description:
      "Buatlah program Go yang mencetak nama kamu sebanyak 3 kali menggunakan perulangan for.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    nama := "Budi"\n    // Gunakan for loop untuk mencetak nama 3 kali\n}`,
    expectedOutput: `Budi\nBudi\nBudi`,
    hints: [
      "Gunakan for loop dengan i dari 0 sampai 2",
      "Gunakan fmt.Println(nama) untuk mencetak",
      "Struktur: for i := 0; i < 3; i++",
    ],
  },
  {
    id: 2,
    title: "Angka 1 sampai 10",
    description:
      "Buatlah program Go yang menampilkan angka dari 1 sampai 10 menggunakan perulangan.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    // Gunakan for loop untuk mencetak angka 1-10\n}`,
    expectedOutput: `1\n2\n3\n4\n5\n6\n7\n8\n9\n10`,
    hints: [
      "Gunakan for loop dengan i dari 1 sampai 10",
      "Gunakan fmt.Println(i) untuk mencetak angka",
      "Gunakan i++ untuk increment",
    ],
  },
  {
    id: 3,
    title: "Cek Bilangan Genap/Ganjil",
    description:
      "Buatlah program Go yang mengecek apakah sebuah angka adalah genap atau ganjil menggunakan operator modulo.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    angka := 7\n    // Gunakan if-else dan operator modulo (%)\n}`,
    expectedOutput: `7 adalah bilangan ganjil`,
    hints: [
      "Gunakan operator % untuk cek sisa bagi",
      "Jika angka % 2 == 0, maka genap",
      "Gunakan fmt.Println untuk mencetak hasil",
    ],
  },
  {
    id: 4,
    title: "Grade Nilai",
    description:
      "Buatlah program Go yang menentukan grade berdasarkan nilai (A: 90+, B: 80-89, C: 70-79, D: <70).",
    starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    nilai := 85\n    // Gunakan if-else if untuk menentukan grade\n}`,
    expectedOutput: `Grade: B`,
    hints: [
      "Gunakan if-else if untuk multiple kondisi",
      "Cek dari nilai tertinggi (>=90) terlebih dahulu",
      "Gunakan fmt.Printf untuk format output",
    ],
  },
  {
    id: 5,
    title: "Menghitung Luas Persegi",
    description:
      "Buatlah fungsi di Go untuk menghitung luas persegi berdasarkan panjang sisi.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc hitungLuas(sisi float64) float64 {\n    // Tulis kode untuk menghitung luas\n    return 0\n}\n\nfunc main() {\n    sisi := 4.0\n    fmt.Println("Luas persegi:", hitungLuas(sisi))\n}`,
    expectedOutput: `Luas persegi: 16`,
    hints: [
      "Luas persegi = sisi * sisi",
      "Kembalikan hasil perhitungan dengan return",
      "Pastikan tipe data float64 untuk sisi",
    ],
  },
  {
    id: 6,
    title: "Menjumlahkan Slice",
    description:
      "Buatlah program Go untuk menjumlahkan semua elemen dalam slice bertipe int.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc main() {\n    numbers := []int{1, 2, 3, 4, 5}\n    // Gunakan for loop dengan range untuk menjumlahkan\n}`,
    expectedOutput: `Jumlah: 15`,
    hints: [
      "Gunakan for _, num := range numbers untuk iterasi",
      "Inisialisasi variabel jumlah untuk menyimpan hasil",
      "Tambahkan setiap num ke jumlah",
    ],
  },
  {
    id: 7,
    title: "Membalik String",
    description:
      "Buatlah program Go untuk membalikkan urutan karakter dalam string.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc balikString(str string) string {\n    // Tulis kode untuk membalik string\n    return ""\n}\n\nfunc main() {\n    teks := "Hello"\n    fmt.Println(balikString(teks))\n}`,
    expectedOutput: `olleH`,
    hints: [
      "Konversi string ke slice rune untuk menangani karakter",
      "Gunakan loop untuk membalik urutan",
      "Kembalikan string hasil konversi dari rune",
    ],
  },
  {
    id: 8,
    title: "Fungsi dengan Error Handling",
    description:
      "Buatlah fungsi Go untuk membagi dua angka dan menangani error pembagian dengan nol.",
    starterCode: `package main\n\nimport (\n    "fmt"\n    "errors"\n)\n\nfunc bagi(a, b float64) (float64, error) {\n    // Tulis kode untuk pembagian\n    return 0, nil\n}\n\nfunc main() {\n    hasil, err := bagi(10, 2)\n    if err != nil {\n        fmt.Println("Error:", err)\n        return\n    }\n    fmt.Println("Hasil:", hasil)\n}`,
    expectedOutput: `Hasil: 5`,
    hints: [
      "Cek jika b == 0, kembalikan error dengan errors.New",
      "Gunakan return a / b, nil jika tidak ada error",
      "Gunakan if err != nil di main untuk cek error",
    ],
  },
  {
    id: 9,
    title: "Struct Mahasiswa",
    description:
      "Buatlah struct Mahasiswa dan method untuk mencetak informasi mahasiswa.",
    starterCode: `package main\n\nimport "fmt"\n\ntype Mahasiswa struct {\n    Nama string\n    Umur int\n}\n\n// Tambahkan method Perkenalan\n\nfunc main() {\n    mhs := Mahasiswa{Nama: "Andi", Umur: 20}\n    // Panggil method Perkenalan\n}`,
    expectedOutput: `Nama: Andi, Umur: 20`,
    hints: [
      "Definisikan method dengan receiver (m Mahasiswa)",
      "Gunakan fmt.Sprintf untuk format string",
      "Panggil method dengan mhs.Perkenalan()",
    ],
  },
  {
    id: 10,
    title: "Menukar Nilai dengan Pointer",
    description:
      "Buatlah fungsi Go untuk menukar dua nilai integer menggunakan pointer.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc tukar(a, b *int) {\n    // Tulis kode untuk menukar nilai\n}\n\nfunc main() {\n    x, y := 10, 20\n    fmt.Println("Sebelum:", x, y)\n    tukar(&x, &y)\n    fmt.Println("Sesudah:", x, y)\n}`,
    expectedOutput: `Sebelum: 10 20\nSesudah: 20 10`,
    hints: [
      "Gunakan *a dan *b untuk mengakses nilai pointer",
      "Gunakan variabel sementara untuk menukar",
      "Kirim alamat dengan &x dan &y",
    ],
  },
  {
    id: 11,
    title: "Menghitung Faktorial",
    description:
      "Buatlah fungsi Go untuk menghitung faktorial dari sebuah angka.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc faktorial(n int) int {\n    // Tulis kode untuk menghitung faktorial\n    return 1\n}\n\nfunc main() {\n    n := 5\n    fmt.Println("Faktorial dari", n, "adalah", faktorial(n))\n}`,
    expectedOutput: `Faktorial dari 5 adalah 120`,
    hints: [
      "Gunakan loop atau rekursi untuk menghitung",
      "Faktorial n = n * (n-1) * ... * 1",
      "Tangani kasus n == 0 (return 1)",
    ],
  },
  {
    id: 12,
    title: "Goroutine Sederhana",
    description:
      "Buatlah program Go dengan dua goroutine yang mencetak pesan berbeda secara bergantian.",
    starterCode: `package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc cetakPesan(pesan string) {\n    // Tulis kode untuk mencetak pesan\n}\n\nfunc main() {\n    // Jalankan dua goroutine\n    time.Sleep(1 * time.Second)\n}`,
    expectedOutput: `Pesan 1\nPesan 2\nPesan 1\nPesan 2`,
    hints: [
      "Gunakan go cetakPesan() untuk menjalankan goroutine",
      "Gunakan time.Sleep di dalam cetakPesan untuk simulasi",
      "Gunakan loop untuk mencetak beberapa kali",
    ],
  },
  {
    id: 13,
    title: "Filter Slice",
    description:
      "Buatlah fungsi Go untuk memfilter slice integer, hanya menyimpan angka genap.",
    starterCode: `package main\n\nimport "fmt"\n\nfunc filterGenap(numbers []int) []int {\n    // Tulis kode untuk memfilter angka genap\n    return nil\n}\n\nfunc main() {\n    nums := []int{1, 2, 3, 4, 5, 6}\n    fmt.Println("Angka genap:", filterGenap(nums))\n}`,
    expectedOutput: `Angka genap: [2 4 6]`,
    hints: [
      "Gunakan for loop dengan range untuk iterasi",
      "Cek apakah num % 2 == 0",
      "Gunakan append untuk menambahkan ke slice baru",
    ],
  },
];

const Latihan = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(
    challenges[0]
  );
  const [code, setCode] = useState(selectedChallenge.starterCode);
  const [output, setOutput] = useState("");
  const [showHints, setShowHints] = useState(false);

  const handleChallengeChange = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCode(challenge.starterCode);
    setOutput("");
    setShowHints(false);
  };

  const handleRunCode = () => {
    // Simulasi output (implementasi nyata memerlukan eksekusi kode Go)
    setOutput(
      "Sedang menjalankan kode...\n\n" + selectedChallenge.expectedOutput
    );
  };

  const handleReset = () => {
    setCode(selectedChallenge.starterCode);
    setOutput("");
    setShowHints(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2c3e50] text-gray-100">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-[#26a69a]">
            Latihan Praktis Go
          </h1>
          <p className="text-gray-300 text-lg">
            Praktikkan konsep pemrograman Go dengan tantangan coding interaktif.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Challenge List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-semibold text-lg mb-3 text-white">
              Daftar Tantangan
            </h3>
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className={`p-4 cursor-pointer transition-all duration-300 bg-[#34495e] border-[#26a69a]/20 hover:shadow-[0_0_12px_#26a69a50] ${
                  selectedChallenge.id === challenge.id
                    ? "border-[#26a69a] bg-[#26a69a]/10 shadow-[0_0_12px_#26a69a50]"
                    : "hover:border-[#26a69a]/50"
                }`}
                onClick={() => handleChallengeChange(challenge)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#26a69a] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {challenge.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1 truncate text-white">
                      {challenge.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Challenge Header */}
            <Card className="p-6 bg-[#34495e] border-[#26a69a]/20 shadow-lg rounded-2xl animate-scale-in">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-[#26a69a]/20 rounded-xl">
                  <Code className="h-6 w-6 text-[#26a69a]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {selectedChallenge.title}
                  </h2>
                  <p className="text-gray-300">
                    {selectedChallenge.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#26a69a]/40 text-[#26a69a] hover:bg-[#26a69a]/20"
                  onClick={() => setShowHints(!showHints)}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  {showHints ? "Sembunyikan" : "Tampilkan"} Hints
                </Button>
              </div>

              {showHints && (
                <div className="mt-4 p-4 bg-[#26a69a]/10 border border-[#26a69a]/30 rounded-lg animate-fade-in">
                  <p className="font-semibold text-[#26a69a] mb-2">💡 Hints:</p>
                  <ul className="space-y-2">
                    {selectedChallenge.hints.map((hint, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#26a69a] mt-0.5 flex-shrink-0" />
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            {/* Editor and Output */}
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#34495e] border-[#26a69a]/20">
                <TabsTrigger
                  value="editor"
                  className="text-[#26a69a] data-[state=active]:bg-[#26a69a]/20"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Editor Kode
                </TabsTrigger>
                <TabsTrigger
                  value="output"
                  className="text-[#26a69a] data-[state=active]:bg-[#26a69a]/20"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Output
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-4">
                <Card className="p-6 bg-[#34495e] border-[#26a69a]/20 rounded-2xl animate-fade-in">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-white">
                        Tulis Kode Kamu:
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#26a69a] hover:bg-[#26a69a]/20"
                        onClick={handleReset}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                    <SyntaxHighlighter
                      language="go"
                      style={{
                        ...oneDark,
                        'pre[class*="language-"]': {
                          background: "#2c3e50",
                          borderRadius: "0.75rem",
                          padding: "1.25rem",
                          fontSize: "0.9rem",
                          margin: 0,
                        },
                        "span.token.keyword": { color: "#26a69a" },
                        "span.token.function": { color: "#f39c12" },
                        "span.token.string": { color: "#f5b041" },
                        "span.token.number": { color: "#2aa198" },
                        "span.token.comment": { color: "#7f8c8d" },
                      }}
                      customStyle={{ minHeight: "400px", padding: "1rem" }}
                      showLineNumbers
                      wrapLines
                    >
                      {code}
                    </SyntaxHighlighter>
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="font-mono text-sm min-h-[400px] bg-[#2c3e50] text-gray-100 border-[#26a69a]/30 focus:border-[#26a69a] hidden"
                      placeholder="Mulai coding di sini..."
                    />
                    <Button
                      size="lg"
                      className="w-full bg-[#26a69a] text-white hover:bg-[#1f8f85]"
                      onClick={handleRunCode}
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Jalankan Kode
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="output">
                <Card className="p-6 bg-[#34495e] border-[#26a69a]/20 rounded-2xl animate-fade-in">
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-white">
                      Output:
                    </label>
                    <pre className="min-h-[400px] bg-[#2c3e50] rounded-lg p-4 font-mono text-sm text-gray-100 border-[#26a69a]/30">
                      {output || (
                        <p className="text-gray-400">
                          Klik "Jalankan Kode" untuk melihat output...
                        </p>
                      )}
                    </pre>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Expected Output */}
            <Card className="p-6 bg-[#34495e] border-[#26a69a]/20 rounded-2xl animate-fade-in">
              <h3 className="font-semibold mb-3 text-white">
                Output yang Diharapkan:
              </h3>
              <pre className="bg-[#2c3e50] p-4 rounded-lg font-mono text-sm text-gray-100 border-[#26a69a]/30">
                {selectedChallenge.expectedOutput}
              </pre>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Latihan;

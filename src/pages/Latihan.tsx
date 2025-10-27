import { useState } from "react";
import {
  Code,
  Play,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  Loader2,
  FileCode,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import goLang from "react-syntax-highlighter/dist/esm/languages/prism/go";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Register bahasa untuk syntax highlighter
if (typeof SyntaxHighlighter.registerLanguage === "function") {
  SyntaxHighlighter.registerLanguage("go", goLang);
}

type Challenge = {
  id: number;
  title: string;
  description: string;
  expectedOutput: string;
  hints: string[];
  starterCode: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
};

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Fungsi Penjumlahan Sederhana",
    description:
      "Buatlah fungsi Go untuk menjumlahkan dua angka integer dan menampilkan hasilnya.",
    expectedOutput: "Hasil penjumlahan: 8",
    starterCode: `package main

import "fmt"

func tambah(a int, b int) int {
    // TODO: Implementasikan penjumlahan
}

func main() {
    // TODO: Panggil fungsi tambah dengan input 5 dan 3
}`,
    hints: [
      "Gunakan return untuk mengembalikan hasil a + b",
      "Panggil fungsi tambah di main()",
      "Gunakan fmt.Println untuk mencetak hasil",
    ],
    level: "beginner",
    duration: "10 menit",
  },
  {
    id: 2,
    title: "Menghitung Faktorial",
    description:
      "Buatlah program Go untuk menghitung faktorial dari angka 5 menggunakan perulangan.",
    expectedOutput: "Faktorial 5 adalah: 120",
    starterCode: `package main

import "fmt"

func main() {
    n := 5
    // TODO: Hitung faktorial menggunakan for
}`,
    hints: [
      "Gunakan variabel hasil yang diinisialisasi dengan 1",
      "Gunakan for loop dari 1 sampai n",
      "Kalikan hasil dengan setiap iterasi",
    ],
    level: "intermediate",
    duration: "15 menit",
  },
  {
    id: 3,
    title: "Filter Bilangan Genap",
    description:
      "Buatlah program Go untuk memfilter bilangan genap dari slice [1, 2, 3, 4, 5, 6].",
    expectedOutput: "Bilangan genap: [2 4 6]",
    starterCode: `package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5, 6}
    // TODO: Filter bilangan genap ke slice baru
}`,
    hints: [
      "Gunakan for range untuk iterasi slice",
      "Gunakan append() untuk menambahkan ke slice baru",
      "Cek bilangan genap dengan num % 2 == 0",
    ],
    level: "intermediate",
    duration: "20 menit",
  },
  {
    id: 4,
    title: "Struct dan Method Biodata",
    description:
      "Buatlah struct Person dengan field Nama dan Umur, serta method untuk mencetak biodata.",
    expectedOutput: "Biodata: Budi, 25 tahun",
    starterCode: `package main

import "fmt"

// TODO: Definisikan struct Person

func main() {
    // TODO: Buat instance dan panggil method
}`,
    hints: [
      "Deklarasikan struct dengan field Nama (string) dan Umur (int)",
      "Buat method dengan receiver (p Person)",
      "Gunakan fmt.Sprintf untuk format string",
    ],
    level: "advanced",
    duration: "25 menit",
  },
];

const LatihanBaru = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(
    challenges[0]
  );
  const [code, setCode] = useState(challenges[0].starterCode);
  const [output, setOutput] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  const handleChallengeChange = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCode(challenge.starterCode);
    setOutput("");
    setShowHints(false);
    setActiveTab("editor");
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("⏳ Menjalankan kode di Go Playground...");
    setActiveTab("output");

    try {
      const response = await fetch("https://play.golang.org/_/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          version: "2",
          body: code,
          withVet: "true",
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menghubungi Go Playground");
      }

      const result = await response.json();

      if (result.Errors) {
        setOutput(`❌ Compilation Error:\n\n${result.Errors}`);
        setIsRunning(false);
        return;
      }

      let programOutput = "";
      if (result.Events) {
        result.Events.forEach((event: any) => {
          if (event.Message) {
            programOutput += event.Message;
          }
        });
      }

      const trimmedOutput = programOutput.trim();
      const expectedOutput = selectedChallenge.expectedOutput.trim();

      if (trimmedOutput === expectedOutput) {
        setOutput(`✅ Selamat! Kode Anda benar!\n\nOutput:\n${programOutput}`);
      } else {
        setOutput(
          `⚠️ Kode berhasil dijalankan, tapi output tidak sesuai:\n\n📤 Output Anda:\n${programOutput}\n\n📋 Output yang Diharapkan:\n${expectedOutput}`
        );
      }
    } catch (error) {
      setOutput(
        `❌ Error: Tidak dapat terhubung ke Go Playground.\nPastikan Anda terhubung ke internet atau coba lagi nanti.`
      );
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(selectedChallenge.starterCode);
    setOutput("");
    setShowHints(false);
    setActiveTab("editor");
  };

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
    <div className="min-h-screen bg-[#2c3e50] text-gray-100">
      {/* Header */}
      <Card className="border-b border-[#26a69a]/20 bg-[#34495e] shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#26a69a]/20 rounded-lg">
              <FileCode className="h-8 w-8 text-[#26a69a]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#26a69a] to-[#f39c12] bg-clip-text text-transparent">
                Latihan Interaktif Golang
              </h1>
              <p className="text-gray-400 text-sm">
                Asah keterampilan Go Anda dengan latihan langsung di browser
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Daftar Latihan */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-3">
              <h3 className="font-semibold text-lg mb-4 text-[#f39c12] flex items-center gap-2">
                <span className="w-1 h-6 bg-[#26a69a] rounded-full"></span>
                Pilih Latihan
              </h3>
              <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#26a69a]/60 scrollbar-track-transparent">
                {challenges.map((challenge) => (
                  <Card
                    key={challenge.id}
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      selectedChallenge.id === challenge.id
                        ? "border-[#26a69a] bg-[#26a69a]/10 shadow-[0_0_12px_#26a69a50]"
                        : "border-[#34495e] bg-[#34495e]/50 hover:border-[#26a69a]/50 hover:bg-[#26a69a]/5"
                    }`}
                    onClick={() => handleChallengeChange(challenge)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#26a69a] to-[#f39c12] flex items-center justify-center text-white font-bold text-sm">
                        {challenge.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm text-white line-clamp-2">
                            {challenge.title}
                          </h4>
                          {renderLevelBadge(challenge.level)}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {challenge.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          {challenge.duration}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </aside>

          {/* Konten Utama */}
          <section className="lg:col-span-3 space-y-6">
            {/* Header Latihan */}
            <Card className="p-6 bg-[#34495e] border border-[#26a69a]/20 rounded-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#26a69a]/20 rounded-lg">
                      <Code className="h-5 w-5 text-[#26a69a]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedChallenge.title}
                    </h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedChallenge.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    {selectedChallenge.duration} • {renderLevelBadge(selectedChallenge.level)}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-[#26a69a]/40 text-[#26a69a] hover:bg-[#26a69a]/20"
                  onClick={() => setShowHints(!showHints)}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  {showHints ? "Sembunyikan" : "Lihat"} Petunjuk
                </Button>
              </div>

              {showHints && (
                <Card className="mt-4 p-4 bg-[#26a69a]/10 border border-[#26a69a]/30 rounded-lg">
                  <p className="font-semibold text-[#f39c12] mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Petunjuk:
                  </p>
                  <ul className="space-y-2">
                    {selectedChallenge.hints.map((hint, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#26a69a] mt-0.5" />
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </Card>

            {/* Editor dan Output */}
            <Card className="p-6 bg-[#34495e] border border-[#26a69a]/20 rounded-2xl">
              <div className="flex gap-2 mb-4 bg-[#2c3e50] p-1 rounded-lg border border-[#26a69a]/30">
                <Button
                  variant={activeTab === "editor" ? "default" : "ghost"}
                  className={`flex-1 text-sm flex items-center justify-center gap-2 ${
                    activeTab === "editor"
                      ? "bg-[#26a69a] text-white hover:bg-[#26a69a]/80"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("editor")}
                >
                  <Code className="h-4 w-4" />
                  Editor Kode
                </Button>
                <Button
                  variant={activeTab === "output" ? "default" : "ghost"}
                  className={`flex-1 text-sm flex items-center justify-center gap-2 ${
                    activeTab === "output"
                      ? "bg-[#26a69a] text-white hover:bg-[#26a69a]/80"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("output")}
                >
                  <Play className="h-4 w-4" />
                  Output
                </Button>
              </div>

              {activeTab === "editor" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#26a69a] rounded-full"></span>
                      Tulis Kode Anda:
                    </label>
                    <Button
                      variant="ghost"
                      className="text-gray-400 hover:text-[#26a69a] hover:bg-[#26a69a]/10"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full font-mono text-sm min-h-[400px] bg-[#2c3e50] text-gray-100 border border-[#26a69a]/30 focus:border-[#26a69a] focus:ring-2 focus:ring-[#26a69a]/20 rounded-lg p-4 resize-none outline-none"
                    placeholder="Tulis kode Go Anda di sini..."
                    spellCheck={false}
                  />
                  <Button
                    className="w-full bg-gradient-to-r from-[#26a69a] to-[#f39c12] text-white hover:opacity-90 shadow-lg"
                    onClick={handleRunCode}
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Menjalankan...
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Jalankan Kode
                      </>
                    )}
                  </Button>
                </div>
              )}

              {activeTab === "output" && (
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#f39c12] rounded-full"></span>
                    Output Program:
                  </label>
                  <pre className="min-h-[400px] bg-[#2c3e50] rounded-lg p-4 font-mono text-sm text-gray-100 border border-[#26a69a]/30 whitespace-pre-wrap overflow-auto">
                    {output || (
                      <span className="text-gray-500">
                        Klik "Jalankan Kode" untuk melihat output...
                      </span>
                    )}
                  </pre>
                </div>
              )}
            </Card>

            {/* Output yang Diharapkan */}
            <Card className="p-6 bg-[#34495e] border border-[#26a69a]/20 rounded-2xl">
              <h3 className="font-semibold mb-3 text-[#f39c12] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#f39c12] rounded-full"></span>
                Output yang Diharapkan:
              </h3>
              <SyntaxHighlighter
                language="go"
                style={{
                  ...oneDark,
                  'pre[class*="language-"]': {
                    background: "#2c3e50",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    fontSize: "0.9rem",
                  },
                }}
                wrapLines
              >
                {selectedChallenge.expectedOutput}
              </SyntaxHighlighter>
            </Card>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Card className="border-t border-[#26a69a]/20 bg-[#34495e] mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-400 text-sm">
            Powered by{" "}
            <span className="text-[#26a69a] font-semibold">Go Playground API</span>{" "}
            • Kembangkan keterampilan Go dengan latihan interaktif
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LatihanBaru;
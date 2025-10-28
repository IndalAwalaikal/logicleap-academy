import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Code,
  Play,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  Loader2,
  Star,
  Target,
  Clock,
  Terminal,
  Zap,
  Sparkles,
  Keyboard,
  AlertCircle,
} from "lucide-react";
import Editor from "@monaco-editor/react";

type Challenge = {
  id: number;
  title: string;
  description: string;
  hints: string[];
  difficulty: "easy" | "medium" | "hard";
  timeEstimate: string;
  starterCode?: string;
  inputDescription?: string;
  expectedOutput?: string;
};

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Program Salam Personal",
    description:
      "Buat program yang menggunakan variabel nama dengan nilai nama anda sendiri dan mencetak salam personal.",
    hints: [
      "Deklarasi variabel: nama := 'Budi'",
      'Cetak hasil: fmt.Printf("Halo %s! Selamat belajar Go!", nama)',
      "Tidak perlu menggunakan fmt.Scan",
    ],
    difficulty: "easy",
    timeEstimate: "5-10 menit",
    expectedOutput: "Halo [Nama]! Selamat belajar Go!",
  },
  {
    id: 2,
    title: "Kalkulator Sederhana",
    description:
      "Buat kalkulator yang menggunakan angka1 = 15, angka2 = 3, dan operator = '*', lalu menampilkan hasil perhitungan.",
    hints: [
      "Deklarasi variabel dengan nilai tetap",
      "Gunakan switch statement untuk operator",
      "Handle pembagian dengan nol menggunakan if",
    ],
    difficulty: "medium",
    timeEstimate: "15-20 menit",
    expectedOutput: "Hasil: 45",
  },
  {
    id: 3,
    title: "Generator Bilangan Prima",
    description:
      "Buat program yang menghasilkan 10 bilangan prima pertama. Gunakan nilai n = 10.",
    hints: [
      "Buat fungsi isPrime untuk cek bilangan prima",
      "Gunakan nested loop untuk generate",
      "Gunakan slice untuk menyimpan hasil",
      "Tetapkan n := 10",
    ],
    difficulty: "hard",
    timeEstimate: "25-30 menit",
    expectedOutput: "2, 3, 5, 7, 11, 13, 17, 19, 23, 29",
  },
  {
    id: 4,
    title: "Konverter Suhu",
    description:
      "Buat program konversi suhu 25 derajat Celsius ke Fahrenheit dan Kelvin.",
    hints: [
      "Rumus: F = C * 9/5 + 32, K = C + 273.15",
      "Tetapkan celsius := 25.0",
      "Hitung dan tampilkan kedua konversi",
    ],
    difficulty: "easy",
    timeEstimate: "10-15 menit",
    expectedOutput: "77°F dan 298.15K",
  },
  {
    id: 5,
    title: "Menghitung Faktorial",
    description:
      "Buat fungsi rekursif untuk menghitung faktorial dari angka 5.",
    hints: [
      "Gunakan rekursi: faktorial(n) = n * faktorial(n-1)",
      "Base case: jika n == 0, return 1",
      "Panggil fungsi dengan n = 5",
    ],
    difficulty: "easy",
    timeEstimate: "10-15 menit",
    expectedOutput: "120",
  },
  {
    id: 6,
    title: "Menghitung Rata-rata Nilai",
    description:
      "Buat program yang menghitung rata-rata, nilai tertinggi, dan terendah dari nilai-nilai: [85, 90, 78, 92, 88].",
    hints: [
      "nilai := []int{85, 90, 78, 92, 88}",
      "Gunakan loop untuk menghitung total",
      "Cari nilai max dan min dalam satu loop",
    ],
    difficulty: "easy",
    timeEstimate: "10-15 menit",
    expectedOutput: "Rata-rata: 86.6, Max: 92, Min: 78",
  },
  {
    id: 7,
    title: "Manajemen Daftar Todo",
    description:
      "Buat program manajemen todo list dengan daftar tugas tetap: ['Belajar Go', 'Mengerjakan latihan', 'Baca dokumentasi'].",
    hints: [
      "Gunakan slice untuk menyimpan daftar todo",
      'todo := []string{"Belajar Go", "Mengerjakan latihan", "Baca dokumentasi"}',
      "Tampilkan semua todo menggunakan loop",
    ],
    difficulty: "medium",
    timeEstimate: "20-25 menit",
  },
  {
    id: 8,
    title: "Menghitung Faktorial",
    description:
      "Buat fungsi rekursif untuk menghitung faktorial dari angka 5.",
    hints: [
      "Gunakan rekursi: faktorial(n) = n * faktorial(n-1)",
      "Base case: jika n == 0, return 1",
      "Panggil fungsi dengan n = 5",
    ],
    difficulty: "easy",
    timeEstimate: "10-15 menit",
  },
  {
    id: 9,
    title: "Manipulasi String Advanced",
    description:
      "Buat program yang memproses string 'Hello World 123' dan melakukan: reverse, cek palindrome, hitung vowels, dan hapus whitespace.",
    hints: [
      "Deklarasi text := 'Hello World 123'",
      "Konversi string ke rune slice untuk reverse",
      "Gunakan strings.ReplaceAll untuk hapus spasi",
      "Loop untuk hitung vowels (a, i, u, e, o)",
    ],
    difficulty: "medium",
    timeEstimate: "20-25 menit",
  },
  {
    id: 10,
    title: "Simple Database dengan Map",
    description:
      "Buat sistem penyimpanan data siswa menggunakan map dengan data: {'123': 'Budi', '456': 'Siti', '789': 'Ahmad'}.",
    hints: [
      'siswa := map[string]string{"123": "Budi", "456": "Siti", "789": "Ahmad"}',
      "Tampilkan semua data siswa menggunakan range",
      "Implementasi operasi baca saja",
    ],
    difficulty: "hard",
    timeEstimate: "30-35 menit",
  },
  {
    id: 11,
    title: "Konverter Waktu",
    description: "Buat program konversi waktu 15:30 WIB ke UTC, EST, dan PST.",
    hints: [
      "Tetapkan waktu tetap",
      "Gunakan time.FixedZone untuk timezone",
      "Format output dengan time.Format",
    ],
    difficulty: "hard",
    timeEstimate: "25-30 menit",
  },
  {
    id: 12,
    title: "Menghitung Rata-rata Nilai",
    description:
      "Buat program yang menghitung rata-rata, nilai tertinggi, dan terendah dari nilai-nilai: [85, 90, 78, 92, 88].",
    hints: [
      "nilai := []int{85, 90, 78, 92, 88}",
      "Gunakan loop untuk menghitung total",
      "Gunakan math.Max dan math.Min untuk nilai ekstrem",
    ],
    difficulty: "easy",
    timeEstimate: "10-15 menit",
  },
  {
    id: 13,
    title: "Fibonacci Sequence",
    description:
      "Buat program yang menghasilkan 8 angka pertama deret Fibonacci.",
    hints: [
      "Gunakan slice dengan dua angka pertama 0 dan 1",
      "Setiap angka berikutnya adalah jumlah dua angka sebelumnya",
      "Tetapkan n := 8",
    ],
    difficulty: "medium",
    timeEstimate: "15-20 menit",
  },
  {
    id: 14,
    title: "Sorting Algorithm",
    description:
      "Implementasi algoritma sorting untuk mengurutkan slice: [64, 34, 25, 12, 22, 11, 90].",
    hints: [
      "angka := []int{64, 34, 25, 12, 22, 11, 90}",
      "Bubble sort: bandingkan dan swap elemen berturut-turut",
      "Gunakan nested loop untuk iterasi",
    ],
    difficulty: "hard",
    timeEstimate: "25-30 menit",
  },
  {
    id: 15,
    title: "File Reader Simulation",
    description:
      "Buat program yang menganalisis teks 'Go adalah bahasa pemrograman yang powerful dan sederhana' dan menampilkan statistik: jumlah baris, kata, dan karakter.",
    hints: [
      'text := "Go adalah bahasa pemrograman yang powerful dan sederhana"',
      "Gunakan strings.Split untuk memisah baris",
      "Hitung kata dengan strings.Fields",
    ],
    difficulty: "medium",
    timeEstimate: "20-25 menit",
  },
];

const Latihan = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(
    challenges[0]
  );
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [userProgress, setUserProgress] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [stdin, setStdin] = useState("");
  const [showInputField, setShowInputField] = useState(false);

  const difficultyConfig = {
    easy: { color: "#26A69A", bg: "rgba(38, 166, 154, 0.2)", label: "Mudah" },
    medium: {
      color: "#F39C12",
      bg: "rgba(243, 156, 18, 0.2)",
      label: "Menengah",
    },
    hard: { color: "#E74C3C", bg: "rgba(231, 76, 60, 0.2)", label: "Sulit" },
  };

  useEffect(() => {
    setCode("");
    setOutput("");
    setStdin("");
    setShowInputField(false);
    setExecutionTime(0);
  }, [selectedChallenge]);

  const executeCodeWithPiston = async (
    sourceCode: string,
    input: string = ""
  ) => {
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "go",
          version: "1.16.2",
          files: [
            {
              name: "main.go",
              content: sourceCode,
            },
          ],
          stdin: input,
          compile_timeout: 10000,
          run_timeout: 3000,
          compile_memory_limit: -1,
          run_memory_limit: -1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(
        `Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleRunCode = async () => {
    if (isRunning || !code.trim()) {
      return;
    }

    setIsRunning(true);
    setOutput("🔄 Mengkompilasi dan menjalankan program...\n");

    try {
      const startTime = performance.now();
      const result = await executeCodeWithPiston(code, stdin);
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));

      let finalOutput = "";

      if (result.compile && result.compile.output) {
        finalOutput += "📋 Compile Output:\n" + result.compile.output + "\n\n";
      }

      if (result.run) {
        if (result.run.output) {
          finalOutput += "✅ Output:\n" + result.run.output;
        } else if (result.run.stdout) {
          finalOutput += "✅ Output:\n" + result.run.stdout;
        }

        if (result.run.stderr) {
          finalOutput += "\n\n⚠️ Stderr:\n" + result.run.stderr;
        }

        if (result.run.code !== 0 && result.run.code !== undefined) {
          finalOutput += `\n\n❌ Exit Code: ${result.run.code}`;
        }
      }

      if (!finalOutput.trim()) {
        finalOutput = "✅ Program berhasil dijalankan tanpa output.";
      }

      setOutput(finalOutput);

      // Mark as completed if successful
      if (result.run && result.run.code === 0 && result.run.output) {
        setUserProgress((prev) => ({
          ...prev,
          [selectedChallenge.id]: true,
        }));
      }
    } catch (error) {
      setOutput(
        `❌ Error: ${
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menjalankan kode"
        }\n\nPastikan koneksi internet Anda stabil.`
      );
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setOutput("");
    setStdin("");
    setExecutionTime(0);
  };

  const handleChallengeChange = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowHints(false);
  };

  const handleFormatCode = () => {
    const formatted = code
      .split("\n")
      .map((line) => line.trimEnd())
      .filter((line, index, arr) => {
        if (line.length === 0 && index > 0 && arr[index - 1].length === 0) {
          return false;
        }
        return true;
      })
      .join("\n");
    setCode(formatted);
  };

  const completedChallenges = Object.keys(userProgress).length;
  const progressPercentage = (completedChallenges / challenges.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8" style={{ color: "#F39C12" }} />
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                Go <span style={{ color: "#26A69A" }}>Playground</span>
              </h1>
              <Sparkles className="h-8 w-8" style={{ color: "#26A69A" }} />
            </div>
            <p className="text-lg md:text-xl" style={{ color: "#ECF0F1" }}>
              Tulis, jalankan, dan lihat hasil kode Go secara real-time
            </p>
            <p className="text-sm mt-2" style={{ color: "#95A5A6" }}>
              Powered by Piston API - Real Go Compiler
            </p>

            <div
              className="max-w-2xl mx-auto mt-6 p-1 rounded-full"
              style={{
                background: "rgba(38, 166, 154, 0.2)",
                border: "2px solid rgba(38, 166, 154, 0.3)",
              }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#FFFFFF" }}
                >
                  Progress: {completedChallenges}/{challenges.length}
                </span>
                <div
                  className="flex-1 mx-4 rounded-full h-3"
                  style={{ background: "rgba(0,0,0,0.3)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPercentage}%`,
                      background:
                        "linear-gradient(90deg, #26A69A 0%, #F39C12 100%)",
                    }}
                  />
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#F39C12" }}
                >
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Challenges List */}
            <div className="lg:col-span-1 space-y-4">
              <Card
                className="rounded-2xl p-5"
                style={{
                  background: "#1A252F",
                  border: "2px solid rgba(38, 166, 154, 0.3)",
                }}
              >
                <h3
                  className="font-bold text-lg mb-4 flex items-center gap-2"
                  style={{ color: "#FFFFFF" }}
                >
                  <Target className="h-5 w-5" style={{ color: "#F39C12" }} />
                  Tantangan ({challenges.length})
                </h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {challenges.map((challenge) => {
                    const difficulty = difficultyConfig[challenge.difficulty];
                    const isCompleted = userProgress[challenge.id];

                    return (
                      <Card
                        key={challenge.id}
                        className="p-4 cursor-pointer transition-all duration-300 rounded-xl hover:scale-105"
                        style={{
                          background:
                            selectedChallenge.id === challenge.id
                              ? "rgba(38, 166, 154, 0.2)"
                              : "rgba(26, 37, 47, 0.6)",
                          border:
                            selectedChallenge.id === challenge.id
                              ? "2px solid #26A69A"
                              : "2px solid rgba(38, 166, 154, 0.2)",
                        }}
                        onClick={() => handleChallengeChange(challenge)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                            style={{
                              background: isCompleted
                                ? "#26A69A"
                                : "linear-gradient(135deg, #F39C12, #E67E22)",
                              color: "#FFFFFF",
                            }}
                          >
                            {isCompleted ? "✓" : challenge.id}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4
                                className="font-semibold text-sm leading-tight"
                                style={{ color: "#FFFFFF" }}
                              >
                                {challenge.title}
                              </h4>
                              {isCompleted && (
                                <Star
                                  className="h-4 w-4 fill-current"
                                  style={{ color: "#F39C12" }}
                                />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs flex-wrap">
                              <span
                                className="px-2 py-1 rounded-full font-semibold"
                                style={{
                                  background: difficulty.bg,
                                  color: difficulty.color,
                                }}
                              >
                                {difficulty.label}
                              </span>
                              <div
                                className="flex items-center gap-1"
                                style={{ color: "#BDC3C7" }}
                              >
                                <Clock className="h-3 w-3" />
                                {challenge.timeEstimate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Challenge Description */}
              <Card
                className="rounded-2xl p-6"
                style={{
                  background: "#1A252F",
                  border: "2px solid rgba(243, 156, 18, 0.3)",
                }}
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div
                          className="px-3 py-1 rounded-full font-semibold text-sm"
                          style={{
                            background:
                              difficultyConfig[selectedChallenge.difficulty].bg,
                            color:
                              difficultyConfig[selectedChallenge.difficulty]
                                .color,
                          }}
                        >
                          {difficultyConfig[selectedChallenge.difficulty].label}
                        </div>
                        <div
                          className="flex items-center gap-1 text-sm"
                          style={{ color: "#BDC3C7" }}
                        >
                          <Clock className="h-4 w-4" />
                          {selectedChallenge.timeEstimate}
                        </div>
                      </div>
                      {userProgress[selectedChallenge.id] && (
                        <div
                          className="flex items-center gap-1 text-sm font-semibold"
                          style={{ color: "#26A69A" }}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Selesai
                        </div>
                      )}
                    </div>
                    <h2
                      className="text-2xl md:text-3xl font-bold mb-3"
                      style={{ color: "#FFFFFF" }}
                    >
                      {selectedChallenge.title}
                    </h2>
                    <p
                      className="text-base md:text-lg leading-relaxed mb-4"
                      style={{ color: "#ECF0F1" }}
                    >
                      {selectedChallenge.description}
                    </p>

                    {selectedChallenge.expectedOutput && (
                      <div
                        className="flex items-start gap-2 p-3 rounded-lg"
                        style={{ background: "rgba(52, 152, 219, 0.1)" }}
                      >
                        <AlertCircle
                          className="h-4 w-4 mt-0.5 flex-shrink-0"
                          style={{ color: "#3498DB" }}
                        />
                        <span className="text-sm" style={{ color: "#3498DB" }}>
                          <strong>Expected Output:</strong>{" "}
                          {selectedChallenge.expectedOutput}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    className="rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background: showHints
                        ? "rgba(243, 156, 18, 0.2)"
                        : "transparent",
                      border: "2px solid #F39C12",
                      color: "#F39C12",
                    }}
                    onClick={() => setShowHints(!showHints)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {showHints ? "Sembunyikan" : "Petunjuk"}
                  </Button>
                </div>

                {showHints && (
                  <div
                    className="mt-6 p-5 rounded-xl animate-fade-in"
                    style={{
                      background: "rgba(243, 156, 18, 0.1)",
                      border: "2px solid rgba(243, 156, 18, 0.3)",
                    }}
                  >
                    <p
                      className="font-semibold mb-4 flex items-center gap-2"
                      style={{ color: "#F39C12" }}
                    >
                      <Zap className="h-5 w-5" />
                      Tips & Petunjuk:
                    </p>
                    <ul className="space-y-3">
                      {selectedChallenge.hints.map((hint, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0"
                            style={{ background: "#F39C12", color: "#FFFFFF" }}
                          >
                            {index + 1}
                          </div>
                          <span
                            className="text-sm"
                            style={{ color: "#ECF0F1" }}
                          >
                            {hint}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>

              {/* Code Editor and Output */}
              <div className="space-y-5">
                <Card
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "#1A252F",
                    border: "2px solid rgba(38, 166, 154, 0.3)",
                  }}
                >
                  <div
                    className="p-4"
                    style={{
                      borderBottom: "2px solid rgba(38, 166, 154, 0.2)",
                    }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-2">
                        <Code
                          className="h-5 w-5"
                          style={{ color: "#26A69A" }}
                        />
                        <span
                          className="font-semibold"
                          style={{ color: "#FFFFFF" }}
                        >
                          Editor Kode
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          className="rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                          style={{
                            background: "transparent",
                            border: "2px solid #95A5A6",
                            color: "#95A5A6",
                          }}
                          onClick={handleFormatCode}
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Format
                        </Button>
                        <Button
                          className="rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                          style={{
                            background: "transparent",
                            border: "2px solid #E67E22",
                            color: "#E67E22",
                          }}
                          onClick={handleReset}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button
                          className="rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                          style={{
                            background: showInputField
                              ? "rgba(52, 152, 219, 0.2)"
                              : "transparent",
                            border: "2px solid #3498DB",
                            color: "#3498DB",
                          }}
                          onClick={() => setShowInputField(!showInputField)}
                        >
                          <Keyboard className="h-4 w-4 mr-2" />
                          Input
                        </Button>
                        <Button
                          className="rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                          style={{
                            background:
                              "linear-gradient(135deg, #26A69A, #229488)",
                            color: "#FFFFFF",
                          }}
                          onClick={handleRunCode}
                          disabled={isRunning || !code.trim()}
                        >
                          {isRunning ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Play className="h-4 w-4 mr-2" />
                          )}
                          {isRunning ? "Running..." : "Run"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-2" style={{ background: "#1E1E1E" }}>
                    <Editor
                      height="400px"
                      defaultLanguage="go"
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineHeight: 1.5,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: "on",
                        padding: { top: 10 },
                        renderLineHighlight: "all",
                        overviewRulerBorder: false,
                        bracketPairColorization: { enabled: true },
                        guides: {
                          bracketPairs: true,
                          indentation: true,
                        },
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                      }}
                    />
                  </div>
                </Card>

                {showInputField && (
                  <Card
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(52, 152, 219, 0.1)",
                      border: "2px solid rgba(52, 152, 219, 0.5)",
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Keyboard
                          className="h-5 w-5"
                          style={{ color: "#3498DB" }}
                        />
                        <Label
                          htmlFor="stdin"
                          className="font-semibold"
                          style={{ color: "#3498DB" }}
                        >
                          Standard Input (stdin)
                        </Label>
                      </div>
                      <textarea
                        id="stdin"
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        placeholder="Masukkan input untuk program (jika diperlukan)&#10;Contoh untuk multiple input:&#10;10&#10;20&#10;30"
                        className="w-full p-3 rounded-lg font-mono text-sm min-h-[100px]"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          border: "2px solid rgba(52, 152, 219, 0.5)",
                          color: "#FFFFFF",
                          resize: "vertical",
                        }}
                      />
                      <p className="text-xs" style={{ color: "#3498DB" }}>
                        💡 Tip: Untuk multiple input, pisahkan dengan enter
                        (newline)
                      </p>
                    </div>
                  </Card>
                )}

                <Card
                  className="rounded-2xl"
                  style={{
                    background: "#1A252F",
                    border: "2px solid rgba(38, 166, 154, 0.3)",
                  }}
                >
                  <div
                    className="p-4"
                    style={{
                      borderBottom: "2px solid rgba(38, 166, 154, 0.2)",
                    }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Terminal
                          className="h-5 w-5"
                          style={{ color: "#26A69A" }}
                        />
                        <span
                          className="font-semibold"
                          style={{ color: "#FFFFFF" }}
                        >
                          Output
                        </span>
                      </div>
                      {executionTime > 0 && (
                        <span className="text-sm" style={{ color: "#BDC3C7" }}>
                          Execution Time: {executionTime}ms
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <pre
                      className="font-mono text-sm whitespace-pre-wrap rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-auto"
                      style={{
                        background: "#0D1117",
                        color: "#ECF0F1",
                        border: "1px solid rgba(38, 166, 154, 0.2)",
                      }}
                    >
                      {output || (
                        <div
                          className="italic h-full flex items-center justify-center text-center"
                          style={{ color: "#7F8C8D" }}
                        >
                          <div>
                            <Terminal className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>
                              Output akan muncul di sini setelah menjalankan
                              program...
                            </p>
                            <p className="text-xs mt-2">
                              Gunakan tombol "Run" untuk mengeksekusi kode
                            </p>
                          </div>
                        </div>
                      )}
                    </pre>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Latihan;

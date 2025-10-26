import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Code, Play, RotateCcw, Lightbulb, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    description: "Buatlah program yang mencetak nama kamu sebanyak 3 kali menggunakan perulangan.",
    starterCode: `// Tulis kode kamu di sini
let nama = "Budi";

// Gunakan for loop untuk mencetak nama 3 kali
`,
    expectedOutput: `Budi
Budi
Budi`,
    hints: [
      "Gunakan for loop dengan i dari 1 sampai 3",
      "Gunakan console.log() untuk mencetak",
      "Struktur: for(let i=1; i<=3; i++)",
    ],
  },
  {
    id: 2,
    title: "Angka 1 sampai 10",
    description: "Buatlah program yang menampilkan angka dari 1 sampai 10.",
    starterCode: `// Tulis kode kamu di sini

// Gunakan for loop untuk mencetak angka 1-10
`,
    expectedOutput: `1
2
3
4
5
6
7
8
9
10`,
    hints: [
      "Gunakan for loop dengan i dari 1 sampai 10",
      "console.log(i) untuk mencetak angka",
      "Gunakan i++ untuk increment",
    ],
  },
  {
    id: 3,
    title: "Cek Bilangan Genap/Ganjil",
    description: "Buatlah program yang mengecek apakah sebuah angka adalah genap atau ganjil.",
    starterCode: `// Tulis kode kamu di sini
let angka = 7;

// Gunakan if-else dan operator modulo (%)
`,
    expectedOutput: `7 adalah bilangan ganjil`,
    hints: [
      "Gunakan operator % (modulo) untuk cek sisa bagi",
      "Jika angka % 2 === 0, maka genap",
      "Gunakan if-else untuk kondisi",
    ],
  },
  {
    id: 4,
    title: "Grade Nilai",
    description: "Buatlah program yang menentukan grade berdasarkan nilai (A: 90+, B: 80-89, C: 70-79, D: <70).",
    starterCode: `// Tulis kode kamu di sini
let nilai = 85;

// Gunakan if-else if untuk menentukan grade
`,
    expectedOutput: `Grade: B`,
    hints: [
      "Gunakan if-else if untuk multiple kondisi",
      "Cek dari nilai tertinggi (>=90) terlebih dahulu",
      "Jangan lupa kondisi else untuk nilai < 70",
    ],
  },
];

const Latihan = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
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
    // Simulasi output berdasarkan challenge yang dipilih
    // Dalam implementasi nyata, ini akan mengeksekusi kode sungguhan
    setOutput("Sedang menjalankan kode...\n\n" + selectedChallenge.expectedOutput);
  };

  const handleReset = () => {
    setCode(selectedChallenge.starterCode);
    setOutput("");
    setShowHints(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Latihan Praktis</h1>
          <p className="text-muted-foreground text-lg">
            Praktikkan konsep yang sudah kamu pelajari dengan tantangan coding
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Challenge List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-semibold text-lg mb-3">Daftar Tantangan</h3>
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-soft ${
                  selectedChallenge.id === challenge.id
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "hover:border-primary/50"
                }`}
                onClick={() => handleChallengeChange(challenge)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {challenge.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1 truncate">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
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
            <Card className="p-6 bg-gradient-card animate-scale-in">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-gradient-primary rounded-xl">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedChallenge.title}</h2>
                  <p className="text-muted-foreground">{selectedChallenge.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHints(!showHints)}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  {showHints ? "Sembunyikan" : "Tampilkan"} Hints
                </Button>
              </div>

              {showHints && (
                <div className="mt-4 p-4 bg-accent/10 border border-accent rounded-lg animate-fade-in">
                  <p className="font-semibold text-accent mb-2">💡 Hints:</p>
                  <ul className="space-y-2">
                    {selectedChallenge.hints.map((hint, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            {/* Editor and Output */}
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor">
                  <Code className="h-4 w-4 mr-2" />
                  Editor Kode
                </TabsTrigger>
                <TabsTrigger value="output">
                  <Play className="h-4 w-4 mr-2" />
                  Output
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-4">
                <Card className="p-6 animate-fade-in">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold">Tulis Kode Kamu:</label>
                      <Button variant="ghost" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="font-mono text-sm min-h-[400px] bg-muted"
                      placeholder="Mulai coding di sini..."
                    />
                    <Button variant="hero" size="lg" onClick={handleRunCode} className="w-full">
                      <Play className="h-5 w-5 mr-2" />
                      Jalankan Kode
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="output">
                <Card className="p-6 animate-fade-in">
                  <div className="space-y-4">
                    <label className="text-sm font-semibold">Output:</label>
                    <div className="min-h-[400px] bg-muted rounded-lg p-4 font-mono text-sm">
                      {output || (
                        <p className="text-muted-foreground">
                          Klik "Jalankan Kode" untuk melihat output...
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Expected Output */}
            <Card className="p-6 animate-fade-in">
              <h3 className="font-semibold mb-3">Output yang Diharapkan:</h3>
              <pre className="bg-muted p-4 rounded-lg font-mono text-sm">
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

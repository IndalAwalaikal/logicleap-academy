import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Trophy,
  RefreshCw,
  ArrowRight,
  BookOpen,
  Home,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type QuizTopic = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

const quizData: QuizTopic[] = [
  {
    id: "intro-golang",
    title: "Kuis Pengenalan Go",
    description: "Uji pemahamanmu tentang dasar-dasar bahasa pemrograman Go",
    questions: [
      {
        id: 1,
        question: "Siapa yang mengembangkan bahasa pemrograman Go?",
        options: ["Microsoft", "Google", "Facebook", "Apple"],
        correctAnswer: 1,
        explanation:
          "Go dikembangkan oleh Google pada tahun 2009 oleh Robert Griesemer, Rob Pike, dan Ken Thompson.",
      },
      {
        id: 2,
        question: "Apa keunggulan utama dari bahasa Go?",
        options: [
          "Sintaks yang kompleks dan powerful",
          "Efisiensi, kejelasan, dan performa tinggi",
          "Hanya untuk pemrograman web",
          "Tidak memerlukan kompilasi",
        ],
        correctAnswer: 1,
        explanation:
          "Go dirancang untuk efisiensi, kejelasan, dan performa tinggi - cocok untuk sistem backend, microservices, dan CLI tools.",
      },
      {
        id: 3,
        question:
          'Apa output dari program Go berikut: package main\nimport "fmt"\nfunc main() { fmt.Println("Hello, World!") }',
        options: [
          "Error kompilasi",
          "Hello World!",
          "Hello, World!",
          "Tidak ada output",
        ],
        correctAnswer: 2,
        explanation:
          "Program akan mencetak 'Hello, World!' dengan koma karena string literal persis seperti yang ditulis.",
      },
      {
        id: 4,
        question: "Mengapa Go disebut bahasa yang compiled?",
        options: [
          "Karena diinterpretasi line by line",
          "Karena dikompilasi ke binary native",
          "Karena berjalan di browser",
          "Karena menggunakan virtual machine",
        ],
        correctAnswer: 1,
        explanation:
          "Go dikompilasi ke binary native yang dapat dijalankan langsung tanpa runtime environment tambahan.",
      },
      {
        id: 5,
        question: "Teknologi populer mana yang dibangun menggunakan Go?",
        options: [
          "React dan Angular",
          "Docker dan Kubernetes",
          "Django dan Flask",
          "MySQL dan PostgreSQL",
        ],
        correctAnswer: 1,
        explanation:
          "Docker dan Kubernetes adalah dua teknologi populer yang dibangun menggunakan bahasa Go.",
      },
    ],
  },
  {
    id: "variables",
    title: "Kuis Variabel & Tipe Data",
    description: "Uji pemahamanmu tentang variabel dan tipe data dalam Go",
    questions: [
      {
        id: 1,
        question: "Manakah deklarasi variabel yang benar dalam Go?",
        options: [
          'var nama string = "Budi"',
          'variable nama = "Budi"',
          'string nama = "Budi"',
          'nama := string "Budi"',
        ],
        correctAnswer: 0,
        explanation:
          "Deklarasi yang benar adalah 'var nama string = \"Budi\"' atau menggunakan shorthand ':='.",
      },
      {
        id: 2,
        question: "Apa perbedaan antara var dan := dalam Go?",
        options: [
          "var untuk global, := untuk lokal",
          "var memerlukan tipe eksplisit, := inferensi tipe",
          "Tidak ada perbedaan",
          "var untuk constant, := untuk variable",
        ],
        correctAnswer: 1,
        explanation:
          "var memerlukan tipe data eksplisit (kecuali diinisialisasi), sedangkan := melakukan inferensi tipe otomatis.",
      },
      {
        id: 3,
        question: "Manakah tipe data integer dalam Go?",
        options: [
          "int, int8, int16, int32, int64",
          "integer, long, short",
          "number, numeric",
          "hanya int",
        ],
        correctAnswer: 0,
        explanation:
          "Go memiliki berbagai tipe integer: int, int8, int16, int32, int64, dan versi unsigned-nya.",
      },
      {
        id: 4,
        question: "Apa output dari: var x float64 = 10 / 3",
        options: ["3.333", "3", "3.0", "Error"],
        correctAnswer: 1,
        explanation:
          "Hasilnya 3 karena operasi antara integer menghasilkan integer. Untuk float harus: 10.0 / 3.0",
      },
      {
        id: 5,
        question: "Bagaimana mendeklarasikan multiple variable dalam Go?",
        options: [
          "var a, b, c int = 1, 2, 3",
          "var a; var b; var c;",
          "a,b,c := 1,2,3",
          "Jawaban 1 dan 3 benar",
        ],
        correctAnswer: 3,
        explanation:
          "Go mendukung deklarasi multiple variable dengan var dan := secara bersamaan.",
      },
    ],
  },
  {
    id: "conditions",
    title: "Kuis Percabangan",
    description:
      "Uji pemahamanmu tentang if/else dan switch statement dalam Go",
    questions: [
      {
        id: 1,
        question: "Apa yang membedakan if statement di Go dari bahasa lain?",
        options: [
          "Tidak mendukung else if",
          "Kondisi tidak perlu tanda kurung",
          "Harus selalu pakai kurung kurawal",
          "Tidak mendukung operator logika",
        ],
        correctAnswer: 1,
        explanation:
          "Di Go, kondisi if tidak memerlukan tanda kurung, berbeda dari kebanyakan bahasa lain.",
      },
      {
        id: 2,
        question:
          'Apa output dari: x := 10; if x > 5 { fmt.Println("Besar") } else { fmt.Println("Kecil") }',
        options: ["Besar", "Kecil", "Error", "Tidak ada output"],
        correctAnswer: 0,
        explanation:
          "Karena x=10 lebih besar dari 5, maka kondisi true dan mencetak 'Besar'.",
      },
      {
        id: 3,
        question: "Bagaimana cara if dengan short statement di Go?",
        options: [
          "if x := getValue(); x > 5 { ... }",
          "if (x = getValue()) > 5 { ... }",
          "if let x = getValue() > 5 { ... }",
          "Tidak supported di Go",
        ],
        correctAnswer: 0,
        explanation:
          "Go mendukung short statement sebelum kondisi: if x := getValue(); x > 5 { ... }",
      },
      {
        id: 4,
        question: "Apa keunikan switch statement di Go?",
        options: [
          "Harus pakai break",
          "Auto break, tidak fallthrough",
          "Hanya untuk string",
          "Tidak support default case",
        ],
        correctAnswer: 1,
        explanation:
          "Switch di Go otomatis break, tidak seperti bahasa lain yang perlu break manual. Gunakan fallthrough untuk continue.",
      },
      {
        id: 5,
        question: "Kapan lebih baik menggunakan switch daripada if/else?",
        options: [
          "Saat ada banyak kondisi berdasarkan nilai yang sama",
          "Hanya untuk tipe data integer",
          "Selalu gunakan switch",
          "Tidak ada bedanya",
        ],
        correctAnswer: 0,
        explanation:
          "Switch lebih bersih dan readable ketika ada banyak kondisi yang memeriksa nilai dari variable yang sama.",
      },
    ],
  },
  {
    id: "loops",
    title: "Kuis Perulangan",
    description: "Uji pemahamanmu tentang looping dengan for dalam Go",
    questions: [
      {
        id: 1,
        question: "Keyword apa yang digunakan untuk loop di Go?",
        options: [
          "for, while, do-while",
          "hanya for",
          "for dan while",
          "loop dan for",
        ],
        correctAnswer: 1,
        explanation:
          "Go hanya memiliki satu keyword untuk perulangan yaitu for, namun bisa digunakan seperti while.",
      },
      {
        id: 2,
        question: "Apa output dari: for i := 0; i < 3; i++ { fmt.Print(i) }",
        options: ["012", "123", "0123", "Error"],
        correctAnswer: 0,
        explanation: "Loop dari i=0 sampai i<3, mencetak 0, 1, 2.",
      },
      {
        id: 3,
        question: "Bagaimana membuat infinite loop di Go?",
        options: [
          "for true { ... }",
          "for { ... }",
          "while true { ... }",
          "Jawaban 1 dan 2 benar",
        ],
        correctAnswer: 3,
        explanation:
          "Baik 'for true { ... }' maupun 'for { ... }' dapat membuat infinite loop di Go.",
      },
      {
        id: 4,
        question: "Apa fungsi range dalam loop?",
        options: [
          "Hanya untuk array",
          "Untuk iterasi array, slice, map, dan channel",
          "Untuk menghasilkan angka acak",
          "Untuk membatasi memory usage",
        ],
        correctAnswer: 1,
        explanation:
          "Range digunakan untuk iterasi elemen dalam array, slice, map, string, dan channel.",
      },
      {
        id: 5,
        question:
          'Apa output dari: s := []string{"a", "b", "c"}; for i, v := range s { fmt.Print(i,v) }',
        options: ["0a1b2c", "abc", "012", "Error"],
        correctAnswer: 0,
        explanation:
          "Range mengembalikan index dan value, sehingga output: 0a1b2c",
      },
    ],
  },
  {
    id: "arrays-slices",
    title: "Kuis Array & Slice",
    description: "Uji pemahamanmu tentang koleksi data dalam Go",
    questions: [
      {
        id: 1,
        question: "Apa perbedaan utama array dan slice?",
        options: [
          "Array dinamis, slice statis",
          "Array statis, slice dinamis",
          "Tidak ada perbedaan",
          "Array untuk number, slice untuk string",
        ],
        correctAnswer: 1,
        explanation:
          "Array memiliki ukuran tetap, sedangkan slice dapat bertambah/berkurang panjangnya.",
      },
      {
        id: 2,
        question: "Manakah deklarasi slice yang benar?",
        options: [
          "var s []int",
          "s := []int{1,2,3}",
          "s := make([]int, 5)",
          "Semua benar",
        ],
        correctAnswer: 3,
        explanation:
          "Semua cara tersebut valid untuk mendeklarasikan slice di Go.",
      },
      {
        id: 3,
        question: "Apa fungsi dari append()?",
        options: [
          "Menghapus elemen slice",
          "Menambah elemen ke slice",
          "Mengurutkan slice",
          "Membalik slice",
        ],
        correctAnswer: 1,
        explanation:
          "append() digunakan untuk menambah elemen ke slice dan mengembalikan slice baru.",
      },
      {
        id: 4,
        question:
          "Apa output dari: s := make([]int, 2, 5); fmt.Print(len(s), cap(s))",
        options: ["2 5", "5 2", "0 5", "Error"],
        correctAnswer: 0,
        explanation:
          "make([]int, 2, 5) membuat slice dengan length=2 dan capacity=5.",
      },
      {
        id: 5,
        question: "Bagaimana cara mengambil sub-slice?",
        options: ["s[0:2]", "s.slice(0,2)", "sub(s,0,2)", "s.get(0,2)"],
        correctAnswer: 0,
        explanation:
          "Gunakan slicing syntax: s[start:end] untuk mengambil sub-slice dari index start sampai end-1.",
      },
    ],
  },
  {
    id: "functions",
    title: "Kuis Fungsi",
    description: "Uji pemahamanmu tentang fungsi dan parameter dalam Go",
    questions: [
      {
        id: 1,
        question: "Bagaimana deklarasi fungsi yang mengembalikan nilai?",
        options: [
          "func tambah(a int, b int) { return a + b }",
          "func tambah(a int, b int) int { return a + b }",
          "function tambah(a,b) { return a+b }",
          "def tambah(a,b): return a+b",
        ],
        correctAnswer: 1,
        explanation:
          "Deklarasi fungsi yang benar: func nama(parameter) returnType { body }",
      },
      {
        id: 2,
        question: "Apa yang special tentang return value di Go?",
        options: [
          "Hanya bisa return satu nilai",
          "Bisa return multiple values",
          "Tidak bisa return value",
          "Return otomatis tanpa keyword",
        ],
        correctAnswer: 1,
        explanation:
          "Go mendukung multiple return values, biasa digunakan untuk error handling.",
      },
      {
        id: 3,
        question: "Apa itu variadic function?",
        options: [
          "Fungsi dengan parameter tetap",
          "Fungsi dengan jumlah parameter variabel",
          "Fungsi yang return value-nya variabel",
          "Fungsi tanpa parameter",
        ],
        correctAnswer: 1,
        explanation:
          "Variadic function menerima jumlah parameter yang variabel menggunakan ... (ellipsis).",
      },
      {
        id: 4,
        question:
          "Apa output dari: func swap(a,b int) (int,int) { return b,a }; x,y := swap(1,2); fmt.Print(x,y)",
        options: ["1 2", "2 1", "Error", "1 1"],
        correctAnswer: 1,
        explanation: "Fungsi swap mengembalikan b,a sehingga x=2 dan y=1.",
      },
      {
        id: 5,
        question: "Bagaimana named return values bekerja?",
        options: [
          "Return value dideklarasikan di parameter",
          "Return value dideklarasikan di nama fungsi",
          "Variable return dideklarasikan di signature",
          "Tidak supported di Go",
        ],
        correctAnswer: 2,
        explanation:
          "Named return values: func contoh() (result int) { result = 10; return }",
      },
    ],
  },
  {
    id: "goroutines",
    title: "Kuis Goroutine & Concurrency",
    description: "Uji pemahamanmu tentang pemrograman paralel dalam Go",
    questions: [
      {
        id: 1,
        question: "Apa itu goroutine?",
        options: [
          "Function biasa",
          "Thread berat OS",
          "Lightweight thread managed oleh Go runtime",
          "Process terpisah",
        ],
        correctAnswer: 2,
        explanation:
          "Goroutine adalah lightweight thread yang dikelola oleh Go runtime, sangat efisien.",
      },
      {
        id: 2,
        question: "Bagaimana cara menjalankan goroutine?",
        options: [
          "go functionName()",
          "goroutine functionName()",
          "async functionName()",
          "functionName().go()",
        ],
        correctAnswer: 0,
        explanation:
          "Gunakan keyword 'go' sebelum pemanggilan fungsi: go functionName()",
      },
      {
        id: 3,
        question: "Apa fungsi channel?",
        options: [
          "Hanya untuk transfer data",
          "Komunikasi dan sinkronisasi antar goroutine",
          "Menyimpan data permanen",
          "Replace array dan slice",
        ],
        correctAnswer: 1,
        explanation:
          "Channel digunakan untuk komunikasi dan sinkronisasi antara goroutine.",
      },
      {
        id: 4,
        question: "Bagaimana membuat buffered channel?",
        options: [
          "ch := make(chan int)",
          "ch := make(chan int, 10)",
          "ch := chan int{10}",
          "ch := new(chan int, 10)",
        ],
        correctAnswer: 1,
        explanation: "Buffered channel: make(chan type, capacity)",
      },
      {
        id: 5,
        question: "Apa itu select statement?",
        options: [
          "Seperti switch untuk tipe data",
          "Untuk memilih antara multiple channel operations",
          "Untuk memilih goroutine",
          "Tidak ada di Go",
        ],
        correctAnswer: 1,
        explanation:
          "Select memungkinkan goroutine menunggu multiple channel operations.",
      },
    ],
  },
  {
    id: "api-project",
    title: "Kuis REST API dengan Go",
    description: "Uji pemahamanmu tentang pembuatan web API dalam Go",
    questions: [
      {
        id: 1,
        question: "Package apa yang digunakan untuk HTTP server di Go?",
        options: ["net/http", "http/server", "web/http", "io/http"],
        correctAnswer: 0,
        explanation:
          "Package net/http menyediakan HTTP client dan server implementation.",
      },
      {
        id: 2,
        question: "Bagaimana pattern handler function di Go?",
        options: [
          "func handler() { ... }",
          "func handler(w ResponseWriter, r *Request)",
          "func handler(r Request) Response",
          "func handler(w Writer, r Reader)",
        ],
        correctAnswer: 1,
        explanation:
          "Handler function: func handler(w http.ResponseWriter, r *http.Request)",
      },
      {
        id: 3,
        question: "Bagaimana menjalankan HTTP server di port 8080?",
        options: [
          "http.Run(8080)",
          'http.ListenAndServe(":8080", nil)',
          "http.StartServer(8080)",
          "http.Serve(8080)",
        ],
        correctAnswer: 1,
        explanation:
          'http.ListenAndServe(":8080", nil) menjalankan server di port 8080 dengan default handler.',
      },
      {
        id: 4,
        question: "Bagaimana cara mengirim JSON response?",
        options: [
          "fmt.Fprint(w, json)",
          "json.NewEncoder(w).Encode(data)",
          "w.Write(jsonString)",
          "Semua benar",
        ],
        correctAnswer: 3,
        explanation:
          "Semua cara bisa digunakan, tetapi json.NewEncoder lebih efisien dan recommended.",
      },
      {
        id: 5,
        question: "Apa keuntungan menggunakan router seperti Gorilla Mux?",
        options: [
          "Routing yang lebih powerful",
          "Middleware support",
          "URL parameter parsing",
          "Semua benar",
        ],
        correctAnswer: 3,
        explanation:
          "Router third-party seperti Gorilla Mux menawarkan routing yang lebih powerful, middleware, dan fitur tambahan.",
      },
    ],
  },
];

const Kuis = () => {
  const [searchParams] = useSearchParams();
  const topicParam = searchParams.get("topic") || "variabel";

  const [currentQuiz, setCurrentQuiz] = useState<QuizTopic>(
    quizData.find((q) => q.id === topicParam) || quizData[0]
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(currentQuiz.questions.length).fill(false)
  );

  useEffect(() => {
    const quiz = quizData.find((q) => q.id === topicParam) || quizData[0];
    setCurrentQuiz(quiz);
    resetQuiz();
  }, [topicParam]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(currentQuiz.questions.length).fill(false));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions[currentQuestionIndex]) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer ===
      currentQuiz.questions[currentQuestionIndex].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  if (showResult) {
    const percentage = (score / currentQuiz.questions.length) * 100;
    return (
      <div className="min-h-screen flex flex-col bg-[#2c3e50] text-gray-100">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto p-8 text-center space-y-6 animate-scale-in bg-[#34495e] border border-[#26a69a]/20 rounded-2xl">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#26a69a] to-[#f39c12] rounded-full flex items-center justify-center">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Kuis Selesai!</h2>
            <div className="space-y-2">
              <p className="text-5xl font-bold bg-gradient-to-r from-[#26a69a] via-[#f39c12] to-[#26a69a] bg-clip-text text-transparent">
                {score} / {currentQuiz.questions.length}
              </p>
              <p className="text-gray-300">
                Skor Anda: {percentage.toFixed(0)}%
              </p>
            </div>
            <div className="space-y-2">
              {percentage >= 80 && (
                <p className="text-lg font-semibold text-[#26a69a]">
                  🎉 Luar Biasa! Kamu sangat menguasai materi ini!
                </p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-lg font-semibold text-[#f39c12]">
                  👍 Bagus! Terus tingkatkan pemahamanmu!
                </p>
              )}
              {percentage < 60 && (
                <p className="text-lg font-semibold text-[#e74c3c]">
                  💪 Jangan menyerah! Coba pelajari materinya lagi!
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button
                onClick={resetQuiz}
                className="bg-[#26a69a] hover:bg-[#2bbbad] text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Ulangi Kuis
              </Button>
              <Link to="/materi">
                <Button
                  variant="outline"
                  className="border-[#26a69a] text-[#26a69a] hover:bg-[#26a69a]/20"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Kembali ke Materi
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-[#f39c12] text-[#f39c12] hover:bg-[#f39c12]/20"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Beranda
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#2c3e50] text-gray-100">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header dengan Pilihan Kuis */}
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span style={{ color: "#FFFFFF" }}>Pilih </span>
                <span style={{ color: "#F39C12" }}>Quiz</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Uji pemahamanmu dengan berbagai topik kuis
              </p>
            </div>

            {/* Grid Pilihan Kuis - Versi Minimalis */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {quizData.map((quiz) => (
                <Card
                  key={quiz.id}
                  className={`p-4 cursor-pointer transition-all duration-300 text-center ${
                    currentQuiz.id === quiz.id
                      ? "border-[#26a69a] bg-[#26a69a]/10 shadow-[0_0_8px_#26a69a30]"
                      : "border-[#34495e] hover:border-[#26a69a]/30 hover:bg-[#26a69a]/5"
                  }`}
                  onClick={() => {
                    setCurrentQuiz(quiz);
                    resetQuiz();
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Brain
                      className={`h-5 w-5 ${
                        currentQuiz.id === quiz.id
                          ? "text-[#26a69a]"
                          : "text-gray-400"
                      }`}
                    />
                    <h3 className="font-semibold text-white text-sm leading-tight">
                      {quiz.title}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>

            {/* Progress dan Info Kuis */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {currentQuiz.title}
                  </h1>
                  <p className="text-gray-300 text-sm">
                    {currentQuiz.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Brain className="h-5 w-5" />
                  <span className="font-semibold">
                    {currentQuestionIndex + 1} / {currentQuiz.questions.length}
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 bg-[#34495e]" />
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-6 space-y-6 animate-scale-in bg-[#34495e] border border-[#26a69a]/20 rounded-2xl">
            <div>
              <p className="text-sm text-gray-400 mb-2">
                Pertanyaan {currentQuestionIndex + 1}
              </p>
              <h2 className="text-xl font-semibold text-white leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isAnswered = answeredQuestions[currentQuestionIndex];
                const isCorrect = index === currentQuestion.correctAnswer;

                let buttonClasses =
                  "w-full justify-start text-left p-4 h-auto transition-all duration-300 border-2 ";

                if (isAnswered) {
                  if (isCorrect) {
                    buttonClasses +=
                      "bg-[#26a69a]/20 border-[#26a69a] text-[#f39c12]";
                  } else if (isSelected && !isCorrect) {
                    buttonClasses +=
                      "bg-[#e74c3c]/20 border-[#e74c3c] text-[#e74c3c]";
                  } else {
                    buttonClasses +=
                      "border-[#34495e] bg-[#2c3e50] text-gray-300";
                  }
                } else if (isSelected) {
                  buttonClasses +=
                    "border-[#26a69a] bg-[#26a69a]/10 text-white";
                } else {
                  buttonClasses +=
                    "border-[#34495e] bg-[#2c3e50] text-gray-300 hover:border-[#26a69a] hover:bg-[#f39c12]/5";
                }

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className={buttonClasses}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                          isAnswered && isCorrect
                            ? "border-[#26a69a] bg-[#26a69a] text-white"
                            : isAnswered && isSelected && !isCorrect
                            ? "border-[#e74c3c] bg-[#e74c3c] text-white"
                            : isSelected
                            ? "border-[#26a69a] bg-[#26a69a] text-white"
                            : "border-gray-500 text-gray-300"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 text-left">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-[#26a69a] flex-shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-[#e74c3c] flex-shrink-0" />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Explanation */}
            {answeredQuestions[currentQuestionIndex] && (
              <div className="p-4 bg-[#2c3e50] border border-[#26a69a]/30 rounded-lg animate-fade-in">
                <p className="text-sm font-semibold mb-2 text-[#f39c12]">
                  Penjelasan:
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                    setSelectedAnswer(null);
                  }
                }}
                disabled={currentQuestionIndex === 0}
                className="border-[#26a69a] text-[#26a69a] hover:bg-[#26a69a]/20"
              >
                Sebelumnya
              </Button>

              {!answeredQuestions[currentQuestionIndex] ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-[#26a69a] hover:bg-[#2bbbad] text-white"
                >
                  Submit Jawaban
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-[#f39c12] hover:bg-[#f4b14d] text-white"
                >
                  {currentQuestionIndex < currentQuiz.questions.length - 1
                    ? "Soal Berikutnya"
                    : "Lihat Hasil"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Kuis;

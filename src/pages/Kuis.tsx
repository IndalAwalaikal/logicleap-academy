import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, CheckCircle2, XCircle, Trophy, RefreshCw, ArrowRight } from "lucide-react";
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
  questions: Question[];
};

const quizData: QuizTopic[] = [
  {
    id: "variabel",
    title: "Kuis Variabel",
    questions: [
      {
        id: 1,
        question: "Apa yang dimaksud dengan variabel dalam pemrograman?",
        options: [
          "Tempat untuk menyimpan data",
          "Jenis data yang berbeda",
          "Fungsi untuk menghitung",
          "Loop untuk perulangan",
        ],
        correctAnswer: 0,
        explanation: "Variabel adalah tempat penyimpanan data yang dapat berubah nilainya selama program berjalan.",
      },
      {
        id: 2,
        question: "Manakah yang merupakan nama variabel yang valid?",
        options: ["123nama", "nama-siswa", "namaSiswa", "nama siswa"],
        correctAnswer: 2,
        explanation: "namaSiswa menggunakan camelCase dan tidak mengandung karakter khusus atau spasi.",
      },
      {
        id: 3,
        question: "Apa tipe data dari nilai true atau false?",
        options: ["String", "Number", "Boolean", "Array"],
        correctAnswer: 2,
        explanation: "Boolean adalah tipe data yang hanya memiliki dua nilai: true atau false.",
      },
      {
        id: 4,
        question: "Jika let umur = 17, maka setelah umur = 18, nilai umur adalah?",
        options: ["17", "18", "35", "Error"],
        correctAnswer: 1,
        explanation: "Variabel dapat diubah nilainya. Setelah reassignment, nilai umur menjadi 18.",
      },
      {
        id: 5,
        question: "Manakah cara yang benar untuk mendeklarasikan variabel di JavaScript modern?",
        options: ["var nama = 'Budi'", "let nama = 'Budi'", "const nama = 'Budi'", "Semua benar"],
        correctAnswer: 3,
        explanation: "Semua cara tersebut valid, namun let dan const lebih disarankan untuk JavaScript modern.",
      },
    ],
  },
  {
    id: "perulangan",
    title: "Kuis Perulangan",
    questions: [
      {
        id: 1,
        question: "Apa fungsi dari loop dalam pemrograman?",
        options: [
          "Menyimpan data",
          "Mengulangi eksekusi kode",
          "Membuat keputusan",
          "Menghapus data",
        ],
        correctAnswer: 1,
        explanation: "Loop digunakan untuk mengulangi eksekusi blok kode tertentu.",
      },
      {
        id: 2,
        question: "Loop manakah yang digunakan ketika jumlah iterasi sudah diketahui?",
        options: ["while loop", "for loop", "do-while loop", "infinite loop"],
        correctAnswer: 1,
        explanation: "For loop ideal digunakan ketika kita sudah tahu berapa kali iterasi akan dilakukan.",
      },
      {
        id: 3,
        question: "Apa output dari: for(let i=1; i<=3; i++) { console.log(i); }",
        options: ["1 2 3", "0 1 2", "1 2 3 4", "3 2 1"],
        correctAnswer: 0,
        explanation: "Loop dimulai dari i=1, berjalan selama i<=3, dan increment i setiap iterasi.",
      },
      {
        id: 4,
        question: "Apa yang terjadi jika kondisi while loop tidak pernah false?",
        options: [
          "Program berhenti",
          "Infinite loop",
          "Error syntax",
          "Loop tidak dijalankan",
        ],
        correctAnswer: 1,
        explanation: "Jika kondisi while selalu true, maka terjadi infinite loop yang tidak pernah berhenti.",
      },
      {
        id: 5,
        question: "Berapa kali loop ini dijalankan? let i=0; while(i<5) { i++; }",
        options: ["4 kali", "5 kali", "6 kali", "0 kali"],
        correctAnswer: 1,
        explanation: "Loop berjalan 5 kali: i=0,1,2,3,4. Saat i=5, kondisi i<5 menjadi false.",
      },
    ],
  },
  {
    id: "kondisi",
    title: "Kuis Kondisi",
    questions: [
      {
        id: 1,
        question: "Apa fungsi dari statement if-else?",
        options: [
          "Mengulangi kode",
          "Membuat keputusan berdasarkan kondisi",
          "Menyimpan data",
          "Menghitung nilai",
        ],
        correctAnswer: 1,
        explanation: "If-else digunakan untuk membuat keputusan dan menjalankan kode berbeda berdasarkan kondisi.",
      },
      {
        id: 2,
        question: "Jika let nilai=85, maka if(nilai>=80) akan?",
        options: [
          "True, kondisi terpenuhi",
          "False, kondisi tidak terpenuhi",
          "Error",
          "Tidak ada output",
        ],
        correctAnswer: 0,
        explanation: "85 lebih besar atau sama dengan 80, sehingga kondisi bernilai true.",
      },
      {
        id: 3,
        question: "Operator manakah yang digunakan untuk mengecek kesamaan?",
        options: ["=", "==", "===", "!="],
        correctAnswer: 2,
        explanation: "=== adalah strict equality operator yang mengecek nilai dan tipe data.",
      },
      {
        id: 4,
        question: "Apa hasil dari: let x=5; if(x%2===0) hasil='genap' else hasil='ganjil'",
        options: ["genap", "ganjil", "5", "error"],
        correctAnswer: 1,
        explanation: "5 dibagi 2 memiliki sisa 1, maka kondisi x%2===0 false, sehingga hasil='ganjil'.",
      },
      {
        id: 5,
        question: "Kapan else if digunakan?",
        options: [
          "Untuk kondisi tunggal",
          "Untuk mengecek kondisi tambahan",
          "Untuk perulangan",
          "Untuk deklarasi variabel",
        ],
        correctAnswer: 1,
        explanation: "Else if digunakan untuk mengecek kondisi tambahan ketika kondisi sebelumnya false.",
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
      selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer;
    
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
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  if (showResult) {
    const percentage = (score / currentQuiz.questions.length) * 100;
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto p-8 text-center space-y-6 animate-scale-in">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Kuis Selesai!</h2>
            <div className="space-y-2">
              <p className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {score} / {currentQuiz.questions.length}
              </p>
              <p className="text-muted-foreground">
                Skor Anda: {percentage.toFixed(0)}%
              </p>
            </div>
            <div className="space-y-2">
              {percentage >= 80 && (
                <p className="text-lg font-semibold text-primary">
                  🎉 Luar Biasa! Kamu sangat menguasai materi ini!
                </p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-lg font-semibold text-secondary">
                  👍 Bagus! Terus tingkatkan pemahamanmu!
                </p>
              )}
              {percentage < 60 && (
                <p className="text-lg font-semibold text-accent">
                  💪 Jangan menyerah! Coba pelajari materinya lagi!
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button variant="default" onClick={resetQuiz}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Ulangi Kuis
              </Button>
              <Link to="/materi">
                <Button variant="outline">Kembali ke Materi</Button>
              </Link>
              <Link to="/latihan">
                <Button variant="secondary">
                  Lanjut ke Latihan
                  <ArrowRight className="ml-2 h-4 w-4" />
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{currentQuiz.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Brain className="h-5 w-5" />
                <span className="font-semibold">
                  {currentQuestionIndex + 1} / {currentQuiz.questions.length}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="p-8 space-y-6 animate-scale-in">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Pertanyaan {currentQuestionIndex + 1}</p>
              <h2 className="text-2xl font-semibold">{currentQuestion.question}</h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isAnswered = answeredQuestions[currentQuestionIndex];
                const isCorrect = index === currentQuestion.correctAnswer;

                let buttonClasses = "w-full justify-start text-left p-4 h-auto transition-all duration-300";
                
                if (isAnswered) {
                  if (isCorrect) {
                    buttonClasses += " bg-primary/10 border-primary text-primary";
                  } else if (isSelected && !isCorrect) {
                    buttonClasses += " bg-destructive/10 border-destructive text-destructive";
                  }
                } else if (isSelected) {
                  buttonClasses += " border-primary bg-primary/5";
                }

                return (
                  <Button
                    key={index}
                    variant={isSelected && !isAnswered ? "default" : "outline"}
                    className={buttonClasses}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Explanation */}
            {answeredQuestions[currentQuestionIndex] && (
              <div className="p-4 bg-muted rounded-lg animate-fade-in">
                <p className="text-sm font-semibold mb-2">Penjelasan:</p>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
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
              >
                Sebelumnya
              </Button>
              
              {!answeredQuestions[currentQuestionIndex] ? (
                <Button
                  variant="default"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                >
                  Submit Jawaban
                </Button>
              ) : (
                <Button variant="default" onClick={handleNextQuestion}>
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

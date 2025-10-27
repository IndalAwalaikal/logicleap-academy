import { useState } from "react";
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
import Navbar from "@/components/Navbar";
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

// Definisikan tipe Topic
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
    tips: string[];
    resources: { title: string; url: string }[];
  };
};

// Data topik dengan penjelasan yang diperpanjang
const topics: Topic[] = [
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
        "Go, atau sering disebut Golang, adalah bahasa pemrograman open-source yang dirilis oleh Google pada tahun 2009. Bahasa ini dikembangkan oleh tim yang terdiri dari Robert Griesemer, Rob Pike, dan Ken Thompson, yang memiliki pengalaman mendesain bahasa pemrograman seperti C dan Unix. Go dirancang untuk menjawab kebutuhan pengembangan perangkat lunak modern, dengan fokus pada kesederhanaan, efisiensi, dan performa tinggi. Go menggabungkan kecepatan kompilasi yang cepat, sintaks yang mudah dipahami, dan kemampuan untuk menangani aplikasi berskala besar seperti server cloud dan sistem terdistribusi. Bahasa ini sangat populer di kalangan pengembang untuk membangun aplikasi seperti Docker, Kubernetes, dan berbagai layanan microservices karena kemampuannya dalam menangani konkurensi secara efisien melalui fitur seperti goroutine dan channel. Selain itu, Go memiliki standard library yang kaya, sehingga pengembang dapat membangun aplikasi tanpa bergantung pada banyak pustaka eksternal. Go juga mendukung garbage collection untuk manajemen memori otomatis dan memiliki pendekatan statically typed yang memastikan tipe data diperiksa saat kompilasi, mengurangi kesalahan runtime. Kesederhanaan Go terlihat dari tidak adanya fitur kompleks seperti inheritance atau exception handling berbasis try-catch, yang digantikan dengan pendekatan yang lebih eksplisit dan mudah dipahami.",
      keyPoints: [
        "Statically typed: Tipe data diperiksa saat kompilasi untuk mencegah kesalahan.",
        "Garbage collection: Manajemen memori otomatis yang efisien.",
        "Concurrency: Dukungan goroutine dan channel untuk pemrograman paralel.",
        "Kompilasi cepat: Proses kompilasi sangat cepat, mendukung pengembangan iteratif.",
        "Standard library kuat: Mendukung HTTP, JSON, file I/O tanpa dependensi eksternal.",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Selamat datang di dunia Go!")\n}`,
      tips: [
        "Gunakan gofmt untuk memformat kode secara otomatis agar konsisten.",
        "Go tidak memerlukan titik koma di akhir baris, menyederhanakan sintaks.",
        "Selalu deklarasikan package main untuk program yang dapat dieksekusi.",
      ],
      resources: [
        { title: "Dokumentasi Resmi Go", url: "https://go.dev/doc/" },
        { title: "A Tour of Go", url: "https://go.dev/tour/" },
      ],
    },
  },
  {
    id: "structure",
    title: "Struktur Dasar Program Go",
    description: "Memahami struktur dasar program Go",
    level: "beginner",
    duration: "20 menit",
    icon: FileCode,
    locked: false,
    content: {
      explanation:
        "Setiap program Go memiliki struktur dasar yang terdiri dari deklarasi package, impor pustaka, dan fungsi utama (main). Package main adalah package khusus yang menandakan bahwa program tersebut adalah executable, bukan pustaka. Fungsi main() adalah titik masuk eksekusi program, di mana kode mulai dijalankan. Go menggunakan kata kunci import untuk mengimpor pustaka, baik dari standard library (seperti fmt untuk format dan time untuk waktu) maupun pustaka eksternal. Sintaks Go dirancang sederhana: tidak memerlukan titik koma di akhir baris karena Go menggunakan newline sebagai pemisah pernyataan. Struktur file Go biasanya dimulai dengan deklarasi package, diikuti oleh impor pustaka dalam blok import, dan kemudian definisi fungsi atau variabel. Go juga mendukung pengelompokan impor dalam tanda kurung untuk kejelasan, terutama jika ada banyak pustaka yang diimpor. Selain itu, Go memiliki alat seperti gofmt yang memastikan kode diformat secara konsisten, dan go build untuk mengompilasi program. Struktur ini memungkinkan pengembang untuk menulis kode yang mudah dibaca dan dipelihara, dengan fokus pada logika program tanpa kerumitan sintaks yang tidak perlu.",
      keyPoints: [
        "package main: Mendefinisikan package utama untuk executable.",
        "import: Mengimpor pustaka seperti fmt untuk pencetakan atau time untuk waktu.",
        "func main(): Fungsi utama sebagai titik masuk program.",
        "Tidak perlu titik koma: Go menggunakan newline untuk pemisahan pernyataan.",
      ],
      example: `package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    fmt.Println("Waktu saat ini:", time.Now())\n}`,
      tips: [
        "Gunakan blok import dengan tanda kurung untuk beberapa pustaka.",
        "Package main menghasilkan file executable saat dikompilasi.",
      ],
      resources: [
        { title: "Effective Go", url: "https://go.dev/doc/effective_go" },
      ],
    },
  },
  {
    id: "variables",
    title: "Variabel dan Tipe Data",
    description: "Belajar cara menyimpan data dalam variabel",
    level: "beginner",
    duration: "20 menit",
    icon: Code,
    locked: false,
    content: {
      explanation:
        "Dalam Go, variabel digunakan untuk menyimpan data, dan Go adalah bahasa statically typed, yang berarti tipe data variabel harus ditentukan saat kompilasi, baik secara eksplisit maupun melalui type inference. Ada dua cara utama untuk mendeklarasikan variabel: menggunakan kata kunci var untuk deklarasi eksplisit (misalnya, var nama string = 'Budi') atau menggunakan operator := untuk type inference dalam fungsi (misalnya, umur := 25). Type inference memungkinkan Go secara otomatis menentukan tipe data berdasarkan nilai yang diberikan, membuat kode lebih ringkas. Go memiliki beberapa tipe data dasar, seperti int untuk bilangan bulat, float64 untuk bilangan desimal, string untuk teks, dan bool untuk nilai boolean. Setiap variabel yang dideklarasikan tanpa inisialisasi akan memiliki zero value sesuai tipenya: 0 untuk int, 0.0 untuk float64, '' untuk string, dan false untuk bool. Zero value ini memastikan bahwa tidak ada variabel yang berada dalam keadaan tidak terdefinisi, sehingga mengurangi bug. Go juga mendukung deklarasi banyak variabel sekaligus menggunakan var atau :=, serta konstanta dengan kata kunci const untuk nilai yang tidak berubah. Pemahaman tentang variabel dan tipe data sangat penting karena mereka membentuk dasar manipulasi data dalam program Go, dan pendekatan Go yang eksplisit membantu menjaga kode tetap aman dan dapat diprediksi.",
      keyPoints: [
        "Deklarasi eksplisit dengan var untuk kejelasan tipe.",
        "Type inference dengan := untuk kode yang lebih ringkas.",
        "Zero value: Nilai default untuk setiap tipe data.",
        "Tipe data dasar: int, float64, string, bool.",
      ],
      example: `package main\n\nimport "fmt"\n\nfunc main() {\n    var nama string = "Budi"\n    umur := 25\n    tinggi := 170.5\n    fmt.Printf("Nama: %s, Umur: %d, Tinggi: %.1f\\n", nama, umur, tinggi)\n}`,
      tips: [
        "Gunakan := hanya di dalam fungsi untuk type inference.",
        "Pilih nama variabel yang jelas dan deskriptif.",
      ],
      resources: [
        {
          title: "Go Variables",
          url: "https://www.w3schools.com/go/go_variables.php",
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
      <main className="flex-1 container mx-auto px-4 py-10 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#26a69a] via-[#f39c12] to-[#26a69a] bg-clip-text text-transparent mb-3">
            Penjelasan Lengkap Pemrograman Go
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
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
                  <ArrowLeft className="mr-2 h-4 w-4" /> Materi Sebelumnya
                </Button>
              ) : (
                <div className="w-[160px]" />
              )}

              {/* Tombol Kembali ke Halaman Materi */}
              <Link to="/materi" className="flex justify-center">
                <Button className="bg-[#34495e] text-[#26a69a] hover:bg-[#26a69a]/20 shadow-md">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Halaman Materi
                </Button>
              </Link>

              {/* Tombol Materi Berikutnya */}
              {topics.indexOf(selectedTopic) < topics.length - 1 ? (
                <Button
                  variant="outline"
                  className="border-[#26a69a]/40 text-[#26a69a] hover:bg-[#26a69a]/20"
                  onClick={() =>
                    setSelectedTopic(topics[topics.indexOf(selectedTopic) + 1])
                  }
                >
                  Materi Berikutnya <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="w-[160px]" />
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

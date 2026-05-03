import { Link } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Code,
  Lightbulb,
  Zap,
  Target,
  Award,
  Users,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Rocket,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

cont Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Materi Lengkap & Terstruktur",
      description:
        "Pelajari algoritma dari dasar hingga mahir dengan kurikulum yang disusun sistematis oleh para ahli",
    },
    {
      icon: Brain,
      title: "Kuis Interaktif Real-time",
      description:
        "Uji pemahamanmu dengan kuis yang menarik dan dapatkan feedback langsung untuk progress yang lebih cepat",
    },
    {
      icon: Code,
      title: "Latihan Coding Praktis",
      description:
        "Praktikkan langsung dengan editor kode dan simulasi algoritma visual yang memudahkan pemahaman",
    },
  ];

  const topics = [
    {
      icon: Lightbulb,
      title: "Variabel & Tipe Data",
      description: "Pahami cara menyimpan dan memanipulasi data dalam program",
      color: "#F39C12",
    },
    {
      icon: Zap,
      title: "Perulangan & Iterasi",
      description: "Kuasai konsep loop untuk otomasi proses dan efisiensi kode",
      color: "#26A69A",
    },
    {
      icon: Target,
      title: "Percabangan & Logika",
      description: "Belajar membuat keputusan cerdas dalam alur program",
      color: "#F39C12",
    },
    {
      icon: Rocket,
      title: "Fungsi & Prosedur",
      description:
        "Organisir kode dengan fungsi untuk program yang lebih terstruktur",
      color: "#26A69A",
    },
    {
      icon: Award,
      title: "Array & Sorting",
      description: "Mengelola kumpulan data dan teknik pengurutan efisien",
      color: "#F39C12",
    },
    {
      icon: Sparkles,
      title: "Algoritma Lanjutan",
      description: "Eksplorasi algoritma searching, rekursi, dan optimasi",
      color: "#26A69A",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Siswa Aktif",
      description: "Bergabung belajar bersama kami",
    },
    {
      icon: BookOpen,
      value: "100+",
      label: "Materi Pembelajaran",
      description: "Konten berkualitas tinggi",
    },
    {
      icon: Award,
      value: "500+",
      label: "Soal Latihan",
      description: "Untuk mengasah kemampuan",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Tingkat Kepuasan",
      description: "Dari pengguna kami",
    },
  ];

  const benefits = [
    "Akses materi kapan saja, di mana saja",
    "Progress tracking untuk monitor perkembangan",
    "Sertifikat digital setelah menyelesaikan materi",
    "Komunitas belajar yang aktif dan supportif",
    "Update materi terbaru secara berkala",
    "Gratis tanpa biaya tersembunyi",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - Enhanced */}
      <section
        className="relative overflow-hidden pt-20 pb-32"
        style={{
          background:
            "linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(243, 156, 18, 0.2)",
                border: "1px solid rgba(243, 156, 18, 0.3)",
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: "#F39C12" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "#F39C12" }}
              >
                Platform Pembelajaran #1 untuk Siswa Indonesia
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight hero-title">
              <span style={{ color: "#FFFFFF" }}>Belajar </span>
              <span style={{ color: "#F39C12" }}>Algoritma</span>
              <br />
              <span style={{ color: "#FFFFFF" }}>dengan Cara yang </span>
              <span style={{ color: "#26A69A" }}>Menyenangkan</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "#ECF0F1" }}
            >
              Platform pembelajaran interaktif yang dirancang khusus untuk siswa
              SMA/SMK. Kuasai konsep algoritma dan pemrograman dengan metode
              visual dan praktis!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/materi">
                <button className="btn-primary inline-flex items-center gap-2 text-lg">
                  <Rocket className="h-5 w-5" />
                  Mulai Belajar Gratis
                </button>
              </Link>
              <Link to="/latihan">
                <button className="btn-secondary inline-flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5" />
                  Lihat Demo
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#F39C12" }}
                >
                  10K+
                </div>
                <div className="text-sm" style={{ color: "#BDC3C7" }}>
                  Siswa Aktif
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#26A69A" }}
                >
                  100+
                </div>
                <div className="text-sm" style={{ color: "#BDC3C7" }}>
                  Materi
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#F39C12" }}
                >
                  95%
                </div>
                <div className="text-sm" style={{ color: "#BDC3C7" }}>
                  Kepuasan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20" style={{ background: "#1A252F" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Kenapa Memilih <span style={{ color: "#F39C12" }}>LogicLeap</span>
              ?
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#BDC3C7" }}
            >
              Platform pembelajaran terlengkap dengan fitur-fitur canggih untuk
              pengalaman belajar yang optimal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card p-8 rounded-xl card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: "linear-gradient(135deg, #F39C12, #E67E22)",
                  }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#ECF0F1" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section - Enhanced */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Materi yang Akan Kamu{" "}
              <span style={{ color: "#26A69A" }}>Pelajari</span>
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#ECF0F1" }}
            >
              Kurikulum lengkap dari konsep dasar hingga algoritma lanjutan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="p-6 rounded-xl transition-all duration-300 hover:scale-105 card-hover"
                style={{
                  background: "rgba(38, 166, 154, 0.1)",
                  border: "2px solid rgba(38, 166, 154, 0.3)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: topic.color }}
                >
                  <topic.icon className="h-6 w-6 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#FFFFFF" }}
                >
                  {topic.title}
                </h3>
                <p style={{ color: "#ECF0F1" }}>{topic.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/materi">
              <button className="btn-primary text-lg">
                Jelajahi Semua Materi
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-20" style={{ background: "#1A252F" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                  style={{
                    background: "linear-gradient(135deg, #26A69A, #229488)",
                  }}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div
                  className="text-4xl font-bold"
                  style={{ color: "#F39C12" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-lg font-semibold"
                  style={{ color: "#FFFFFF" }}
                >
                  {stat.label}
                </div>
                <div className="text-sm" style={{ color: "#BDC3C7" }}>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - New */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #34495E 0%, #2C3E50 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Keuntungan Belajar di{" "}
                <span style={{ color: "#F39C12" }}>LogicLeap</span>
              </h2>
              <p className="text-lg" style={{ color: "#ECF0F1" }}>
                Dapatkan pengalaman belajar terbaik dengan berbagai benefit
                eksklusif
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{ background: "rgba(38, 166, 154, 0.1)" }}
                >
                  <CheckCircle
                    className="h-6 w-6 flex-shrink-0"
                    style={{ color: "#26A69A" }}
                  />
                  <span className="text-base" style={{ color: "#ECF0F1" }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #F39C12 0%, #E67E22 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Siap Memulai Perjalanan Belajarmu?
            </h2>
            <p className="text-white/95 text-xl leading-relaxed">
              Bergabunglah dengan ribuan siswa yang sudah memulai belajar
              algoritma bersama kami. Mulai sekarang, 100% GRATIS!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/materi">
                <button
                  className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                  style={{
                    background: "#FFFFFF",
                    color: "#F39C12",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <Rocket className="h-5 w-5" />
                  Mulai Sekarang Gratis
                </button>
              </Link>
              <Link to="/tentang">
                <button
                  className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "#FFFFFF",
                    border: "2px solid white",
                  }}
                >
                  Pelajari Lebih Lanjut
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

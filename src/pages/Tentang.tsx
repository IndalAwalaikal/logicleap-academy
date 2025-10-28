import {
  Mail,
  Github,
  Instagram,
  Target,
  Users,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom"; // ✅ penting

const Tentang = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/materi");
  };

  const features = [
    {
      icon: Target,
      title: "Misi Kami",
      description:
        "Membuat pembelajaran algoritma dan pemrograman lebih mudah diakses dan menyenangkan bagi siswa SMA/SMK di seluruh Indonesia.",
    },
    {
      icon: Users,
      title: "Untuk Siapa",
      description:
        "Dirancang khusus untuk siswa SMA/SMK yang ingin memahami konsep dasar pemrograman tanpa perlu instalasi software yang rumit.",
    },
    {
      icon: Sparkles,
      title: "Metode Pembelajaran",
      description:
        "Kombinasi teori, video, dan latihan interaktif yang membuat belajar algoritma menjadi lebih engaging dan mudah dipahami.",
    },
  ];

  const team = [
    {
      name: "Tim Pengembang",
      role: "Full Stack Development",
      description:
        "Bertanggung jawab atas pengembangan platform dan fitur-fitur interaktif",
    },
    {
      name: "Tim Konten",
      role: "Content & Curriculum",
      description:
        "Menyusun materi pembelajaran yang terstruktur dan mudah dipahami",
    },
    {
      name: "Tim Desain",
      role: "UI/UX Design",
      description: "Menciptakan pengalaman belajar yang intuitif dan menarik",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-screen" style={{ background: "#0F1419" }}>
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
            <div className="max-w-4xl mx-auto text-center space-y-8">
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
                  Revolusi Pembelajaran Algoritma Indonesia
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span style={{ color: "#FFFFFF" }}>Tentang </span>
                <span style={{ color: "#F39C12" }}>LogicLeap</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
                style={{ color: "#ECF0F1" }}
              >
                Platform pembelajaran algoritma interaktif yang dibuat dengan
                dedikasi untuk memberdayakan generasi muda Indonesia di era
                digital
              </p>
            </div>
          </div>
        </section>

        {/* Story Section - Enhanced */}
        <section className="py-20" style={{ background: "#1A252F" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ color: "#FFFFFF" }}
                >
                  <span style={{ color: "#26A69A" }}>Cerita</span> Kami
                </h2>
                <div
                  className="w-24 h-1 mx-auto"
                  style={{
                    background: "linear-gradient(90deg, #F39C12, #26A69A)",
                  }}
                ></div>
              </div>

              <div
                className="p-8 md:p-12 rounded-2xl space-y-6"
                style={{
                  background: "rgba(38, 166, 154, 0.1)",
                  border: "2px solid rgba(38, 166, 154, 0.3)",
                }}
              >
                <div
                  className="space-y-5 text-lg leading-relaxed"
                  style={{ color: "#ECF0F1" }}
                >
                  <p>
                    <span style={{ color: "#F39C12", fontWeight: "bold" }}>
                      LogicLeap
                    </span>{" "}
                    lahir dari keprihatinan kami melihat banyak siswa SMA dan
                    SMK yang kesulitan memahami konsep dasar pemrograman.
                    Seringkali, materi yang ada terlalu teoritis atau terlalu
                    teknis, sehingga membuat siswa kehilangan minat sebelum
                    benar-benar memahami fundamental algoritma.
                  </p>
                  <p>
                    Kami percaya bahwa{" "}
                    <span style={{ color: "#26A69A", fontWeight: "bold" }}>
                      setiap siswa memiliki potensi
                    </span>{" "}
                    untuk menjadi programmer yang hebat. Yang mereka butuhkan
                    hanyalah platform pembelajaran yang tepat - yang menjelaskan
                    konsep dengan cara yang mudah dipahami, memberikan latihan
                    yang menarik, dan memberikan feedback yang konstruktif.
                  </p>
                  <p>
                    Dengan LogicLeap, kami berkomitmen untuk membuat
                    pembelajaran pemrograman menjadi lebih{" "}
                    <span style={{ color: "#F39C12", fontWeight: "bold" }}>
                      accessible, engaging, dan efektif
                    </span>{" "}
                    untuk generasi muda Indonesia. Platform ini sepenuhnya
                    gratis dan dapat diakses kapan saja, di mana saja.
                  </p>
                  <div
                    className="mt-8 p-6 rounded-xl"
                    style={{
                      background: "rgba(243, 156, 18, 0.1)",
                      border: "1px solid rgba(243, 156, 18, 0.3)",
                    }}
                  >
                    <p
                      className="text-center text-xl font-semibold"
                      style={{ color: "#F39C12" }}
                    >
                      "Membuat pembelajaran algoritma menjadi pengalaman yang
                      menyenangkan, bukan menjadi hambatan dalam perjalanan
                      coding."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced */}
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
                Mengapa <span style={{ color: "#F39C12" }}>LogicLeap</span>?
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#ECF0F1" }}
              >
                Berikut adalah nilai-nilai dan keunggulan yang kami tawarkan
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(38, 166, 154, 0.1)",
                    border: "2px solid rgba(38, 166, 154, 0.3)",
                  }}
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

        {/* Vision & Mission Section */}
        <section className="py-20" style={{ background: "#1A252F" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Vision */}
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(243, 156, 18, 0.1), rgba(243, 156, 18, 0.05))",
                    border: "2px solid rgba(243, 156, 18, 0.3)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: "linear-gradient(135deg, #F39C12, #E67E22)",
                    }}
                  >
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3
                    className="text-3xl font-bold mb-4"
                    style={{ color: "#F39C12" }}
                  >
                    Visi Kami
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "#ECF0F1" }}
                  >
                    Menjadi platform pembelajaran algoritma dan pemrograman
                    terdepan di Indonesia yang memberdayakan setiap siswa untuk
                    menguasai teknologi dan menciptakan masa depan digital yang
                    cerah.
                  </p>
                </div>

                {/* Mission */}
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(38, 166, 154, 0.1), rgba(38, 166, 154, 0.05))",
                    border: "2px solid rgba(38, 166, 154, 0.3)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: "linear-gradient(135deg, #26A69A, #229488)",
                    }}
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3
                    className="text-3xl font-bold mb-4"
                    style={{ color: "#26A69A" }}
                  >
                    Misi Kami
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "#ECF0F1" }}
                  >
                    Membuat pembelajaran algoritma dan pemrograman lebih mudah
                    diakses, menyenangkan, dan efektif bagi siswa SMA/SMK di
                    seluruh Indonesia melalui metode interaktif dan praktis yang
                    terbukti efektif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section - Enhanced */}
        <section
          className="py-20"
          style={{
            background: "linear-gradient(135deg, #34495E 0%, #2C3E50 100%)",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Tim <span style={{ color: "#26A69A" }}>Kami</span>
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#ECF0F1" }}
              >
                Dibangun oleh tim yang passionate tentang pendidikan dan
                teknologi
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(243, 156, 18, 0.1)",
                    border: "2px solid rgba(243, 156, 18, 0.3)",
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: "linear-gradient(135deg, #F39C12, #E67E22)",
                    }}
                  >
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="font-semibold mb-4 text-lg"
                    style={{ color: "#F39C12" }}
                  >
                    {member.role}
                  </p>
                  <p className="leading-relaxed" style={{ color: "#ECF0F1" }}>
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20" style={{ background: "#1A252F" }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Nilai-Nilai <span style={{ color: "#F39C12" }}>Kami</span>
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "#ECF0F1" }}
              >
                Prinsip yang memandu setiap langkah kami
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div
                className="p-6 rounded-xl flex items-start gap-4"
                style={{ background: "rgba(38, 166, 154, 0.1)" }}
              >
                <CheckCircle
                  className="h-8 w-8 flex-shrink-0 mt-1"
                  style={{ color: "#26A69A" }}
                />
                <div>
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    Aksesibilitas untuk Semua
                  </h4>
                  <p style={{ color: "#ECF0F1" }}>
                    Pembelajaran berkualitas harus dapat diakses oleh siapa
                    saja, kapan saja, tanpa hambatan finansial
                  </p>
                </div>
              </div>

              <div
                className="p-6 rounded-xl flex items-start gap-4"
                style={{ background: "rgba(243, 156, 18, 0.1)" }}
              >
                <CheckCircle
                  className="h-8 w-8 flex-shrink-0 mt-1"
                  style={{ color: "#F39C12" }}
                />
                <div>
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    Pembelajaran Interaktif
                  </h4>
                  <p style={{ color: "#ECF0F1" }}>
                    Belajar paling efektif ketika siswa terlibat aktif melalui
                    praktik langsung dan feedback real-time
                  </p>
                </div>
              </div>

              <div
                className="p-6 rounded-xl flex items-start gap-4"
                style={{ background: "rgba(38, 166, 154, 0.1)" }}
              >
                <CheckCircle
                  className="h-8 w-8 flex-shrink-0 mt-1"
                  style={{ color: "#26A69A" }}
                />
                <div>
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    Kualitas Konten
                  </h4>
                  <p style={{ color: "#ECF0F1" }}>
                    Setiap materi disusun dengan cermat untuk memastikan
                    pemahaman yang mendalam dan aplikatif
                  </p>
                </div>
              </div>

              <div
                className="p-6 rounded-xl flex items-start gap-4"
                style={{ background: "rgba(243, 156, 18, 0.1)" }}
              >
                <CheckCircle
                  className="h-8 w-8 flex-shrink-0 mt-1"
                  style={{ color: "#F39C12" }}
                />
                <div>
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: "#FFFFFF" }}
                  >
                    Inovasi Berkelanjutan
                  </h4>
                  <p style={{ color: "#ECF0F1" }}>
                    Kami terus berinovasi untuk menghadirkan metode pembelajaran
                    yang lebih baik dan relevan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Enhanced */}
        <section
          className="py-20"
          style={{
            background: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div
                className="p-12 rounded-2xl text-center space-y-8"
                style={{
                  background: "rgba(243, 156, 18, 0.1)",
                  border: "2px solid rgba(243, 156, 18, 0.3)",
                }}
              >
                <div className="space-y-4">
                  <h2
                    className="text-4xl md:text-5xl font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    Hubungi <span style={{ color: "#F39C12" }}>Kami</span>
                  </h2>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: "#ECF0F1" }}
                  >
                    Punya pertanyaan, saran, atau ingin berkolaborasi? <br />
                    Kami senang mendengar dari kamu!
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <a
                    href="mailto:info@logicleap.com"
                    className="p-4 rounded-xl transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Mail className="h-7 w-7" style={{ color: "#F39C12" }} />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Github className="h-7 w-7" style={{ color: "#26A69A" }} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Instagram
                      className="h-7 w-7"
                      style={{ color: "#F39C12" }}
                    />
                  </a>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleStart}
                    className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #F39C12, #E67E22)",
                      color: "#FFFFFF",
                    }}
                  >
                    <Target className="h-5 w-5" />
                    Mulai Belajar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Tentang;

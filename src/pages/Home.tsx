import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Code, Lightbulb, Zap, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Materi Lengkap",
      description: "Pelajari konsep algoritma dari dasar dengan penjelasan yang mudah dipahami",
      color: "text-primary",
    },
    {
      icon: Brain,
      title: "Kuis Interaktif",
      description: "Uji pemahamanmu dengan kuis yang menarik dan menantang",
      color: "text-secondary",
    },
    {
      icon: Code,
      title: "Latihan Praktis",
      description: "Praktikkan langsung dengan editor kode simulasi",
      color: "text-accent",
    },
  ];

  const topics = [
    {
      icon: Lightbulb,
      title: "Variabel",
      description: "Pahami cara menyimpan dan menggunakan data",
    },
    {
      icon: Zap,
      title: "Perulangan",
      description: "Kuasai konsep loop untuk otomasi proses",
    },
    {
      icon: Target,
      title: "Kondisi",
      description: "Belajar membuat keputusan dalam program",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Belajar Algoritma dengan Cara{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Seru & Interaktif
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Platform pembelajaran algoritma pemrograman yang dirancang khusus untuk siswa SMA/SMK. 
                Belajar konsep dasar hingga mahir dengan metode yang menyenangkan!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/materi">
                  <Button variant="hero" size="lg" className="group">
                    Mulai Belajar Sekarang
                    <BookOpen className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/tentang">
                  <Button variant="outline" size="lg">
                    Tentang Platform
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src={heroImage}
                alt="Siswa belajar programming"
                className="rounded-2xl shadow-card w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kenapa Memilih CodeSmart?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami menyediakan pengalaman belajar yang komprehensif dan menyenangkan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Topik yang Akan Kamu Pelajari
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mulai dari konsep dasar hingga aplikasi praktis
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="p-6 border-2 border-border rounded-xl hover:border-primary hover:shadow-soft transition-all duration-300"
              >
                <topic.icon className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/materi">
              <Button variant="default" size="lg">
                Lihat Semua Materi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Siap Memulai Perjalanan Belajarmu?
            </h2>
            <p className="text-white/90 text-lg">
              Bergabunglah dengan ribuan siswa yang sudah memulai belajar algoritma bersama kami!
            </p>
            <Link to="/materi">
              <Button variant="secondary" size="lg" className="shadow-card">
                Mulai Sekarang Gratis!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

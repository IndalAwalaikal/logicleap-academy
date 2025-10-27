import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Github, Instagram, Target, Users, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Tentang = () => {
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
      description: "Bertanggung jawab atas pengembangan platform dan fitur-fitur interaktif",
    },
    {
      name: "Tim Konten",
      role: "Content & Curriculum",
      description: "Menyusun materi pembelajaran yang terstruktur dan mudah dipahami",
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-5xl font-bold text-white">Tentang LogicLeap</h1>
            <p className="text-white/90 text-lg">
              Platform pembelajaran algoritma interaktif yang dibuat dengan cinta untuk pendidikan Indonesia
            </p>
          </div>
        </div>
      </section>

      <div className="flex-1 container mx-auto px-4 py-16">
        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20 animate-slide-up">
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                LogicLeap lahir dari keprihatinan kami melihat banyak siswa SMA dan SMK yang kesulitan 
                memahami konsep dasar pemrograman. Seringkali, materi yang ada terlalu teoritis atau 
                terlalu teknis, sehingga membuat siswa kehilangan minat sebelum benar-benar memahami 
                fundamental algoritma.
              </p>
              <p>
                Kami percaya bahwa setiap siswa memiliki potensi untuk menjadi programmer yang hebat. 
                Yang mereka butuhkan hanyalah platform pembelajaran yang tepat - yang menjelaskan 
                konsep dengan cara yang mudah dipahami, memberikan latihan yang menarik, dan 
                memberikan feedback yang konstruktif.
              </p>
              <p>
                Dengan LogicLeap, kami berkomitmen untuk membuat pembelajaran pemrograman menjadi 
                lebih accessible, engaging, dan efektif untuk generasi muda Indonesia. Platform ini 
                sepenuhnya gratis dan dapat diakses kapan saja, di mana saja.
              </p>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Mengapa LogicLeap?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Berikut adalah nilai-nilai dan keunggulan yang kami tawarkan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dibangun oleh tim yang passionate tentang pendidikan dan teknologi
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-6 text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto animate-fade-in">
          <Card className="p-8 text-center space-y-6">
            <h2 className="text-3xl font-bold">Hubungi Kami</h2>
            <p className="text-muted-foreground">
              Punya pertanyaan, saran, atau ingin berkolaborasi? Kami senang mendengar dari kamu!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:info@LogicLeap.com"
                className="p-3 bg-card hover:bg-primary hover:text-white rounded-lg transition-all duration-300 shadow-soft hover:shadow-card"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-primary hover:text-white rounded-lg transition-all duration-300 shadow-soft hover:shadow-card"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-primary hover:text-white rounded-lg transition-all duration-300 shadow-soft hover:shadow-card"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="pt-4">
              <Link to="/materi">
                <Button variant="hero" size="lg">
                  Mulai Belajar Sekarang
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tentang;

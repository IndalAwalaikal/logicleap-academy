import { Code2, Github, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                CodeSmart
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform pembelajaran algoritma interaktif untuk siswa SMA/SMK
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Navigasi Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/materi" className="text-muted-foreground hover:text-primary transition-colors">
                  Materi
                </Link>
              </li>
              <li>
                <Link to="/kuis" className="text-muted-foreground hover:text-primary transition-colors">
                  Kuis
                </Link>
              </li>
              <li>
                <Link to="/latihan" className="text-muted-foreground hover:text-primary transition-colors">
                  Latihan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Hubungi Kami</h3>
            <div className="flex gap-3">
              <a
                href="mailto:info@codesmart.com"
                className="p-2 bg-card hover:bg-primary hover:text-white rounded-lg transition-all duration-300 shadow-soft"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-card hover:bg-primary hover:text-white rounded-lg transition-all duration-300 shadow-soft"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-card hover:bg-primary hover:text-white rounded-lg transition-all duration-300 shadow-soft"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} CodeSmart. Dibuat dengan ❤️ untuk pendidikan Indonesia.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Code2, Github, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Materi", path: "/materi" },
    { name: "Kuis", path: "/kuis" },
    { name: "Latihan", path: "/latihan" },
    { name: "Tentang", path: "/tentang" },
  ];

  return (
    <footer 
      className="border-t mt-20" 
      style={{ 
        background: '#1A252F',
        borderColor: '#34495E'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div 
                className="p-2 rounded-lg" 
                style={{ background: '#F39C12' }}
              >
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span 
                className="text-lg font-bold" 
                style={{ color: '#F39C12' }}
              >
                CodeSmart
              </span>
            </Link>
            <p 
              className="text-sm leading-relaxed" 
              style={{ color: '#BDC3C7' }}
            >
              Platform pembelajaran algoritma interaktif untuk siswa SMA/SMK Indonesia. 
              Belajar coding dengan cara yang menyenangkan dan mudah dipahami.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 
              className="font-semibold mb-4 text-base" 
              style={{ color: '#FFFFFF' }}
            >
              Navigasi Cepat
            </h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-sm transition-colors inline-block hover:translate-x-1 duration-300"
                    style={{ color: '#BDC3C7' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#F39C12';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#BDC3C7';
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 
              className="font-semibold mb-4 text-base" 
              style={{ color: '#FFFFFF' }}
            >
              Hubungi Kami
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: '#BDC3C7' }}
            >
              Punya pertanyaan atau saran? Hubungi kami melalui:
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:info@codesmart.com"
                className="p-2.5 rounded-lg transition-all duration-300"
                style={{ background: '#26A69A' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F39C12';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#26A69A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Email CodeSmart"
                title="Email"
              >
                <Mail className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg transition-all duration-300"
                style={{ background: '#26A69A' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F39C12';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#26A69A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="GitHub CodeSmart"
                title="GitHub"
              >
                <Github className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg transition-all duration-300"
                style={{ background: '#26A69A' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F39C12';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#26A69A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Instagram CodeSmart"
                title="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div 
          className="mt-8 pt-6 border-t text-center" 
          style={{ 
            borderColor: '#34495E'
          }}
        >
          <p 
            className="text-sm"
            style={{ color: '#BDC3C7' }}
          >
            &copy; {currentYear} CodeSmart. Dibuat dengan{" "}
            <span style={{ color: '#F39C12' }}>❤️</span> untuk pendidikan Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  AlertCircle,
  ArrowLeft,
  Search,
  Compass,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-96 h-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
              top: "-10%",
              left: "-10%",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-96 h-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
              bottom: "-10%",
              right: "-10%",
              animation: "float 10s ease-in-out infinite",
              animationDelay: "2s",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* 404 Icon */}
          <div className="mb-8 animate-bounce-slow">
            <div className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center bg-gray-800/40 backdrop-blur-lg border border-blue-500/30 shadow-2xl">
              <AlertCircle className="w-16 h-16 text-red-400" />
            </div>
          </div>

          {/* 404 Text */}
          <h1
            className="text-7xl md:text-8xl font-extrabold mb-4 tracking-tight"
            style={{
              background:
                "linear-gradient(to right, #ff6b6b, #feca57, #48dbfb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              animation: "glitch 3s infinite",
            }}
          >
            404
          </h1>

          {/* Message Card */}
          <div className="mb-6 p-6 rounded-2xl bg-gray-800/30 backdrop-blur-lg border border-blue-500/20 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Halaman Tidak Ditemukan!
            </h2>
            <p className="text-lg text-gray-200 mb-2">
              Rute yang kamu tuju tidak tersedia di Go Playground.
            </p>
            <p className="text-sm text-gray-400">
              Path:{" "}
              <code className="bg-gray-900/50 px-2 py-1 rounded text-blue-300">
                {location.pathname}
              </code>
            </p>
          </div>

          {/* Countdown Bar */}
          <div className="mb-8">
            <p className="text-gray-200 text-lg mb-2">
              Redirect otomatis dalam{" "}
              <span className="font-bold text-2xl text-white">{countdown}</span>{" "}
              detik...
            </p>
            <div className="w-full h-2.5 rounded-full bg-gray-700/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${(countdown / 10) * 100}%`,
                  background:
                    "linear-gradient(90deg, #26A69A 0%, #F39C12 100%)",
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #26A69A 0%, #229488 100%)",
                color: "#FFFFFF",
              }}
            >
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Kembali ke Beranda
            </button>

            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              style={{
                background: "rgba(38, 166, 154, 0.15)",
                border: "1px solid rgba(38, 166, 154, 0.4)",
                color: "#ECF0F1",
              }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Halaman Sebelumnya
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-6">
            <p className="text-gray-400 mb-3 text-sm">Mungkin kamu mencari:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: "Beranda", path: "/" },
                { label: "Materi", path: "/materi" },
                { label: "Latihan", path: "/latihan" },
                { label: "Tentang", path: "/tentang" },
              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-200 transition-all duration-300 hover:scale-105 hover:text-white"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Decorative Icons */}
          <div className="mt-8 flex justify-center gap-4 opacity-40">
            <Search className="w-6 h-6 text-blue-300 animate-pulse" />
            <Compass className="w-6 h-6 text-cyan-300 animate-spin-slow" />
            <Zap
              className="w-6 h-6 text-yellow-300 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes glitch {
          0%,
          90%,
          100% {
            transform: translateX(0);
          }
          92% {
            transform: translateX(-2px);
          }
          94% {
            transform: translateX(2px);
          }
          96% {
            transform: translateX(-2px);
          }
          98% {
            transform: translateX(2px);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Materi from "./pages/Materi";
import Kuis from "./pages/Kuis";
import Latihan from "./pages/Latihan";
import RobotMissionGame from "./pages/Games";
import Tentang from "./pages/Tentang";
import PenjelasanLengkap from "./pages/MateriLengkap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/materi-lengkap" element={<PenjelasanLengkap />} />
          <Route path="/kuis" element={<Kuis />} />
          <Route path="/latihan" element={<Latihan />} />
          <Route path="/games" element={<RobotMissionGame />} />
          <Route path="/tentang" element={<Tentang />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvier>
  </QueryClientProvider>
);

export default App;

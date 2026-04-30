import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./components/About";
import Schedule from "./components/Schedule";
import Speakers from "./components/Speakers";
import Team from "./components/Team";
import Gallery from "./components/Gallery";
import Sponsors from "./components/Sponsors";
import FAQ from "./components/FAQ";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter  basename={import.meta.env.BASE_URL}>
          <div className="min-h-screen flex flex-col bg-[#05070D]">

      <Navbar />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/team" element={<Team />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
</main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}
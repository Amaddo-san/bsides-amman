import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AbbasCursor from "./components/AbbasCursor";

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

function AboutOnHomePage() {
  useEffect(() => {
    requestAnimationFrame(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return <HomePage />;
}

export default function App() {
  return (
    <BrowserRouter >
          <div className="min-h-screen flex flex-col bg-[#05070D]">

      <AbbasCursor />
      <Navbar />
    <main className="flex flex-1 flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutOnHomePage />} />
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

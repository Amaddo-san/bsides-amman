import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import { routeScrollTarget } from './navigation';

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

function ScrollReset() {
  const { pathname, search, hash, key } = useLocation();
  const action = useNavigationType();
  const previous = useRef(null);
  const positions = useRef(new Map());

  useLayoutEffect(() => {
    const entryKey = JSON.stringify([key, pathname, search, hash]);
    const target = routeScrollTarget({
      pathname, hash, action, saved: positions.current.get(entryKey),
      initial: previous.current === null,
      pageChanged: previous.current?.pathname !== pathname,
      documentNavigation: performance.getEntriesByType('navigation')[0]?.type,
    });
    previous.current = { pathname, key };
    // Resolve page-style navigation after the route commit but before paint.
    // 'instant' also prevents the global smooth-scroll CSS from animating resets.
    if (target?.position) window.scrollTo({ ...target.position, behavior: 'instant' });
    if (target?.anchor) document.getElementById(target.anchor)?.scrollIntoView({ block: target.block, behavior: 'instant' });

    const remember = () => positions.current.set(entryKey, { left: window.scrollX, top: window.scrollY });
    remember();
    window.addEventListener('scroll', remember, { passive: true });
    // Retain the last observed position; reading during unmount could record a
    // position already clamped to the height of the incoming page.
    return () => window.removeEventListener('scroll', remember);
  }, [pathname, search, hash, key, action]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter >
          <div className="site-shell min-h-screen flex flex-col bg-[#05070D]">

      <AbbasCursor />
      <ScrollReset />
      <Navbar />
    <main className="flex flex-1 flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
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

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isSchedulePath } from '../navigation';

const SCRIPT_ID = "abbas-oneko-script";

export default function AbbasCursor() {
  const { pathname } = useLocation();
  const scheduleActive = isSchedulePath(pathname);
  useEffect(() => {
    // The agenda has its own Abbas; a second cursor mascot would cross its text.
    if (scheduleActive) return;
    const removeAbbas = () => {
      window.__ABBAS_ONEKO__?.destroy?.();
      document.getElementById(SCRIPT_ID)?.remove();
    };

    const loadAbbas = () => {
      if (document.getElementById(SCRIPT_ID)) return;

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "/oneko/oneko.js";
      script.async = true;
      // A fast route change can finish before this asynchronous script loads.
      script.onload = () => { if (document.getElementById('schedule')) removeAbbas(); };
      document.body.appendChild(script);
    };

    loadAbbas();

    return () => {
      removeAbbas();
    };
  }, [scheduleActive]);

  return null;
}

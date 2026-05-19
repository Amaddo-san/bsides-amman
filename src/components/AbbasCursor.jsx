import { useEffect } from "react";

const SCRIPT_ID = "abbas-oneko-script";

export default function AbbasCursor() {
  useEffect(() => {
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
      document.body.appendChild(script);
    };

    loadAbbas();

    return () => {
      removeAbbas();
    };
  }, []);

  return null;
}

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { finalSection } from "../data/final";
import "./FinalSection.css";

export default function FinalSection() {
  const [showPs, setShowPs] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShowPs(true), reduce ? 300 : 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <footer id="final" className="section final">
      <div className="final__halo" aria-hidden="true" />
      <div className="final__rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="section-inner final__inner">
        <h2 className="final__title font-script reveal">{finalSection.title}</h2>

        <p className="final__text reveal" style={{ "--reveal-delay": "150ms" }}>
          {finalSection.text}
        </p>

        <p className="final__sign font-script reveal" style={{ "--reveal-delay": "320ms" }}>
          — {finalSection.signature}
        </p>

        {showPs && (
          <div className="final__ps fade-in">
            <span className="final__ps-label">{finalSection.postscript.label}</span>
            <p className="final__ps-text">{finalSection.postscript.text}</p>
          </div>
        )}

        <button
          className="btn btn--ghost final__back"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={15} strokeWidth={1.6} />
          Volver al inicio
        </button>
      </div>
    </footer>
  );
}

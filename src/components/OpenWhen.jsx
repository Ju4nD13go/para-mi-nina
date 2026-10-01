import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { openWhenCards, openWhenSection } from "../data/openWhen";
import { useBodyLock } from "../hooks";
import "./OpenWhen.css";

export default function OpenWhen() {
  const [openId, setOpenId] = useState(null);
  const closeRef = useRef(null);

  useBodyLock(openId !== null);

  const active = openWhenCards.find((c) => c.id === openId) || null;

  useEffect(() => {
    if (active) closeRef.current?.focus();
  }, [active]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenId(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="abre" className="section open-when">
      <div className="section-inner">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">{openWhenSection.eyebrow}</span>
          <h2 className="title-script">{openWhenSection.title}</h2>
          <p className="lead">{openWhenSection.lead}</p>
        </div>

        <div className="open-when__grid">
          {openWhenCards.map((card, i) => (
            <button
              key={card.id}
              className="ow-card reveal"
              style={{ "--reveal-delay": `${(i % 3) * 100}ms` }}
              onClick={() => setOpenId(card.id)}
              aria-haspopup="dialog"
            >
              <span className="ow-card__emoji" aria-hidden="true">
                {card.emoji}
              </span>
              <span className="ow-card__title">{card.title}</span>
              <span className="ow-card__cta">abrir</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Modal ---------- */}
      {active && (
        <div
          className="ow-modal"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => e.target === e.currentTarget && setOpenId(null)}
        >
          <div className="ow-modal__card fade-in">
            <button
              ref={closeRef}
              className="ow-modal__close"
              onClick={() => setOpenId(null)}
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>

            <span className="ow-modal__emoji" aria-hidden="true">
              {active.emoji}
            </span>
            <h3 className="ow-modal__title font-script">{active.title}</h3>
            <p className="ow-modal__text">{active.text}</p>
            <span className="ow-modal__sign font-script">Te amo</span>
          </div>
        </div>
      )}
    </section>
  );
}

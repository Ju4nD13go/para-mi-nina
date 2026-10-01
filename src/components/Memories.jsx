import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memories, memoriesSection } from "../data/memories";
import "./Memories.css";

export default function Memories() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const touch = useRef({ x: 0, y: 0, active: false });
  const total = memories.length;

  const go = useCallback(
    (next, direction) => {
      setDir(direction);
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  // Navegación con teclado
  useEffect(() => {
    const onKey = (e) => {
      const el = document.getElementById("recuerdos");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const visible = r.top < window.innerHeight * 0.6 && r.bottom > 0;
      if (!visible) return;
      if (e.key === "ArrowRight") go(index + 1, 1);
      if (e.key === "ArrowLeft") go(index - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, active: true };
  };

  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }
    touch.current.active = false;
  };

  return (
    <section id="recuerdos" className="section memories">
      <div className="section-inner">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">{memoriesSection.eyebrow}</span>
          <h2 className="title-script">{memoriesSection.title}</h2>
          <p className="lead">{memoriesSection.lead}</p>
        </div>

        <div className="polaroid reveal" style={{ "--reveal-delay": "120ms" }}>
          <div
            className="polaroid__viewport"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="polaroid__track"
              style={{
                transform: `translate3d(calc(-${index} * (var(--card-w) + var(--gap)) + var(--pad)), 0, 0)`,
                transitionDuration: dir === 0 ? "0s" : undefined,
              }}
            >
              {memories.map((m, i) => (
                <figure
                  key={m.id}
                  className={`polaroid__item ${i === index ? "is-active" : ""}`}
                  style={{ "--rotate": `${m.rotate ?? 0}deg` }}
                  aria-hidden={i !== index}
                >
                  {/* 👉 FOTO — reemplaza `src` en src/data/memories.js */}
                  <div className="polaroid__frame">
                    <img
                      src={m.src}
                      alt={m.alt || m.title}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <span className="polaroid__shine" />
                  </div>
                  <figcaption className="polaroid__cap">
                    <h3 className="polaroid__title font-script">{m.title}</h3>
                    {m.date && <span className="polaroid__date">{m.date}</span>}
                    <p className="polaroid__text">{m.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="polaroid__controls">
            <button
              className="polaroid__arrow"
              onClick={() => go(index - 1, -1)}
              aria-label="Recuerdo anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="polaroid__dots" role="tablist" aria-label="Recuerdos">
              {memories.map((m, i) => (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ver recuerdo ${i + 1}: ${m.title}`}
                  className={`polaroid__dot ${i === index ? "is-active" : ""}`}
                  onClick={() => go(i, i > index ? 1 : -1)}
                />
              ))}
            </div>

            <button
              className="polaroid__arrow"
              onClick={() => go(index + 1, 1)}
              aria-label="Recuerdo siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="polaroid__swipe-hint">desliza para ver más</p>
        </div>
      </div>
    </section>
  );
}

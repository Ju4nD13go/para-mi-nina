import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { letter } from "../data/letter";
import "./LoveLetter.css";

const STEP = 380;
const FIRST = 220;

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [page, setPage] = useState(0);

  const total = letter.pages.length;
  const isLast = page === total - 1;
  const lines = letter.pages[page].lines;
  const signDelay = FIRST + lines.length * STEP + 180;

  const open = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setShowLetter(true), 950);
  };

  const close = useCallback(() => {
    setShowLetter(false);
    setTimeout(() => {
      setOpened(false);
      setPage(0);
    }, 500);
  }, []);

  const next = useCallback(
    () => setPage((p) => Math.min(p + 1, total - 1)),
    [total]
  );

  const prev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);

  // Navegación con teclado mientras la carta está abierta
  useEffect(() => {
    if (!showLetter) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showLetter, next, prev, close]);

  return (
    <section id="carta" className="section letter-section">
      <div className="section-inner letter-section__inner">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Lo primero</span>
          <h2 className="title-script">Una carta para ti</h2>
        </div>

        {!opened && (
          <div
            className="envelope-stage reveal"
            style={{ "--reveal-delay": "120ms" }}
          >
            <p className="envelope-stage__lead">
              Antes de todo lo demás, tengo algo que decirte.
            </p>

            <button
              className="envelope"
              onClick={open}
              aria-label={`${letter.envelope.button} — ${letter.envelope.greeting}`}
            >
              <span className="envelope__glow" />
              <span className="envelope__back" />
              <span className="envelope__card">
                <span className="envelope__card-name font-script">
                  {letter.envelope.greeting}
                </span>
                <span className="envelope__card-hint">
                  algo que leíste hace mil veces
                </span>
              </span>
              <span className="envelope__front">
                <span className="envelope__front-inner">
                  <span className="envelope__greeting font-script">
                    {letter.envelope.greeting}
                  </span>
                  <span className="envelope__seal" aria-hidden="true">
                    {letter.envelope.seal}
                  </span>
                </span>
              </span>
            </button>

            <button
              className="btn btn--primary envelope-stage__btn"
              onClick={open}
            >
              {letter.envelope.button}
            </button>
            <span className="envelope-stage__hint">
              {letter.envelope.hint}
            </span>
          </div>
        )}

        {opened && (
          <div className="letter-wrap">
            <div className={`letter ${showLetter ? "is-open" : ""}`}>
              <button
                className="letter__close"
                onClick={close}
                aria-label="Cerrar la carta"
                tabIndex={showLetter ? 0 : -1}
              >
                <X size={16} />
              </button>

              <div className="letter__head">
                <span className="letter__head-tag">{letter.title}</span>
              </div>

              <div className="letter__body" key={page}>
                {lines.map((line, i) => (
                  <p
                    key={i}
                    className={`letter__line ${
                      i === 0 ? "letter__line--lead" : ""
                    }`}
                    style={{ "--line-delay": `${FIRST + i * STEP}ms` }}
                  >
                    {line}
                  </p>
                ))}

                {isLast && (
                  <>
                    <div
                      className="letter__sign"
                      style={{ "--line-delay": `${signDelay}ms` }}
                    >
                      <span className="letter__sign-line" />
                      <span className="letter__sign-name font-script">
                        {letter.signature}
                      </span>
                    </div>
                    <p
                      className="letter__ps"
                      style={{ "--line-delay": `${signDelay + 420}ms` }}
                    >
                      {letter.postscript}
                    </p>
                  </>
                )}
              </div>

              <div className="letter__nav">
                <button
                  className="letter__arrow"
                  onClick={prev}
                  disabled={page === 0}
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={18} />
                </button>

                <div
                  className="letter__dots"
                  role="tablist"
                  aria-label="Páginas de la carta"
                >
                  {letter.pages.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === page}
                      aria-label={`Ir a la página ${i + 1}`}
                      className={`letter__dot ${i === page ? "is-active" : ""}`}
                      onClick={() => setPage(i)}
                    />
                  ))}
                </div>

                <button
                  className="letter__arrow"
                  onClick={isLast ? close : next}
                  aria-label={isLast ? "Terminar la carta" : "Página siguiente"}
                >
                  {isLast ? <Heart size={16} /> : <ChevronRight size={18} />}
                </button>
              </div>

              <p className="letter__counter">
                {page + 1} / {total}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

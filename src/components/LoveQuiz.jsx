import { useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { quizQuestions, quizSection, results } from "../data/quiz";
import "./LoveQuiz.css";

/** Índice de la opción marcada como correcta con `ok: true`. */
const indiceCorrecto = (q) => q.options.findIndex((o) => o.ok);

const getResult = (score) =>
  results.find((r) => score >= r.min) ?? results[results.length - 1];

/* En desarrollo te avisamos si una pregunta quedó mal configurada,
   en vez de dejarte un quiz que falla sin que se note. */
if (import.meta.env.DEV) {
  quizQuestions.forEach((q, n) => {
    const cuantas = q.options.filter((o) => o.ok).length;
    if (cuantas !== 1) {
      console.warn(
        `[quiz] La pregunta ${n + 1} ("${q.question}") tiene ${cuantas} ` +
          `respuestas correctas. Debe tener exactamente una con { ok: true }.`
      );
    }
    if (q.options.length < 2) {
      console.warn(`[quiz] La pregunta ${n + 1} ("${q.question}") tiene menos de 2 opciones.`);
    }
  });
}

export default function LoveQuiz() {
  const [phase, setPhase] = useState("idle"); // idle | play | result
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);

  const question = quizQuestions[qIndex];
  const total = quizQuestions.length;
  const answer = indiceCorrecto(question);
  const answered = picked !== null;
  const isCorrect = answered && picked === answer;

  const start = () => {
    setPhase("play");
    setQIndex(0);
    setPicked(null);
    setScore(0);
  };

  const pick = (i) => {
    if (answered) return;
    setPicked(i);
    if (i === answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (qIndex + 1 >= total) {
      setPhase("result");
      return;
    }
    setQIndex((i) => i + 1);
    setPicked(null);
  };

  const progress = ((qIndex + (answered ? 1 : 0)) / total) * 100;
  const finalResult = phase === "result" ? getResult(score) : null;

  return (
    <section id="quiz" className="section quiz">
      <div className="section-inner">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">{quizSection.eyebrow}</span>
          <h2 className="title-script">{quizSection.title}</h2>
          <p className="lead">{quizSection.lead}</p>
        </div>

        <div className="quiz__stage reveal" style={{ "--reveal-delay": "120ms" }}>
          {/* ---------- Pantalla inicial ---------- */}
          {phase === "idle" && (
            <div className="quiz__intro fade-in">
              <span className="quiz__intro-badge">{total} preguntas</span>
              <p className="quiz__intro-text">{quizSection.intro}</p>
              <button className="btn btn--primary" onClick={start}>
                {quizSection.start}
                <ArrowRight size={15} strokeWidth={1.6} />
              </button>
            </div>
          )}

          {/* ---------- Preguntas ---------- */}
          {phase === "play" && (
            <div className="quiz__play fade-in" key={qIndex}>
              <div className="quiz__bar">
                <span className="quiz__bar-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="quiz__meta">
                <span>
                  {qIndex + 1} / {total}
                </span>
                <span className="quiz__score">
                  <Check size={12} strokeWidth={2} /> {score}
                </span>
              </div>

              <h3 className="quiz__question">{question.question}</h3>

              <ul className="quiz__options">
                {question.options.map((opt, i) => {
                  const state = !answered
                    ? ""
                    : i === answer
                    ? "is-correct"
                    : i === picked
                    ? "is-wrong"
                    : "is-dim";
                  return (
                    <li key={i}>
                      <button
                        className={`quiz__option ${state}`}
                        onClick={() => pick(i)}
                        disabled={answered}
                      >
                        <span className="quiz__option-key">
                          {answered && i === answer ? (
                            <Check size={14} strokeWidth={2.4} />
                          ) : answered && i === picked ? (
                            <X size={14} strokeWidth={2.4} />
                          ) : (
                            String.fromCharCode(65 + i)
                          )}
                        </span>
                        <span className="quiz__option-text">{opt.t}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {answered && (
                <div className={`quiz__feedback fade-in ${isCorrect ? "is-ok" : "is-no"}`}>
                  <p className="quiz__feedback-main">
                    {isCorrect ? quizSection.correct : quizSection.wrong}
                  </p>
                  {(isCorrect ? question.correct : question.wrong) && (
                    <p className="quiz__feedback-sub">
                      {isCorrect ? question.correct : question.wrong}
                    </p>
                  )}
                  <button className="btn btn--primary quiz__next" onClick={next}>
                    {qIndex + 1 >= total ? quizSection.seeResult : quizSection.next}
                    <ArrowRight size={15} strokeWidth={1.6} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ---------- Resultado ---------- */}
          {phase === "result" && finalResult && (
            <div className="quiz__result fade-in">
              <span className="quiz__result-emoji">{finalResult.emoji}</span>
              <p className="quiz__result-label">Resultado</p>
              <p className="quiz__result-score">
                <span className="font-script">{score}</span> / {total}
              </p>
              <h3 className="quiz__result-title">{finalResult.title}</h3>
              <p className="quiz__result-text">{finalResult.text}</p>
              <div className="quiz__result-bar" aria-hidden="true">
                <span style={{ width: `${(score / total) * 100}%` }} />
              </div>
              <button className="btn btn--ghost" onClick={start}>
                <RotateCcw size={15} strokeWidth={1.6} />
                {quizSection.restart}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

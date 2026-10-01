import { ArrowDown } from "lucide-react";
import { site } from "../data/site";
import "./Hero.css";

export default function Hero({ onEnter, entered }) {
  const goLetter = () => {
    onEnter();
    setTimeout(() => {
      document.getElementById("carta")?.scrollIntoView({ behavior: "smooth" });
    }, 620);
  };

  return (
    <section className={`hero ${entered ? "is-entered" : ""}`}>
      <div className="hero__content">
        <p className="hero__eyebrow fade-in">{site.introLine}</p>

        <h1 className="hero__title font-script fade-in" style={{ animationDelay: "150ms" }}>
          {site.title}
        </h1>

        <p className="hero__sub fade-in" style={{ animationDelay: "320ms" }}>
          {site.subtitle}
        </p>

        <div className="hero__actions fade-in" style={{ animationDelay: "520ms" }}>
          <button className="btn btn--primary" onClick={goLetter}>
            {site.enterButton}
            <ArrowDown size={15} strokeWidth={1.6} />
          </button>
        </div>

        <p className="hero__hint fade-in" style={{ animationDelay: "760ms" }}>
          Hay cosas aquí que solo existen para ti
        </p>
      </div>

      <div className="hero__scroll fade-in" style={{ animationDelay: "1000ms" }}>
        <span className="hero__scroll-line" />
        <span className="hero__scroll-txt">desliza</span>
      </div>
    </section>
  );
}

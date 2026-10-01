import { loveCards, loveSection } from "../data/loveCards";
import { getIcon } from "../data/icons";
import "./LoveCards.css";

export default function LoveCards() {
  return (
    <section id="amo" className="section love-cards">
      <div className="section-inner">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">{loveSection.eyebrow}</span>
          <h2 className="title-script">{loveSection.title}</h2>
          <p className="lead">{loveSection.lead}</p>
        </div>

        <div className="love-cards__grid">
          {loveCards.map((card, i) => {
            const Icon = getIcon(card.icon);
            return (
              <article
                key={card.id}
                className="love-card reveal"
                style={{ "--reveal-delay": `${(i % 4) * 90}ms` }}
              >
                <span className="love-card__icon">
                  <Icon size={19} strokeWidth={1.4} />
                </span>
                <h3 className="love-card__title">{card.title}</h3>
                <p className="love-card__text">{card.text}</p>
                <span className="love-card__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

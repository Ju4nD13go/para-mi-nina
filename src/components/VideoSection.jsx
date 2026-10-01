import { useState } from "react";
import { Play } from "lucide-react";
import { videoSection } from "../data/video";
import "./VideoSection.css";

export default function VideoSection() {
  const [started, setStarted] = useState(false);
  const {
    src,
    embedId,
    provider,
    poster,
    caption,
    aspectRatio = 16 / 9,
  } = videoSection;

  const hasEmbed = Boolean(embedId);
  const hasFile = Boolean(src);
  const isReady = hasEmbed || hasFile;

  const embedUrl = () => {
    if (provider === "vimeo") return `https://player.vimeo.com/video/${embedId}?autoplay=1&dnt=1`;
    return `https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0&modestbranding=1`;
  };

  return (
    <section id="video" className="section video-section">
      <div className="section-inner">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">{videoSection.eyebrow}</span>
          <h2 className="title-script">{videoSection.title}</h2>
          <p className="lead">{videoSection.lead}</p>
        </div>

        <div
          className="video-frame reveal"
          style={{
            "--reveal-delay": "120ms",
            "--ratio": aspectRatio,
          }}
        >
          <div className="video-frame__glow" />

          {!isReady ? (
            <div className="video-frame__empty">
              <span className="video-frame__empty-emoji" aria-hidden="true">
                🎬
              </span>
              <p className="video-frame__empty-title">Aquí va nuestro video</p>
              <p className="video-frame__empty-text">
                Sube tu archivo a <code>public/media/</code> y pon su nombre en{" "}
                <code>src/data/video.js</code>.
              </p>
            </div>
          ) : !started ? (
            <button
              className="video-frame__poster"
              onClick={() => setStarted(true)}
              style={poster ? { backgroundImage: `url(${poster})` } : undefined}
              aria-label="Reproducir el video"
            >
              <span className="video-frame__play">
                <Play size={22} fill="currentColor" strokeWidth={0} />
              </span>
              <span className="video-frame__play-label">Dale play</span>
            </button>
          ) : hasEmbed ? (
            <div className="video-frame__embed">
              <iframe
                src={embedUrl()}
                title="Nuestro video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <video
              className="video-frame__video"
              src={src}
              poster={poster || undefined}
              controls
              playsInline
              preload="metadata"
            />
          )}
        </div>

        {caption && <p className="video-section__caption reveal">{caption}</p>}
      </div>
    </section>
  );
}

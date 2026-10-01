import { useEffect, useRef, useState } from "react";
import { Pause, Play, TriangleAlert } from "lucide-react";
import { song } from "../data/song";
import "./MusicPlayer.css";

/**
 * Reproductor de nuestra canción.
 * Nunca arranca solo: siempre espera a que ella lo pulse.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  // Si apagas la canción, se desactiva el botón.
  const activo = song.enabled && Boolean(song.src);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = song.volume ?? 0.6;
  }, []);

  // Pausa si el usuario se va a otra pestaña (nada de sonar de fondo).
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!activo) return null;

  const label =
    song.buttonLabel ||
    (song.artist ? `${song.title} — ${song.artist}` : song.title);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setFailed(true));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="music">
      <button
        className={`music__btn ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? `Pausar ${label}` : `Reproducir ${label}`}
        aria-pressed={playing}
      >
        <span className="music__icon" aria-hidden="true">
          {playing ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
        </span>

        <span className="music__label">
          {failed ? "falta el archivo de audio" : label}
        </span>

        <span className="music__eq" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>

      {/* Aviso si el MP3 todavía no está en public/media/ */}
      {failed && (
        <p className="music__hint" role="status">
          <TriangleAlert size={11} strokeWidth={2} />
          Copia el MP3 a <code>public/media/3am-por-ti.mp3</code>
        </p>
      )}

      <audio
        ref={audioRef}
        src={song.src}
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

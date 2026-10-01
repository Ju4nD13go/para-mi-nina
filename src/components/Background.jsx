import { useMemo } from "react";

/**
 * Fondo animado: degradado morado + brillos muy sutiles.
 * Sin canvas, sin librerías: solo elementos decorativos con CSS.
 */
export default function Background() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 7.3 + 4) % 100}%`,
        top: `${(i * 13.7 + 6) % 100}%`,
        size: 2 + ((i * 5) % 3),
        delay: `${(i % 7) * 1.4}s`,
        duration: `${9 + (i % 6) * 2.2}s`,
      })),
    []
  );

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__gradient" />
      <div className="bg__glow bg__glow--1" />
      <div className="bg__glow bg__glow--2" />
      <div className="bg__glow bg__glow--3" />
      <div className="bg__noise" />
      <div className="bg__sparks">
        {sparks.map((s) => (
          <span
            key={s.id}
            className="spark"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}

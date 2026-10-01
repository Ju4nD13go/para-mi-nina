import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/site";
import "./Nav.css";

/** Barra de navegación fija. Se oculta en el hero y aparece al hacer scroll. */
export default function Nav({ hidden }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { threshold: [0.3, 0.6], rootMargin: "-25% 0px -45% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const visible = !hidden || scrolled || open;

  return (
    <header className={`nav ${visible ? "is-visible" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav__inner" aria-label="Secciones de la página">
        <button
          className="nav__brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver al inicio"
        >
          <span className="font-script">Para ti</span>
        </button>

        <ul className="nav__list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav__link ${active === item.id ? "is-active" : ""}`}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div className={`nav__drawer ${open ? "is-open" : ""}`}>
        <ul className="nav__drawer-list">
          {navItems.map((item, i) => (
            <li
              key={item.id}
              style={{ transitionDelay: open ? `${i * 55}ms` : "0ms" }}
            >
              <button
                className="nav__drawer-link"
                onClick={() => go(item.id)}
                tabIndex={open ? 0 : -1}
              >
                <span className="nav__drawer-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

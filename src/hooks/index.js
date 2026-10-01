import { useEffect } from "react";

/**
 * Revela elementos con la clase `.reveal` cuando entran en pantalla.
 * Usa IntersectionObserver y respeta prefers-reduced-motion.
 */
export function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll(".reveal:not(.is-in)");

    if (reduce || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Bloquea el scroll del body mientras `locked` es true. */
export function useBodyLock(locked) {
  useEffect(() => {
    document.body.classList.toggle("is-locked", locked);
    return () => document.body.classList.remove("is-locked");
  }, [locked]);
}

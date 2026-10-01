/* =========================================================
   💌 CARTA INTERACTIVA
   ------------------------------------------------------------
   CÓMO EDITAR:
   - `greeting`  → texto en la tapa del sobre
   - `seal`      → símbolo del sello (emoji o texto corto)
   - `button`    → texto del botón
   - `signature` → firma al final de la carta
   - `pages`     → lista de páginas. Cada página tiene `lines`
                   (un string por párrafo). Añade o quita páginas
                   libremente; la navegación se ajusta sola.
   ========================================================= */

export const letter = {
  envelope: {
    greeting: "Para mi niña",
    seal: "💌",
    button: "Abrir carta",
    hint: "Toca el sobre",
  },
  title: "Una carta, pero programada",
  pages: [
    {
      lines: [
        "De tu novio...",
        "Sí, de ese novio que decidió que en vez de simplemente escribirte una carta, tenía que programarte una página completa. JAJAJA.",
        "La verdad es que no sabía cómo empezar, porque las palabras nunca me salen como es debido cuando se trata de ti. Así que lo hice de otra forma: escribiéndote un lugar entero para que lo vieras cuando quisieras.",
      ],
    },
    {
      lines: [
        "Empecé pensando en algo simple, un par de líneas. Pero entonces me acordé de que contigo nada es simple, porque contigo todo se multiplica.",
        "Cada recuerdo mío lleva tu cara pegada. Cada canción que me gusta me gusta por algo que te hice o te dije. Cada plan futuro que tengo ya te incluye a ti, y eso no lo puedo explicar en un párrafo.",
      ],
    },
    {
      lines: [
        "No sé exactamente qué esperaba que sintieras al leer esto. No pretendo que unas páginas alcancen para explicar lo que siento, porque no alcanzan. Nunca alcanzan.",
        "Pero quise dejarte algo que pudieras abrir cuando quisieras. Sin fecha, sin motivo, sin que nadie te lo cobre. Como un abrazo disponible siempre.",
      ],
    },
    {
      lines: [
        "Gracias por enseñarme lo que es tener a alguien. Gracias por las risas bobas, por los silencios cómodos, por quedarte incluso cuando no me lo merezco del todo.",
        "Gracias por ser tú. En serio. Con eso ya Te amo más de lo que estas letras pueden decir.",
      ],
    },
  ],
  signature: "Tu novio",
  postscript: "PD: si llegaste hasta aquí, ya Te amo. Lo demás son detalles.",
};

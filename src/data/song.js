/* =========================================================
   🎵 NUESTRA CANCIÓN
   ------------------------------------------------------------
   CÓMO DEJARLA LISTA (2 pasos, 1 minuto):

   1. Copia tu MP3 a `public/media/` con este nombre exacto:
          3am-por-ti.mp3

   2. Listo. No hay que tocar nada más.

   Para cambiar de canción: pon otro nombre de archivo en
   `src` y actualiza `title` y `artist`.

   ⚠️ IMPORTANTE: no se reproduce automáticamente, por diseño.
   Ella tiene que apretar el botón. Quería que el primer
   sonido de la página fuera decisión suya, no del código.
   ========================================================= */

export const song = {
  enabled: true, // 👉 ya está activa
  src: "/media/3am-por-ti.mp3", // ← pon el archivo aquí
  title: "POR TI",
  artist: "3AM",
  // Texto que se ve en el botón. Déjalo en "" para usar
  // automáticamente "title — artist".
  buttonLabel: "",
  volume: 0.6, // 0 a 1. Súbelo si lo quieres más fuerte.
};

/* =========================================================
   🎬 VIDEO
   ------------------------------------------------------------
   CÓMO EDITAR:
   Opción A — Archivo local:
     1. Copia tu video a `public/media/`, ej: public/media/nuestro-video.mp4
     2. Pon aquí:  src: "/media/nuestro-video.mp4"
     3. Deja provider: "file"

   Opción B — Link externo (YouTube / Vimeo):
     Copia solo el ID del video.
     https://www.youtube.com/watch?v=XXXXXXXXXXX  →  embedId: "XXXXXXXXXXX"
     provider: "youtube"    (o "vimeo")

   - El video NUNCA se reproduce solo ni con sonido: siempre
     requiere un clic.
   - `poster` es la imagen que se ve antes de reproducir (opcional).
   - Mientras no haya video, la sección muestra un aviso bonito
     para que sepas que falta ponerlo.
   ========================================================= */

export const videoSection = {
  eyebrow: "Para ti",
  title: "Hay algo que quiero que veas...",
  lead: "Un mensaje que quería decirte mirándote a los ojos, aunque hoy no pueda hacerlo.",
  caption: "Ábrelo con calma. Sin prisa.",

  src: "/media/video-juntos.mp4",
  embedId: "",
  provider: "file",
  poster: "",
  // Proporción real del video (ancho / alto) para que el marco mida lo
  // mismo que el video y no salgan barras negras.
  // Este video es vertical: 464 x 832. Para uno de 16:9, pon 16 / 9.
  aspectRatio: 464 / 832,
};

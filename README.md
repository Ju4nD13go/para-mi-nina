# 💜 Para mi niña

> Un pequeño lugar que hice para ti.

Una página web privada, romantic e interactiva. No es una plantilla de
San Valentín: es un espacio con estructura de carta, álbum, video, quiz y
mensajes escondidos, pensado para que lo personalices con tus propias palabras,
fotos y momentos.

---

## 🚀 Empezar

```bash
npm install
npm run dev        # abre en http://localhost:5173
```

Para publicarla (build de producción):

```bash
npm run build      # genera la carpeta dist/
npm run preview    # prueba el build final
```

La carpeta `dist/` es estática: la puedes subir a Netlify, Vercel, GitHub Pages,
o a cualquier hosting. **No necesita servidor.**

---

## 📍 DÓNDE CAMBIAR CADA COSA

Todo el contenido está separado de la lógica. **No necesitas tocar los
componentes para cambiar nada de lo que se ve.**

| Quiero cambiar…            | Archivo                        |
| -------------------------- | ------------------------------ |
| Título, nombre, botón      | `src/data/site.js`             |
| Texto de la carta          | `src/data/letter.js`           |
| **Las fotos** del álbum    | `src/data/memories.js`         |
| **El video**               | `src/data/video.js`            |
| Preguntas del quiz         | `src/data/quiz.js`             |
| Tarjetas "Cosas que amo"   | `src/data/loveCards.js`        |
| Sobres "Abre cuando"       | `src/data/openWhen.js`         |
| Texto de la sección final  | `src/data/final.js`            |
| **La canción**             | `src/data/song.js`             |
| Iconos disponibles         | `src/data/icons.js`            |
| Colores, tipografía        | `src/index.css` (variables)    |

---

## 🖼️ 1. Las fotografías

1. Copia tus fotos a **`public/media/`**
   (ejemplo: `public/media/recuerdo-1.jpeg`)
2. En `src/data/memories.js`, cambia la ruta:

```js
{
  id: "recuerdo-1",
  src: "/media/recuerdo-1.jpeg", // 👉 tu foto
  alt: "La primera vez que nos vimos",
  title: "Nuestro primer recuerdo",
  date: "14 de marzo",           // "" si no quieres fecha
  text: "Aquí todavía no sabíamos todo lo que íbamos a vivir.",
  rotate: -2.5,                  // inclinación del polaroid (-8 a 8)
}
```

- Hay **12 fotos** en el álbum. Añade o borra objetos del array: el carrusel
  se ajusta solo.
- Todas están normalizadas a **1080x1080 px** para que el marco las muestre
  idénticas. Si añades una foto nueva, conviértela a esa misma proporción
  (cuadrada) y se verá igual de bien que las demás.
- Las imágenes usan **lazy loading** automáticamente.
- **Tip:** el marco es cuadrado y las fotos no se recortan, así que se ve
  completa aunque sean verticales.

---

## 💌 2. La carta

`src/data/letter.js`. La carta se pagina automáticamente.

```js
pages: [
  {
    lines: [
      "Primer párrafo.",   // una línea = un párrafo
      "Segundo párrafo.",
    ],
  },
  { lines: ["Página 2...", "Otra cosa..."] },
  { lines: ["Página 3..."] },
],
```

- **Añade o quita páginas** como quieras: los puntitos y el contador se ajustan solos.
- `envelope.greeting` → el nombre en la tapa del sobre.
- `envelope.seal` → el emoji del sello.
- `signature` → la firma al final.
- `postscript` → el "PD".

---

## 🎬 3. El video

`src/data/video.js`. El video **nunca** se reproduce solo: siempre necesita un
clic, y con sonido bajo control de ella.

**Ya está puesto:** tu `public/media/video-juntos.mp4` (54 s, vertical).

**Opción A — archivo propio (recomendada):**

```js
src: "/media/nuestro-video.mp4",   // 👉 ponlo en public/media/
embedId: "",
provider: "file",
```

**Opción B — YouTube o Vimeo:**

```js
src: "",
embedId: "XXXXXXXXXXX",            // solo el ID del video
provider: "youtube",              // o "vimeo"
```

| `provider` | Qué hacer |
| ---------- | --------- |
| `file`     | Usa `src` con la ruta a tu archivo |
| `youtube`  | Usa `embedId` con el ID de YouTube |
| `vimeo`    | Usa `embedId` con el ID de Vimeo |

- `aspectRatio` → **ponle la proporción real de tu video** (ancho / alto), para
  que el marco mida lo mismo y no salgan barras negras. El tuyo es vertical:
  `464 / 832`. Para uno de 16:9, pon `16 / 9`.
- El marco nunca es más alto que la pantalla, así que en el celular el video
  vertical entra completo, sin que tengas que hacer scroll.
- `poster` → imagen que se ve antes de dar play (opcional).
- Mientras no configures nada, la sección muestra un aviso para que sepas
  que falta ponerlo.
- Si usas YouTube se carga desde `youtube-nocookie.com` (más privado).

---

## ❓ 4. El quiz

`src/data/quiz.js`. Son 10 preguntas de ejemplo: cámbialas todas.

**La respuesta correcta se marca en la misma opción**, con `ok: true`.
No hay índices: si reordenas las opciones, la correcta se mueve con ellas
y nunca se rompe.

```js
{
  id: "primera-cita",
  question: "¿Cuál fue nuestra primera cita?",
  options: [
    { t: "Esta SÍ es la correcta", ok: true },  // 👇 pon aquí la buena
    { t: "Esta no" },
    { t: "Esta tampoco" },
    { t: "Y esta menos" },
  ],
  // feedback opcional, solo para esta pregunta
  correct: "Mensaje extra cuando aciertas",
  wrong: "Mensaje extra cuando fallas",
}
```

**Para cambiar una respuesta:** quita `ok: true` de donde esté y ponlo en la
opción correcta. Si quieres cambiarla por completo, edita el texto `t`.

- ¿Estás en desarrollo (`npm run dev`)? La consola del navegador te avisa si
  alguna pregunta quedó con cero o con dos respuestas correctas. Así no se
  te rompe el quiz en silencio.

```txt
[quiz] La pregunta 3 ("¿Cuál es nuestra comida favorita?")
tiene 0 respuestas correctas. Debe tener exactamente una con { ok: true }.
```

- El resultado final se elige en `results`, según el puntaje:

```js
export const results = [
  { min: 10, title: "...", text: "...", emoji: "💜" },
  { min: 8,  title: "...", text: "...", emoji: "✨" },
  ...
];
```

Gana el primer objeto cuyo `min` sea menor o igual a tu puntaje.
**Puedes tener 2, 5, 15 preguntas… lo que quieras.** El contador y la barra
de progreso se ajustan solos.

- Los mensajes genéricos de acierto/fallo están arriba, en `quizSection`
  (`correct` y `wrong`). Los que son solo de una pregunta van dentro de esa
  pregunta, con el mismo nombre.

---

## ❤️ 5. "Cosas que amo de ti"

`src/data/loveCards.js`. Hay 10 tarjetas; añade o quita las que quieras.

```js
{
  id: "sonrisa",
  icon: "FaceSlightlySmiling",   // nombre del icono (ver src/data/icons.js)
  title: "Tu sonrisa",
  text: "Porque literalmente puedes cambiarme el día con ella.",
}
```

Iconos sugeridos ya registrados en `src/data/icons.js`:
`Heart`, `Sparkles`, `Gem`, `MoonStar`, `Star`, `Sun`, `Sunrise`, `Moon`,
`Coffee`, `Music`, `Gift`, `Clock`, `Cloud`, `Flame`, `Lock`, `Eye`, `Key`,
`Compass`, `Camera`, `Cat`, `Dog`, `Flower2`, `Leaf`, `Anchor`, `Feather`,
`BookOpen`, `Bell`, `Orbit`, `Signal`, `HeartHandshake`, `Aperture`, `Send`,
`FaceGrinning`, `FaceSlightlySmiling`.

Para usar uno que no esté en la lista, agrégalo en `src/data/icons.js`
(import + clave en `iconRegistry`). Catálogo: <https://lucide.dev/icons/>

---

## 💜 6. "Abre cuando..."

`src/data/openWhen.js`. Hay 5 sobres; cada uno abre un mensaje.

```js
{
  id: "triste",
  emoji: "🥺",
  title: "Cuando estés triste",
  text: "No sé arreglar las cosas, pero sí me quedo. Si quieres, no tienes que explicar nada.",
}
```

Se pueden abrir en cualquier orden y las veces que quieras.

---

## 🌙 7. La sección final

`src/data/final.js`. El "P.D." aparece solo, unos segundos después de llegar.

```js
{
  title: "Y eso es todo...",
  text: "Bueno... realmente nunca será suficiente para explicarte cuánto Te amo.",
  signature: "Tu novio",
  postscript: { label: "P.D.", text: "Ahora sí puedes llamarme. 😌" },
}
```

---

## 🎵 8. La canción

**"POR TI" de 3AM ya está puesta y lista.** El archivo está en
`public/media/3am-por-ti.mp3`.

Si algún día quieres cambiarla:

1. Copia el nuevo MP3 a `public/media/`
2. En `src/data/song.js`, ajusta `src`, `title` y `artist`:

```js
export const song = {
  enabled: true,                       // false = esconder el botón
  src: "/media/3am-por-ti.mp3",        // ruta de tu archivo
  title: "POR TI",
  artist: "3AM",
  buttonLabel: "",                     // "" = usa "título — artista"
  volume: 0.6,                         // 0 a 1
};
```

- Aparece un botón pequeñito en la esquina inferior derecha.
- **No se reproduce sola.** El primer sonido de la página lo decide ella.
- Si el MP3 no está o no carga, sale un avisito que dice qué archivo falta.
- Si cambia de pestaña, la música se pausa sola.
- Da igual si le das mil veces a la carta: la música nunca se interrumpe sola.
- Para cambiar de canción: pon otro nombre de archivo en `src` y actualiza
  `title` y `artist`.

---

## 🎨 Personalizar el diseño

Todos los colores y las tipografías están al inicio de `src/index.css`:

```css
:root {
  --bg: #120b1f;           /* fondo principal */
  --bg-2: #211132;         /* fondo secundario */
  --purple: #6d3cc7;       /* morado principal */
  --purple-bright: #8b5cf6;/* morado brillante */
  --purple-light: #a78bfa; /* morado claro */
  --lavender: #c4b5fd;     /* lavanda */
  --text: #f8f5ff;         /* texto principal */
  --text-soft: #d8cff0;    /* texto secundario */

  --font-script: "Great Vibes", cursive;   /* títulos */
  --font-body: "Poppins", sans-serif;      /* texto */
}
```

Cambiar `--purple-light` a rosa o a dorado, por ejemplo, repinta toda la página.

---

## 📱 Cómo está construida

```
src/
├── main.jsx
├── App.jsx                  ← ordena las secciones
├── App.css
├── index.css                ← TEMA GLOBAL (colores, fuentes, botones)
├── data/                    ← ✏️  TODO EL CONTENIDO EDITABLE
│   ├── site.js              ←   títulos, nombres, menú
│   ├── letter.js            ←   la carta
│   ├── memories.js          ←   las fotos
│   ├── video.js             ←   el video
│   ├── quiz.js              ←   preguntas y respuestas
│   ├── loveCards.js         ←   "cosas que amo"
│   ├── openWhen.js          ←   sobres
│   ├── final.js             ←   cierre
│   ├── song.js              ←   canción
│   └── icons.js             ←   registro de iconos
├── hooks/
│   └── index.js             ← animaciones al hacer scroll, bloqueo de scroll
└── components/
    ├── Background.jsx/.css  ← degradado + brillos sutiles
    ├── Nav.jsx/.css         ← menú fijo (hamburguesa en móvil)
    ├── Hero.jsx/.css        ← pantalla de inicio
    ├── LoveLetter.jsx/.css  ← ✉️  sobre animado + carta paginada
    ├── Memories.jsx/.css    ← 📸  álbum de polaroids
    ├── VideoSection.jsx/.css← 🎬  reproductor
    ├── LoveQuiz.jsx/.css    ← ❓  examen
    ├── LoveCards.jsx/.css   ← ❤️  tarjetas
    ├── OpenWhen.jsx/.css    ← 💌  sobres + modal
    └── FinalSection.jsx/.css← 🌙  cierre
```

---

## ✅ Lo que ya está resuelto

- **Responsive real**, pensado primero para móvil (probado de 320px a 1920px)
- **Sin scroll horizontal** en ningún tamaño
- **Animaciones de scroll** con `IntersectionObserver` (ligeras)
- **`prefers-reduced-motion`**: si ella tiene "reducir animaciones" activo en
  el sistema, todo se muestra estático de inmediato
- **Accesible**: skip link, `aria-label` en todos los botones, foco visible,
  navegación con teclado (flechas ← → en la carta y el álbum, `Esc` para
  cerrar), contraste 7:1 o mejor en todos los textos
- **Nada de audio automático**: ni el video ni la música suenan solos
- **Lazy loading** en todas las imágenes
- **Ligerito**: ~85 KB comprimidos de código, sin librerías pesadas. Las 12
  fotos (~1.9 MB en total) van con `lazy loading`, así que no se descargan
  todas a la vez: se van cargando según las vas viendo.

---

## 💡 Detalles de diseño que puedes tocar

| Quiero…                        | Dónde                                |
| ------------------------------ | ------------------------------------ |
| Cambiar el degradado del fondo | `src/components/Background.css` → `.bg__gradient` |
| Quitar las partículas del fondo | Borra `<div className="bg__sparks">` en `Background.jsx` |
| Cambiar la música del botón Entrar | `Hero.css` → `.hero__actions .btn` |
| Ajustar la velocidad de la carta | `LoveLetter.jsx` → `STEP` y `FIRST` |
| Cambiar el inclinación de los polaroids | `memories.js` → `rotate` en cada foto |

---

Hecho con React + Vite. Sin backend, sin cuentas, sin datos que salgan de tu
propio navegador. 🌙

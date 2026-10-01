/* =========================================================
   ❓ QUIZ — "El examen oficial de nuestra relación"
   =========================================================

   👉 CÓMO PONER LAS RESPUESTAS CORRECTAS
   ------------------------------------------------------------
   Cada opción lleva su propia marca. La correcta es la que
   tiene  `ok: true`. Las demás simplemente no lo llevan.

   options: [
     { t: "Esta es la correcta", ok: true },   // 👉 MARCA AQUÍ
     { t: "Esta no" },
     { t: "Esta tampoco" },
     { t: "Y esta menos" },
   ]

   Así no hay índices que sehackeen: si reordenas las
   opciones, la correcta se mueve con ellas y no se rompe nada.

   ⚠️ IMPORTANTE: estas 10 preguntas y sus respuestas son un
   borrador. REVÍSALAS Y CÁMBIALAS por las de ustedes. Pon la
   correcta donde tenga `ok: true` y borra las que sobre.
   ========================================================= */

export const quizSection = {
  eyebrow: "Examen",
  title: "El examen oficial de nuestra relación",
  lead: "Veamos cuánto sabes de nosotros.",
  intro: "Diez preguntas, cero piedad. Tómate tu tiempo, yo espero.",
  start: "Empezar",
  restart: "Repetir el examen",
  // feedback genérico (se muestra siempre)
  correct: "¡Correcto! Sabía que sí me conocías. 😌",
  wrong: "JAJAJAJA. Tenemos que hablar seriamente.",
  next: "Siguiente",
  seeResult: "Ver resultado",
};

export const quizQuestions = [
  {
    id: "primera-cita",
    // 👉 EDITA PREGUNTA Y RESPUESTAS
    question: "¿Cuál fue nuestra primera cita?",
    options: [
      { t: "Salimos a comer en frisby", ok: true },
      { t: "El cine" },
      { t: "En un CC" },
      { t: "Un parque por la noche" },
    ],
    // feedback opcional y específico de esta pregunta
    correct: "Exacto. Y ese dia tenia demasiada pena comer. Qué vergüenza.",
    wrong: "Esa no era. CARAJOOO.. Fue en Jardin Plaza y comimos en frisby, y me acuerdo que estaba demasiado nervioso.",
  },
  {
    id: "te-amo",
    question: '¿Quién dijo "te amo" primero?',
    options: [
      { t: "Juan", ok: true },
      { t: "Luisa" },
      { t: "Los dos a la vez" },
      { t: "Nadie, seguimos esperando" },
    ],
    correct: "Obvio. Lo dije en la iglesia, en plena misa jaja.",
    wrong: "Esa se está pensando todavía.",
  },
  {
    id: "comida",
    question: "¿Cuál es nuestra comida favorita?",
    options: [
      { t: "Arroz huevo y queso" },
      { t: "frijoles" },
      { t: "Pizza" },
      { t: "Todo lo que sea contigo", ok: true },
    ],
    correct: "Esa es la única respuesta que cuenta, en serio.",
    wrong: "Cercana, pero no. Vamos a comer y lo arreglamos.",
  },
  {
    id: "primer-viaje",
    question: "¿Cuál fue nuestro primer viaje juntos?",
    options: [
      { t: "La playa del año pasado" },
      { t: "I don´t know", ok: true },
      { t: "El road trip" },
      { t: "La ciudad que siempre quisimos ver" },
    ],
    correct: "Yo se que no sabes, pero Cartagena es nuestro primer destino juntos.",
    wrong: "Ese fue otro viaje. Pero sí, lo pasamos increíble.",
  },
  {
    id: "cancion",
    question: "¿Cuál es nuestra canción?",
    options: [
      { t: "Las de Eladio" },
      { t: "La que se pone para la fiesta" },
      { t: "Todas las que nos sepamos juntos", ok: true },
      { t: "Arturo" },
    ],
    correct: "Claro amor, si ambos nos sabemos la cancion y la disfrutamos juntos, es nuestra favorita jajaja.",
    wrong: "Gsus, nada sabe.",
  },
  {
    id: "lugar",
    question: "¿Qué lugar queremos visitar juntos?",
    options: [
      { t: "Japón" },
      { t: "Los pinguinos" },
      { t: "El mar" },
      { t: "Cada uno de los que siempre hablamos", ok: true },
    ],
    correct: "Exacto. Seguimos haciéndolo planes.",
    wrong: "Casi. Pista: es el lugar del que siempre hablamos.",
  },
  {
    id: "gusta-mas",
    question: "¿Qué cosa de ti me gusta más?",
    options: [
      { t: "Tu risa" },
      { t: "Tu forma de explicarme todo" },
      { t: "Tú, tal cual" },
      { t: "Todo lo anterior", ok: true },
    ],
    correct: "Trampa, y aun así la acertaste. Bien jugada.",
    wrong: "La respuesta buena era la última, así que sigue valiendo.",
  },
  {
    id: "saludo",
    question: "¿En que fecha comenzamos a hablar?",
    options: [
      { t: "13 de Enero del 2022" },
      { t: "1 de Enero del 2022" },
      { t: "11 de Enero del 2022", ok: true },
      { t: "Yo que voy a saber" },
    ],
    correct: "Veeee, por fin se sabe ese dato.",
    wrong: "Ay, carajo amor, no saberte eso, hace 2 dias lo hablamos.",
  },
  {
    id: "nosotros",
    question: "¿Qué es lo que más me gusta de nosotros?",
    options: [
      { t: "Que nos reímos de cualquier cosa" },
      { t: "Que no necesitamos plan" },
      { t: "Que estamos aunque no hablemos" },
      { t: "Todas las anteriores", ok: true },
    ],
    correct: "Otra respuesta tramposa. Y otra vez la acertaste.",
    wrong: "La última, como siempre.",
  },
  {
    id: "futuro",
    question: "¿Cuántos planes futuros tenemos?",
    options: [
      { t: "Pocos" },
      { t: "Los justos" },
      { t: "Demasiados" },
      { t: "Nunca son suficientes", ok: true },
    ],
    correct: "Exacto. Siempre nos va a faltar uno más.",
    wrong: "La respuesta honesta era la última, por si acaso.",
  },
];

/* ------------------------------------------------------------
   RESULTADO FINAL
   Gana el primer bloque cuyo `min` sea <= al puntaje.
   Si obtuvieras 7 de 10, entra el bloque con min: 5.
   ------------------------------------------------------------ */

export const results = [
  {
    min: 10,
    title: "Resultado perfecto",
    text: "10 de 10. Necesito que entiendas que esto me asustó un poquito. Estás demasiado bien en esto. Te amo.",
    emoji: "💜",
  },
  {
    min: 8,
    title: "Sabes bastante de mí",
    text: "Esto es más de lo que esperaba, y lo digo en serio. Los puntos que te faltan los inventamos en otro rato, juntos.",
    emoji: "✨",
  },
  {
    min: 5,
    title: "Vas bien encaminado",
    text: "Cinco de diez no está mal, considerando que la mitad de esas respuestas las inventé yo también. Te debo una historia.",
    emoji: "😌",
  },
  {
    min: 0,
    title: "Tenemos que conversar",
    text: "Está bien. Esto solo significa que vamos a salir más. Y eso, si lo piensas bien, es la mejor noticia de todas.",
    emoji: "🫂",
  },
];

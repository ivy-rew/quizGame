/* questions.js
 * This file contains the quiz questions as a JavaScript array of objects.
 * Each object has: question, answers (array), correct (index of correct answer)
 */

const quizQuestions = [
  // Bibel
  {
    category: "Bibel",
    question: "Was bedeutet das Wort „Bibel“ übersetzt?",
    answers: ["Alt", "Schrift", "Bücher"],
    correct: 2,
  },
  {
    category: "Bibel",
    question: "Wie alt sind die ältesten Schriften der Bibel?",
    answers: [
      "etwa 500 Jahre alt",
      "bis zu 1000 Jahre alt",
      "vermutlich bis zu 3000 Jahre alt",
    ],
    correct: 2,
  },
  {
    category: "Bibel",
    question:
      "Die Bibel ist in zwei große Abschnitte unterteilt. Wie nennt man sie?",
    answers: [
      "Hauptteil und Nachwort",
      "Altes Testament und Neues Testament",
      "Erster Band und Zweiter Band",
    ],
    correct: 1,
  },
  {
    category: "Bibel",
    question: "Wer übersetzte die Bibel in die deutsche Sprache?",
    answers: ["Johannes Gutenberg", "Martin Luther", "Papst Johannes Paul II."],
    correct: 1,
  },
  {
    category: "Bibel",
    question: "In welchen Sprachen wurde die Bibel ursprünglich geschrieben?",
    answers: [
      "Arabisch und Sumerisch",
      "Griechisch, Hebräisch und Aramäisch",
      "Englisch",
    ],
    correct: 1,
  },
  {
    category: "Bibel",
    question:
      "Im Neuen Testament stehen die vier Evangelien. Welches Evangelium gibt es nicht?",
    answers: ["Lukas Evangelium", "Johannes Evangelium", "Moses Evangelium"],
    correct: 2,
  },
  {
    category: "Bibel",
    question: "Wovon wird in den vier Evangelien berichtet?",
    answers: [
      "von der Erschaffung der Welt",
      "vom Leben von Jesus Christus",
      "von Gott und seinem Bund mit den Menschen",
    ],
    correct: 1,
  },
  {
    category: "Bibel",
    question:
      "Welche der folgenden Geschichten ist keine Erzählung aus der Bibel?",
    answers: [
      "Noah und die Sintflut",
      "David und Goliath",
      "Der Hirtenjunge und der Wolf",
    ],
    correct: 2,
  },
  {
    category: "Bibel",
    question: "Ein bekannter Psalm lautet: Der Herr ist mein Hirte, …",
    answers: [
      "… ich muss nicht bangen.",
      "… er wird mich leiten.",
      "… mir wird nichts mangeln.",
    ],
    correct: 2,
  },
  {
    category: "Bibel",
    question: "Wie heißt die Frau Abrahams im Alten Testament?",
    answers: ["Eva", "Maria", "Sara"],
    correct: 2,
  },
  {
    category: "Bibel",
    question: "Welches Wunder hat Jesus nicht vollbracht?",
    answers: [
      "er ließ einen Blinden wieder sehen",
      "er erbaute eine Kirche an einem Tag",
      "Er verwandelte Wasser zu Wein",
    ],
    correct: 1,
  },
  {
    category: "Bibel",
    question: "Wo wurde Jesus geboren?",
    answers: [
      "im Haus seiner Eltern in Nazareth",
      "in einem Stall in Bethlehem",
      "im Krankenhaus von Jerusalem",
    ],
    correct: 1,
  },
  {
    category: "Bibel",
    question: "Wie überlebten Noah und seine Familie die große Flut?",
    answers: [
      "sie stiegen auf den höchsten Berg der Welt",
      "sie retteten sich auf eine Insel.",
      "sie bauten eine Arche",
    ],
    correct: 2,
  },
  // Licht
  {
    category: "Licht",
    question: "Jemand der eine plötzliche Idee hat, hat…?",
    answers: ["einen Geistesblitz", "einen Gehirnblitz", "einen Geistesdonner"],
    correct: 0,
  },
  {
    category: "Licht",
    question: "Was ist keine Lichtquelle?",
    answers: ["Glühbirne", "Williamsbirne", "Kerzenbirne"],
    correct: 1,
  },
  {
    category: "Licht",
    question: "Wer hat die Glühbirne erfunden?",
    answers: ["Edison", "Parkinson", "Watson"],
    correct: 0,
  },
  {
    category: "Licht",
    question: "Was ist eine natürliche Lichtquelle?",
    answers: ["Regenwurm", "Bandwurm", "Glühwurm"],
    correct: 2,
  },
  {
    category: "Licht",
    question: "Womit hat man damals ohne Elektrizität Lampen betrieben?",
    answers: ["Benzin", "Petroleum", "Diesel"],
    correct: 1,
  },
  {
    category: "Licht",
    question: "Was kann man bei einem Stromausfall nicht benutzen?",
    answers: ["Kerze", "Taschenlampe", "Deckenlampe"],
    correct: 2,
  },
  {
    category: "Licht",
    question: "Wer sprach laut Bibel die Worte “Es werde Licht”?",
    answers: ["Gott", "Jesus", "Heiliger Geist"],
    correct: 0,
  },
  {
    category: "Licht",
    question:
      "Welches Licht hat jemand sprichwörtlich erblickt, der gerade geboren wurde?",
    answers: [
      "Das Licht des Lebens",
      "Das Licht der Welt",
      "Das Licht der Weisheit",
    ],
    correct: 1,
  },
  {
    category: "Licht",
    question: "Wenn man jemanden betrügt bzw. veräppelt führt man ihn…?",
    answers: ["in den Schatten", "weg von der Sonne", "hinters Licht"],
    correct: 2,
  },
  {
    category: "Licht",
    question:
      "Wenn man eine schlecht Phase hat, muss man durchhalten und das Licht an wessen Ende sehen?",
    answers: ["des Tages", "des Weges", "des Tunnels"],
    correct: 2,
  },
  {
    category: "Licht",
    question: "Jemanden der eine Idee hat, geht ein Licht… ?",
    answers: ["auf", "an", "aus"],
    correct: 0,
  },
  {
    category: "Licht",
    question: "Was ist dort, wo Licht ist, auch?",
    answers: ["Sonne", "Schatten", "Tag"],
    correct: 1,
  },
  {
    category: "Licht",
    question:
      "Jemand, der ausnahmsweise mal etwas versteht, hat einen … Moment?",
    answers: ["lichten", "leuchtenden", "hellen"],
    correct: 0,
  },
  {
    category: "Licht",
    question: "Jemand der nicht besonders schlau ist, ist nicht…?",
    answers: [
      "die hellste Birne in der Lampe",
      "der hellste Strahl der Sonne",
      "die hellste Kerze im Leuchter",
    ],
    correct: 2,
  },
  {
    category: "Licht",
    question: "Der letzte bildet…?",
    answers: ["das Schlusslicht", "den Schlussschein", "das Endlicht"],
    correct: 0,
  },
  // Herbst
  {
    category: "Herbst",
    question: "Was ist eine „Herbstzeitlose“?",
    answers: [
      "eine Person, die den Herbst nicht mag",
      "eine Pflanzenart, die im Herbst blüht",
      "eine Tierart, die im Herbst ihre Jungen zur Welt bringt",
    ],
    correct: 1,
  },
  {
    category: "Herbst",
    question: "Welche Farben hat das bunte Herbstlaub?",
    answers: [
      "schwarz, braun und grau",
      "gelb, orange und rot",
      "blau, violett und rosa",
    ],
    correct: 1,
  },
  {
    category: "Herbst",
    question: "Wie lautet ein bekanntes Herbstlied?",
    answers: [
      "Trarira, der Herbst, der ist da",
      "Bunt sind schon die Wälder",
      "Jetzt fängt der schöne Herbst an",
    ],
    correct: 1,
  },
  {
    category: "Herbst",
    question:
      "Welches dieser Tiere legt im Herbst keinen Futtervorrat für den Winter an?",
    answers: ["Eichhörnchen", "Hamster", "Igel"],
    correct: 2,
  },
  {
    category: "Herbst",
    question: "Was kann man im Herbst nicht ernten?",
    answers: [
      "Äpfel und Birnen",
      "Nüsse und Kastanien",
      "Rhabarber und Spargel",
    ],
    correct: 2,
  },
  {
    category: "Herbst",
    question: "Worauf bezieht sich der Ausdruck „Goldener Oktober“?",
    answers: [
      "auf die Blattfärbung der Laubbäume",
      "auf die reiche Ernte im Monat Oktober",
      "auf die tief stehende Sonne",
    ],
    correct: 0,
  },
  {
    category: "Herbst",
    question:
      "Wie nennt man Vögel, die ganzjährig hier bei uns bleiben und im Herbst nicht Richtung Süden ziehen?",
    answers: ["Nicht-Zugvögel", "Standvögel", "winterharte Vögel"],
    correct: 1,
  },
  {
    category: "Herbst",
    question:
      "Wie nennt man die Vögel, die im Herbst Richtung Süden fliegen, dort überwintern und im Frühjahr wieder zurückkommen?",
    answers: ["Zugvögel", "Vielflieger", "Wanderfalken"],
    correct: 0,
  },
  {
    category: "Herbst",
    question: "Welche dieser Vögel fliegen im Herbst in den Süden?",
    answers: ["Schwalben", "Meisen", "Elstern"],
    correct: 0,
  },
  // Weltraum
  {
    category: "Weltraum",
    question: "Warum leuchtet der Mond?",
    answers: [
      "weil er aus heißem Gas besteht",
      "weil seine Oberfläche von der Sonne angestrahlt wird",
      "weil seine Oberfläche aus Vulkanen besteht, die nachts glühende Lava ausstoßen",
    ],
    correct: 1,
  },
  {
    category: "Weltraum",
    question: "Welches dieser Sternbilder gibt es nicht?",
    answers: ["Großer Wagen", "Kleiner Löwe", "Geflügelte Schlange"],
    correct: 2,
  },
  {
    category: "Weltraum",
    question: "Wer oder was trägt in der Raumfahrt den Namen Curiosity?",
    answers: [
      "Ein 2020 entdeckter Planet aus Eis",
      "Ein ferngesteuertes Raumfahrzeug, das den Mars erforscht",
      "Ein Stern, der zum Sternbild Zwillinge gehört",
    ],
    correct: 1,
  },
  {
    category: "Weltraum",
    question: "Wie nenn man einen Stern, der einen Schweif hat?",
    answers: ["Asteroid", "Gas-Stern", "Komet"],
    correct: 2,
  },
  {
    category: "Weltraum",
    question:
      "Wenn sich der Mond zwischen Sonne und Erde schiebt, dann entstehen",
    answers: ["ein Sonnensturm", "ein Mondausfall", "eine Sonnenfinsternis"],
    correct: 2,
  },
  {
    category: "Weltraum",
    question: "Welcher Planet wird auch als „der rote Planet“ bezeichnet?",
    answers: ["die Erde", "der Mars", "der Merkur"],
    correct: 1,
  },
  {
    category: "Weltraum",
    question:
      "In welchem Jahr hat zum ersten Mal ein Mensch den Mond betreten?",
    answers: ["1952", "1969", "1994"],
    correct: 1,
  },
  {
    category: "Weltraum",
    question: "Was ist die sogenannte Milchstraße?",
    answers: [
      "eine Straße, die bei der ersten Landung auf dem Mond gebaut wurde",
      "eine Ansammlung von vielen Milliarden von Sternen im Weltall",
      "ein Streifen aus besonders weißen Wolken am Himmel",
    ],
    correct: 1,
  },
];

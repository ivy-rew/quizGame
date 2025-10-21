// main.js - Quiz Game Logic
let currentQuestion = 0;
let score = 0;
let answered = false;

const quizDiv = document.getElementById('quiz');
const scoreDiv = document.getElementById('score');

function showQuestion() {
  answered = false;
  scoreDiv.textContent = '';
  const q = quizQuestions[currentQuestion];
  quizDiv.innerHTML = `
    <div class="category"><strong>Kategorie:</strong> ${q.category}</div>
    <div class="question">${q.question}</div>
    <ul class="answers">
      ${q.answers.map((a, i) => `<li><button class="answer-btn" data-idx="${i}">${i+1}. ${a}</button></li>`).join('')}
    </ul>
    <button class="next-btn" id="nextBtn" disabled>Nächste Frage</button>
  `;
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.onclick = answerHandler;
  });
  document.getElementById('nextBtn').onclick = nextHandler;
}

function answerHandler(e) {
  if (answered) return;
  answered = true;
  const idx = parseInt(e.target.getAttribute('data-idx'));
  const q = quizQuestions[currentQuestion];
  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    btn.classList.remove('correct', 'incorrect');
    if (i === q.correct) btn.classList.add('correct');
    else btn.classList.add('incorrect');
    btn.disabled = true;
  });
  if (idx === q.correct) {
    score++;
    scoreDiv.textContent = 'Richtig!';
  } else {
    scoreDiv.textContent = 'Falsch!';
  }
  document.getElementById('nextBtn').disabled = false;
}

function nextHandler() {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizDiv.innerHTML = `<div class="score">Du hast ${score} von ${quizQuestions.length} Fragen richtig beantwortet!</div>`;
  scoreDiv.textContent = '';
}

showQuestion();

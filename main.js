// main.js - Quiz Game Logic

let currentQuestion = 0;
let score = 0;
let answered = false;
let countdownActive = false;
let countdownInterval = null;
let countdownTimeout = null;
let countdownSeconds = 10;
let countdownPaused = false;
let pausedSeconds = 0;

const quizDiv = document.getElementById('quiz');
const scoreDiv = document.getElementById('score');

function showQuestion() {
  answered = false;
  countdownActive = false;
  scoreDiv.textContent = '';
  const q = quizQuestions[currentQuestion];
  quizDiv.innerHTML = `
    <div class="category"><strong>Kategorie:</strong> ${q.category}</div>
    <div class="question">${q.question}</div>
    <div class="answers cards">
      ${q.answers.map((a, i) => `
        <div class="answer-card">
          <button class="answer-btn" data-idx="${i}">
            <div class="answer-number">${i+1}</div>
            <div class="answer-text">${a}</div>
          </button>
        </div>
      `).join('')}
    </div>
    <div id="countdownBar" style="margin:16px 0; font-size:1.2em;"></div>
    <button class="next-btn" id="nextBtn" disabled>Nächste Frage</button>
    <button class="countdown-btn" id="countdownBtn">Countdown starten (Leertaste)</button>
  `;
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.onclick = answerHandler;
  });
  document.getElementById('nextBtn').onclick = nextHandler;
  document.getElementById('countdownBtn').onclick = startCountdownMode;
  document.addEventListener('keydown', spaceCountdownListener);
}

function spaceCountdownListener(e) {
  if (e.code === 'Space') {
    if (countdownActive && !answered) {
      toggleCountdownPause();
    } else if (!countdownActive && !answered) {
      startCountdownMode();
    }
  }
}

function startCountdownMode() {
  if (countdownActive || answered) return;
  countdownActive = true;
  let seconds = countdownSeconds;
  const countdownBar = document.getElementById('countdownBar');
  countdownBar.textContent = `Countdown: ${seconds} Sekunden`;
  let btns = Array.from(document.querySelectorAll('.answer-btn'));
  let highlightIdx = -1;
  countdownInterval = setInterval(() => {
    // Randomly highlight one card, never the same twice in a row
    btns.forEach((btn, i) => btn.classList.remove('hovering'));
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * btns.length);
    } while (nextIdx === highlightIdx);
    highlightIdx = nextIdx;
    btns[highlightIdx].classList.add('hovering');
    seconds--;
    countdownBar.textContent = `Countdown: ${seconds} Sekunden`;
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      countdownBar.textContent = '';
    }
  }, 1000);
  countdownTimeout = setTimeout(() => {
    clearInterval(countdownInterval);
    btns.forEach(btn => btn.classList.remove('hovering'));
    showSolution();
    countdownBar.textContent = '';
    document.removeEventListener('keydown', spaceCountdownListener);
  }, countdownSeconds * 1000);
}

function toggleCountdownPause() {
  const countdownBar = document.getElementById('countdownBar');
  if (!countdownPaused) {
    countdownPaused = true;
    clearInterval(countdownInterval);
    clearTimeout(countdownTimeout);
    countdownBar.textContent += ' (Pause)';
  } else {
    countdownPaused = false;
    resumeCountdown();
  }
}

function resumeCountdown() {
  let btns = Array.from(document.querySelectorAll('.answer-btn'));
  let seconds = parseInt(document.getElementById('countdownBar').textContent.match(/\d+/));
  let highlightIdx = btns.findIndex(btn => btn.classList.contains('hovering'));
  countdownInterval = setInterval(() => {
    btns.forEach((btn, i) => btn.classList.remove('hovering'));
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * btns.length);
    } while (nextIdx === highlightIdx);
    highlightIdx = nextIdx;
    btns[highlightIdx].classList.add('hovering');
    seconds--;
    document.getElementById('countdownBar').textContent = `Countdown: ${seconds} Sekunden`;
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('countdownBar').textContent = '';
    }
  }, 1000);
  countdownTimeout = setTimeout(() => {
    clearInterval(countdownInterval);
    btns.forEach(btn => btn.classList.remove('hovering'));
    showSolution();
    document.getElementById('countdownBar').textContent = '';
    document.removeEventListener('keydown', spaceCountdownListener);
  }, seconds * 1000);
}

function showSolution() {
  answered = true;
  let btns = Array.from(document.querySelectorAll('.answer-btn'));
  const q = quizQuestions[currentQuestion];
  btns.forEach((btn, i) => {
    btn.disabled = true;
    btn.classList.remove('hovering');
    if (i === q.correct) {
      btn.classList.add('correct', 'emphasize');
    } else {
      btn.classList.add('incorrect', 'dimmed');
    }
  });
  scoreDiv.textContent = 'Zeit abgelaufen!';
  document.getElementById('nextBtn').disabled = false;
}

function answerHandler(e) {
  if (answered || countdownActive) return;
  answered = true;
  document.removeEventListener('keydown', spaceCountdownListener);
  const idx = parseInt(e.target.getAttribute('data-idx'));
  const q = quizQuestions[currentQuestion];
  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    btn.classList.remove('correct', 'incorrect', 'emphasize', 'dimmed');
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
  if (countdownInterval) clearInterval(countdownInterval);
  if (countdownTimeout) clearTimeout(countdownTimeout);
  document.removeEventListener('keydown', spaceCountdownListener);
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

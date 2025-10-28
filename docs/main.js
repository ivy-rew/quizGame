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

const secondsWithoutHighlight = 3;
const quizDiv = document.getElementById('quiz');
const scoreDiv = document.getElementById('score');
let countdownAudio = null;
let countdownAudioSrc = 'countdown.mp3';

function getCategoryIcon(category) {
  switch (category.trim().toLowerCase()) {
    case 'bibel':
      return '<span class="category-icon" title="Bibel">📖</span>';
    case 'licht':
      return '<span class="category-icon" title="Licht">💡</span>';
    case 'herbst':
      return '<span class="category-icon" title="Herbst">🍂</span>';
    case 'weltraum':
      return '<span class="category-icon" title="Weltraum">🪐</span>';
    default:
      return '';
  }
}

function showQuestion() {
  answered = false;
  countdownActive = false;
  scoreDiv.textContent = '';
  const q = quizQuestions[currentQuestion];
  // Set header with emoji
  const header = document.querySelector('.quiz-container h2');
  if (header) {
    header.innerHTML = `Eins, Zwei oder Drei? <span class='category-icon-header'>${getCategoryIcon(q.category)}</span>`;
  }
  quizDiv.innerHTML = `
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
    <div class="footer-hints">
      <span class="key-hint key-action" data-key="ArrowLeft"><kbd>←</kbd></span>
      <span class="key-hint key-action" data-key="ArrowRight"><kbd>→</kbd></span>
      <span class="key-hint key-action" data-key="ArrowUp"><kbd>↑</kbd></span>
      <span class="key-hint key-action" data-key="ArrowDown"><kbd>↓</kbd></span>
      <span class="key-hint key-action" data-key="Space"><kbd>Leertaste</kbd></span>
    </div>
  `;
  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.onclick = answerHandler;
  });
  document.querySelectorAll('.key-action').forEach(el => {
    el.onclick = function() {
      simulateKeyPress(el.getAttribute('data-key'));
    };
  });
}

function simulateKeyPress(key) {
  const e = new KeyboardEvent('keydown', { code: key });
  // Call all listeners manually
  spaceCountdownListener(e);
  categoryJumpListener(e);
  questionJumpListener(e);
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


function runCountdown(highlightIdx, seconds) {
  let btns = Array.from(document.querySelectorAll('.answer-btn'));
  const countdownBar = document.getElementById('countdownBar');
  // Start audio
  if (!countdownAudio) {
    countdownAudio = new Audio(countdownAudioSrc);
    countdownAudio.loop = true;
  }
  countdownAudio.play();

  countdownInterval = setInterval(() => {
    if (seconds <= secondsWithoutHighlight) {
      btns.forEach((btn, i) => btn.classList.remove('hovering'));
    } else {
      btns.forEach((btn, i) => btn.classList.remove('hovering'));
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * btns.length);
      } while (nextIdx === highlightIdx);
      highlightIdx = nextIdx;
      btns[highlightIdx].classList.add('hovering');
    }
    seconds--;
    countdownBar.textContent = `${seconds}`;
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      countdownBar.textContent = '';
      if (countdownAudio) {
        countdownAudio.pause();
      }
    }
  }, 1000);
  countdownTimeout = setTimeout(() => {
    clearInterval(countdownInterval);
    btns.forEach(btn => btn.classList.remove('hovering'));
    showSolution();
    countdownBar.textContent = '';
    document.removeEventListener('keydown', spaceCountdownListener);
    if (countdownAudio) {
      countdownAudio.pause();
    }
  }, seconds * 1000);
}

function startCountdownMode() {
  if (countdownActive || answered) return;
  countdownActive = true;
  let seconds = countdownSeconds;
  const countdownBar = document.getElementById('countdownBar');
  countdownBar.textContent = `${seconds}`;
  let highlightIdx = -1;
  runCountdown(highlightIdx, seconds);
}

function toggleCountdownPause() {
  const countdownBar = document.getElementById('countdownBar');
  if (!countdownPaused) {
    countdownPaused = true;
    clearInterval(countdownInterval);
    clearTimeout(countdownTimeout);
    countdownBar.textContent += ' (Pause)';
    if (countdownAudio) countdownAudio.pause();
  } else {
    countdownPaused = false;
    // Remove any label after pause
    countdownBar.textContent = countdownBar.textContent.replace(/\s*\(Pause\)/, '');
    resumeCountdown();
  }
}

function resumeCountdown() {
  let btns = Array.from(document.querySelectorAll('.answer-btn'));
  let seconds = parseInt(document.getElementById('countdownBar').textContent.match(/\d+/));
  let highlightIdx = btns.findIndex(btn => btn.classList.contains('hovering'));
  runCountdown(highlightIdx, seconds);
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
  // Show correct answer just below countdown, hide countdown
  const countdownBar = document.getElementById('countdownBar');
  countdownBar.textContent = '';
  if (countdownAudio) countdownAudio.pause();
  // Insert correct answer below countdownBar
  if (!document.getElementById('correctAnswerBar')) {
    const answerDiv = document.createElement('div');
    answerDiv.id = 'correctAnswerBar';
    answerDiv.style.marginTop = '8px';
    answerDiv.style.fontWeight = 'bold';
    answerDiv.textContent = `✅️ ${q.answers[q.correct]}`;
    countdownBar.parentNode.insertBefore(answerDiv, countdownBar.nextSibling);
  } else {
    document.getElementById('correctAnswerBar').textContent = `✅️ ${q.answers[q.correct]}`;
  }
  // Enable only Enter and Arrow navigation after answer is shown
  window.allowArrowNav = true;
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

// Remove previous PageUp/PageDown logic and use ArrowUp/ArrowDown for category jump
function categoryJumpListener(e) {
  // Allow navigation after answer is shown
  if ((!answered && !countdownActive) || window.allowArrowNav) {
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
      const currentCat = quizQuestions[currentQuestion].category;
      const allCats = quizQuestions.map(q => q.category);
      const uniqueCats = [...new Set(allCats)];
      let catIdx = uniqueCats.indexOf(currentCat);
      let targetCatIdx = e.code === 'ArrowDown' ? catIdx + 1 : catIdx - 1;
      if (targetCatIdx < 0) targetCatIdx = uniqueCats.length - 1;
      if (targetCatIdx >= uniqueCats.length) targetCatIdx = 0;
      const targetCat = uniqueCats[targetCatIdx];
      // Find first question in target category
      const targetQIdx = quizQuestions.findIndex(q => q.category === targetCat);
      if (targetQIdx !== -1) {
        currentQuestion = targetQIdx;
        window.allowArrowNav = false;
        showQuestion();
      }
    }
  }
}

function questionJumpListener(e) {
  // Allow navigation after answer is shown
  if ((!answered && !countdownActive) || window.allowArrowNav) {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
      let targetIdx = currentQuestion + (e.code === 'ArrowRight' ? 1 : -1);
      if (targetIdx < 0) targetIdx = quizQuestions.length - 1;
      if (targetIdx >= quizQuestions.length) targetIdx = 0;
      currentQuestion = targetIdx;
      window.allowArrowNav = false;
      showQuestion();
    }
  }
}

function handleKeyAction(key) {
  // Map key to action
  switch (key) {
    case 'ArrowLeft':
      selectPrevCategory();
      break;
    case 'ArrowRight':
      selectNextCategory();
      break;
    case 'ArrowUp':
      selectPrevQuestion();
      break;
    case 'ArrowDown':
      selectNextQuestion();
      break;
    case 'Enter':
      revealAnswer();
      break;
    case ' ': // Spacebar
      startCountdown();
      break;
    default:
      break;
  }
}

// Listen for keyboard events
window.addEventListener('keydown', function(e) {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
  // Use e.code for all key comparisons
  switch (e.code) {
    case "Space":
      e.preventDefault();
      spaceCountdownListener(e);
      break;
    case "ArrowLeft":
    case "ArrowRight":
      e.preventDefault();
      questionJumpListener(e);
      break;
    case "ArrowUp":
    case "ArrowDown":
      e.preventDefault();
      categoryJumpListener(e);
      break;
    default:
      break;
  }
});

showQuestion();

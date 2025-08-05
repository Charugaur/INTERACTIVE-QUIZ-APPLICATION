let currentQuestionIndex = 0;
let score = 0;
let currentQuiz = [];
let userName = '';

// Sample quiz questions by domain
const quizData = {
  movies: [
    {
      question: "Who directed the movie 'Inception'?",
      options: ["Christopher Nolan", "James Cameron", "Steven Spielberg", "Quentin Tarantino"],
      answer: "Christopher Nolan"
    },
    {
      question: "Which year was 'Titanic' released?",
      options: ["1997", "2000", "1995", "1999"],
      answer: "1997"
    }
  ],
  science: [
    {
      question: "What planet is known as the Red Planet?",
      options: ["Mars", "Earth", "Venus", "Jupiter"],
      answer: "Mars"
    },
    {
      question: "What gas do plants absorb?",
      options: ["Oxygen", "Carbon Dioxide", "Helium", "Nitrogen"],
      answer: "Carbon Dioxide"
    }
  ],
  history: [
    {
      question: "Who was the first president of the United States?",
      options: ["George Washington", "Abraham Lincoln", "John Adams", "Thomas Jefferson"],
      answer: "George Washington"
    },
    {
      question: "In which year did World War II end?",
      options: ["1945", "1941", "1939", "1950"],
      answer: "1945"
    }
  ]
};

function startApp() {
  const input = document.getElementById('username');
  if (input.value.trim()) {
    userName = input.value.trim();
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('domainContainer').classList.remove('hidden');
  }
}

function startQuiz() {
  const domain = document.getElementById('domainSelect').value;
  currentQuiz = shuffle([...quizData[domain]]);
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('domainContainer').classList.add('hidden');
  document.getElementById('quizContainer').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const quiz = currentQuiz[currentQuestionIndex];
  document.getElementById('questionText').textContent = quiz.question;
  const answersDom = document.getElementById('answers');
  answersDom.innerHTML = '';
  quiz.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    answersDom.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = currentQuiz[currentQuestionIndex].answer;
  if (selected === correct) {
    score++;
  }
  document.querySelectorAll('#answers button').forEach(btn => {
    btn.disabled = true;
    btn.style.backgroundColor = btn.textContent === correct ? 'green' : 'red';
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('resultText').textContent = `${userName}, you scored ${score} out of ${currentQuiz.length}`;
  document.getElementById('resultContainer').classList.remove('hidden');
}

function restart() {
  document.getElementById('resultContainer').classList.add('hidden');
  document.getElementById('loginContainer').classList.remove('hidden');
}

// Utility function
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
// Get DOM elements
const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timer");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const saveBtn = document.getElementById("saveBtn");
const initialsInput = document.getElementById("initials");

// Sample question set
const questions = [
  { question: "Question 1", answers: ["A", "B", "C"], correct: "A" },
  { question: "Question 2", answers: ["A", "B", "C"], correct: "B" },
];

// Variables for keeping track of the current question, time left, interval ID, and user score
let currentQuestion = 0;
let timeLeft = 60;
let intervalId;
let score = 0;

// Add event listener to the start button
startBtn.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  startBtn.classList.add("hidden"); // Hide start button
  timerDisplay.textContent = `Time: ${timeLeft}`; // Display timer
  intervalId = setInterval(updateTimer, 1000); // Update timer every second
  displayQuestion(); // Show the first question
}

// Function to update the timer
function updateTimer() {
  timeLeft--; // Decrement time left
  timerDisplay.textContent = `Time: ${timeLeft}`; // Update timer display

  // End the quiz if time runs out
  if (timeLeft <= 0) {
    clearInterval(intervalId);
    endQuiz();
  }
}

// Function to display the current question and its answers
function displayQuestion() {
  // End the quiz if there are no more questions
  if (currentQuestion >= questions.length) {
    clearInterval(intervalId);
    endQuiz();
    return;
  }

  // Generate question and answer buttons
  quiz.innerHTML = `
    <h2>${questions[currentQuestion].question}</h2>
    ${questions[currentQuestion].answers
      .map(
        (answer, index) =>
          `<button class="answerBtn" data-answer="${index}">${answer}</button>`
      )
      .join("")}
  `;

  // Add event listeners to answer buttons
  const answerBtns = document.querySelectorAll(".answerBtn");
  answerBtns.forEach((btn) => btn.addEventListener("click", handleAnswer));
}

// Function to handle user's answer
function handleAnswer(e) {
  const userAnswer = e.target.getAttribute("data-answer");
  const correctAnswer = questions[currentQuestion].correct;

  // Increment score if the answer is correct, otherwise reduce the time
  if (questions[currentQuestion].answers[userAnswer] === correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
  }

  // Move on to the next question
  currentQuestion++;
  displayQuestion();
}

// Function to end the quiz and show the results section
function endQuiz() {
  quiz.classList.add("hidden");
  results.classList.remove("hidden");
  saveBtn.addEventListener("click", saveScore);
}

// Function to save the user's score and initials
function saveScore(e) {
  e.preventDefault();
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {
      initials: initials,
      score: score,
    };

    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

// Get DOM elements
const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timer");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const saveBtn = document.getElementById("saveBtn");
const initialsInput = document.getElementById("initials");

// High Score Viewing

// Get DOM element for highscores
const highscoresDiv = document.getElementById("highscores");
const viewHighscoresBtn = document.getElementById("viewHighscoresBtn");

// Add event listener to the View Highscores button
viewHighscoresBtn.addEventListener("click", function() {
    // Retrieve highscores from local storage
    const highscores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    // Sort highscores in descending order
    highscores.sort((a, b) => b.score - a.score);
  
    // Clear the highscoresDiv
    highscoresDiv.innerHTML = "";

    // Display each highscore
    highscores.forEach(scoreObj => {
        const scoreP = document.createElement("p");
        scoreP.textContent = `${scoreObj.initials}: ${scoreObj.score}`;
        highscoresDiv.appendChild(scoreP);
    });

    // Toggle visibility of the highscores
    highscoresDiv.classList.toggle("hidden");
});


// Sample question set
const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["&lt;scripting&gt;", "&lt;js&gt;", "&lt;script&gt;", "&lt;javascript&gt;"],
    correct: "&lt;script&gt;"
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: ["The &lt;body&gt; section", "Both the &lt;head&gt; section and the &lt;body&gt; section are correct", "The &lt;head&gt; section"],
    correct: "Both the &lt;head&gt; section and the &lt;body&gt; section are correct"
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: ["&lt;script href='xxx.js'&gt;", "&lt;script name='xxx.js'&gt;", "&lt;script src='xxx.js'&gt;"],
    correct: "&lt;script src='xxx.js'&gt;"
  },
  {
    question: "The external JavaScript file must contain the &lt;script&gt; tag.",
    answers: ["True", "False"],
    correct: "False"
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
    correct: "alert('Hello World');"
  },
  {
      question: "What will the following JavaScript code output: console.log(typeof typeof 1);?",
      answers: ["string", "number", "undefined", "boolean"],
      correct: "string"
  },
  {
      question: "Which JavaScript method removes the last element from an array and returns that element?",
      answers: ["shift()", "pop()", "push()", "unshift()"],
      correct: "pop()"
  },
  {
      question: "How do you declare a JavaScript variable?",
      answers: ["var carName;", "v carName;", "variable carName;", "var = carName;"],
      correct: "var carName;"
  },
  {
      question: "Which JavaScript operator is used to assign a value to a variable?",
      answers: ["*", "=", "+", "-"],
      correct: "="
  },
  {
      question: "What is the correct JavaScript syntax to change the content of the HTML element below? <p id='demo'>This is a demonstration.</p>",
      answers: ["document.getElementByName('p').innerHTML = 'Hello World!';", "document.getElementById('demo').innerHTML = 'Hello World!';", "#demo.innerHTML = 'Hello World!';", "document.getElement('p').innerHTML = 'Hello World!';"],
      correct: "document.getElementById('demo').innerHTML = 'Hello World!';"
  },
  {
      question: "Which event occurs when the user clicks on an HTML element?",
      answers: ["onmouseclick", "onchange", "onclick", "onmouseover"],
      correct: "onclick"
  }
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
    timeLeft -= 30;
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

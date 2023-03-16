// Set up quiz


const startContainer = document.getElementById("start-container");
const startBtn = document.getElementById("start");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const timeEl = document.getElementById("time");
const initialsContainer = document.getElementById("initials-container");
const initialsInput = document.getElementById("initials");
const saveBtn = document.getElementById("save");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;

// Define quiz questions and answers
const quizData = [


  {
    prompt: "What is the output of 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    prompt: "What is the keyword to declare a variable in JavaScript?",
    choices: ["var", "let", "const", "all of the above"],
    answer: "all of the above"
  },
  {
    prompt: "Which built-in method reverses the order of the elements of an array?",
    choices: ["changeOrder(order)", "reverse()", "sort(order)", "none of the above"],
    answer: "reverse()"
  },
  {
    prompt: "What is the correct syntax for creating a function in JavaScript?",
    choices: ["function = myFunction()", "function myFunction()", "myFunction() function", "none of the above"],
    answer: "function myFunction()"
  },
  {
    prompt: "What is the output of typeof null?",
    choices: ["object", "null", "undefined", "string"],
    answer: "object"
  }
];






// Function to start quiz
function startQuiz() {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestion();
  startTimer();
}

// Function to start timer
function startTimer() {
  const countdown = setInterval(function(){
    timeLeft--;
    timeEl.innerText = timeLeft;

   
   // if (timeLeft === 0) {
   //   clearInterval(countdown);
   //   endQuiz();
//  }
  }, 1000);
}

// Function to display quiz questions and choices
function displayQuestion() {
  const question = quizData[currentQuestion];
  questionEl.textContent = question.prompt;
  choice1.textContent = question.choices[0];
  choice2.textContent = question.choices[1];
  choice3.textContent = question.choices[2];
  choice4.textContent = question.choices[3];

  choicesEl;
  //const answer = quiz
}

function answerQuestion(){
  
}
//Event Listener

startBtn.addEventListener("click", startQuiz);
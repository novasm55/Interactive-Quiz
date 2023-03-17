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

//for (let i = 0; i < quizData.length; i++) {
  //text += quizData[i] + "<br>";

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
  choicesEl.innerHTML = "";
  for(let i = 0; i < question.choices.length ; i++){
    var choice = question.choices[i];
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class","choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = choice;
    choicesEl.appendChild(choiceNode);
  //const answer = quiz
  }
}

function answerQuestion(event) {
var btnEl = event.target;
if(btnEl.value !== quizData[currentQuestion].answer){
  currentQuestion++;
  //penalizes timer
  timeLeft = timeLeft - 5;
  displayQuestion();

}
//Conditional statement for correct answer
else{
  currentQuestion++;
  score = score++;
  displayQuestion();

}

}
//Event Listener
startBtn.addEventListener("click", startQuiz);

choicesEl.onclick = answerQuestion;

//End Game function
if(timeLeft == 0 || currentQuestion == 5){
function endGame() {
  //locally store score
var initials = "Score: " + score;
  //locally store user initials
  var gameOverNode = document.createElement("h2");
 
}}
// Declare Global Variables

// Define amount of game time (in 1000's)
let timeRemaing;

//  Counts length (number of) questions
let numQuestions = questions.length;

// Presents current question [i]
let presentQ;

// Active Game State Status (boolean)
let activeGame = true;

// Stores the user's game score
let gameScore;

// Create a variable to store the score point bonus awarded for correct answers

let correctAnswerScore;

// Declare our timer variable globally and we can clear it anywhere in our code later (not just when the timer ends, say when the game ends)
let timerInterval;

// Stores the users selected answers
let userAnswers = [];

// Holds HTML elements for DOM manip
let time = document.getElementById("timer");
let score = document.getElementById("user-score");

let startBtn = document.getElementById("start");
startBtn.addEventListener("click", newGame);

// Grabs HTML containers
let welcomeDiv = document.querySelector(".welcome-container");
let questionDiv = document.querySelector(".questions-container");
let formDiv = document.querySelector(".form-container");
let highScoreModal = document.querySelector(".modal-container");
let leaderboard = document.querySelector(".user-scores");
let leaderLink = document.querySelector(".leaderText");
leaderLink.addEventListener("click", showLeader)

let qTitle = document.getElementById("question-title");
let qChoices = document.getElementById("question-choices");

// Grab form input element 
let username = document.getElementById("username");

// Grabs user input submission
let userSubmit = document.getElementById("userSubmit");
userSubmit.addEventListener("click", saveUser);

// Modals Logic
let closeModal = document.querySelector(".close")
closeModal.addEventListener("click", clearModal);
// Close Modal when clicked outside of modal-container
window.addEventListener("click", outsideModal);

let exit = document.querySelector(".exit");
exit.addEventListener("click", clearModal);

let clearScores = document.querySelector(".clear");
clearScores.addEventListener("click", clearLeaderBoard);


// Initalization Function: Function will look into local
//    storage, convert JSON objct into JavaScript object,
//    and sort through object array for highest score.

function initialize() {

    // IF there is nothing stored currently in local storage add some filler data
    if (localStorage.length === 0) {
        // Create a variable to keep our high scores
        highScoreArray = [
            {
                username: "John Hancock",
                score: 1776
            },
            {
                username: "Beef Wellington",
                score: 21
            },
            {
                username: "Napolean Bonaparte",
                score: 83
            }
        ];

        localStorage.setItem("userScores", JSON.stringify(highScoreArray));
    }

    // Pull out scores from the localStorage OBJECT
    let findTopScore = localStorage.getItem("userScores");

    // Parse the string JSON object into a JavaScript Object
    let parsedScore = JSON.parse(findTopScore);
    console.log(parsedScore);

    // create a variables to hold the max score by which user;
    let max = 0;
    let user;

    // Iterates through scores to find the top score
    for (let i = 0; i < parsedScore.length; i++) {
       //Conditional if statement
        if (max < parsedScore[i].score) {
            // Updates user score
            max = parsedScore[i].score;
            user = parsedScore[i].username;
        }
    }

    questionDiv.classList.add("hide");
    formDiv.classList.add("hide");
    highScoreModal.classList.add("hide");

}

// Initializes app
initialize();


// newGame function

function newGame() {
    // Set activeGame variable to FALSE and start game
    activeGame = false;
    // Resets score
    gameScore = 0;

    // Initalize question set with index 0
    presentQ = 0;

    // Resets answers for new game
    userAnswers = [];

    // Start timer
    // Define amount of game time (in seconds)
    timeRemaing = 100;
    // call timer function to initiate timerInterval
    timer();
    // Display time via DOM
    time.textContent = timeRemaing;

    // Hide 'welcome-container' div
    welcomeDiv.classList.add("hide");
    // Un-hide 'question-container' div
    questionDiv.classList.remove("hide");

    // Run check function
    check();
}


// Timer

function timer() {
     // Create a new timer
    timerInterval = setInterval(function() {
        // decrement timer timeRemaing
        timeRemaing--;
        // display update via DOM
        time.textContent = timeRemaing;

        // Test - Time runs out 
        if (timeRemaing <= 0) {
            // Run gameOver function
            gameOver();
        }



    }, 1000)  // Run every 1000 ms
}



// Check Functions

function check() {
    // TEST HOW MANY QUESTIONS LEFT
    if (presentQ === numQuestions) {
        // Run gameOver function
        gameOver();
    } else {
        loadQuestion();
    }
} 



// loadQuestion

function loadQuestion() {
    // Question title string
    qTitle.textContent = '';
    qChoices.textContent = '';

    for (let i = 0; i < questions[presentQ].choices.length; i++) {
        qTitle.textContent = questions[presentQ].title;

        //Creates a new li element --//

        // Create li element for each answer choice
        let ansChoice = document.createElement("li");
        // Add 'id' attribute to each choice 
        ansChoice.setAttribute("id", i);
        // Add 'data' attribute to each choice
        ansChoice.setAttribute("data-name", `data-choice-${i}`);
        ansChoice.setAttribute("value", questions[presentQ].choices[i]);
        // Add our class containing the CSS styling 
        ansChoice.classList.add("ans-choice");


        // Add event listener
        ansChoice.addEventListener("click", next)
        // Update text of li element
        ansChoice.textContent = questions[presentQ].choices[i];

        // Add answer choice to <ul> DOM
        qChoices.appendChild(ansChoice);

        //console.log test for userAnswerScore

        console.log(gameScore);
    }

}


// Function for user answer

function next(event) {
    // inspecting console output to debug event targeting issues
    // console.log(event);
   //  console.log(event.target);
  //  console.log(event.target.id);
   // console.log(event.target.innerText);

    if(event.target.innerText === questions[presentQ].answer) {
        gameScore += 50;
    }
        // Incorrect answer timer penalty

 if (event.target.innerText !== questions[presentQ].answer) {
            timeRemaing -= 30;
          //  console.log(timeRemaing);
        }
        
    // Increment presentQ
    presentQ++;

    // Run check
    check();
}


// function for ending game
// Updates gameEnd variable, clears the timer interval, displays end game text 
// calls the scoring function and the username form

function gameOver() {
    // Set activeGame variable to TRUE
    activeGame = true;

    // Clear timer
    clearInterval(timerInterval);
    time.textContent = "- -";

    // Add any time left to game score
    gameScore += timeRemaing;

 
    // Hide question container
    questionDiv.classList.add("hide");

    // Show gameScore
    score.textContent = gameScore;
    // Un-hide form container
    formDiv.classList.remove("hide");
    // Clear form input field
    username.value = '';
}


// Function for saving score

function saveUser(event) {
    // Prevent the form from reloading the page
    event.preventDefault();
    // Check that the input is NOT empty
    if (username.value == '') {
        return;
    }

    let tempArray = localStorage.getItem("userScores");
    // TEST Do we have a JSON object called 'userScores' stored in localStorage?
    let parsedTempArray = JSON.parse(tempArray);
    // IF we DO have stored data in localStorage run the following
    if (parsedTempArray !== null) {
        // Add current game score to high score array
        parsedTempArray.push(
            {
                username: username.value,
                score: gameScore
            }
        );

        // Sort data from highest to lowest before storing in localStorage
        sortScores(parsedTempArray);

        // Save updated JavaScript OBJECT to local storage by turning it into a JSON OBJECT
        localStorage.setItem('userScores', JSON.stringify(parsedTempArray));
    } else {  
        // ELSE - the userScores OBJECT was cleared and we need to create a new ARRAY to put our JS Object into, convert it and store it.
        let highScoreArray = [];
        // Add current game score to high score array
        highScoreArray.push(
            {
                username: username.value,
                score: gameScore
            }
        );
        localStorage.setItem('userScores', JSON.stringify(highScoreArray));
    }
    // Clear form input field
    username.value = '';
    // Display the Leaderboard
    showLeader();
}


// Leader Board Function: Function will pull userScore OBJECT
//     from local storage and create a leader board div

function showLeader() {
    // Hide All Container Divs
    formDiv.classList.add("hide");
    questionDiv.classList.add("hide");
    welcomeDiv.classList.add("hide");

    // Un-hide leader board modal container
    highScoreModal.classList.remove("hide");

    // Clear the users and scores from <ul id='highscores'>
    leaderboard.innerHTML = "";

    let highScoreBoard = localStorage.getItem('userScores');
    let parsedScoreBoard = JSON.parse(highScoreBoard);

    // Shows high scores
    for (let i = 0; i < parsedScoreBoard.length; i++) {
        let newScore = document.createElement("li");
        newScore.textContent = parsedScoreBoard[i].username + " : " + parsedScoreBoard[i].score;
        newScore.classList.add("score-item");
        leaderboard.appendChild(newScore);
    }
}


// Function will sort the Leaderboard into high to low scores

function sortScores(scoreObj) {
    // Sort through the Object and return scores highest to lowest
    scoreObj.sort( function(a, b) {
        // Sort by the score values in the array of objects
        return b.score - a.score;
    });
}


// Clear Leader Board Function: Function will clear userScore OBJECT from local storage

function clearLeaderBoard() {
    // Clear what is in localStorage
    localStorage.removeItem("userScores");

    // TEST to make sure it cleared
    console.log("Scores Cleared");
    console.log(localStorage);
    // Clear the <ul> DOM element
    leaderboard.innerHTML = "";
}


// Clear Modals 

function clearModal() {
    // hide modal
    highScoreModal.classList.add("hide");
    // unhide
    welcomeDiv.classList.remove("hide");
}

function outsideModal(event) {
    if (event.target == highScoreModal) {
        // hide modal
        highScoreModal.classList.add("hide");
        // Unhide
        welcomeDiv.classList.remove("hide");
    }
} 



// Questions object array

const qs = [
  {
    question: "1. What is a 'named storage' for any piece of data?",
    choices: ["Bucket", "Variable", "Placeholder"],
    correct: 1,
  },
  {
    question:
      "2. A set of statements that performs a task or calculates a value is called?",
    choices: ["Recipe", "Method", "Function"],
    correct: 2,
  },
  {
    question: "3. What is an indexed list of zero or more data types?",
    choices: ["List", "Array", "Object"],
    correct: 1,
  },
  {
    question:
      "4. What is a collection of key value pairs stored in properties called?",
    choices: ["Parameter", "Subject", "Object"],
    correct: 2,
  },
];

// Variables declared

let currentQuestion = 0;
let correctAnswers = 0;
let timerInterval;
let timeEl = document.querySelector(".time");
let mainEl = document.getElementById("main");
let secondsLeft = 35;
let highScores = JSON.parse(localStorage.getItem("Scores")) || [];
let initials;
const startTimer = document.querySelector(".start");
const showLeader = document.getElementById("goLeaderboard");
const container = document.querySelector(".container");
const questionArea = document.querySelector(".questionArea");
const choices = document.querySelectorAll(".choice");
const feedback = document.getElementById("feedback");
const form = document.getElementById("form");
// const leaderInput = document.querySelector(".leader");
const inputField = document.querySelector('input[type="text"]');
const leaderboard = document.getElementById("leaderboard");

//  Start button
startTimer.addEventListener("click", setTime);
startTimer.addEventListener("click", firstReveal);

// Leaderboard button
showLeader.addEventListener("click", showLeaderB);

function showLeaderB() {
  if (leaderboard.classList.contains("none")) {
    leaderboard.classList.toggle("none");
    updateLeaderboard();
  } else {
    updateLeaderboard();
  }
}

// Timer section

function setTime() {
  timerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft === 0 || secondsLeft < 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      sendMessage();
      questionArea.innerHTML = `<p>You got <strong>${correctAnswers}</strong> out of <strong>${qs.length}</strong> questions right.</p>
        `;
    } else if (secondsLeft > 1) {
      timeEl.textContent = secondsLeft + " seconds left.";
    } else {
      timeEl.textContent = secondsLeft + " second left.";
    }
  }, 1000);
}

// Reveals quiz questions container

function firstReveal() {
  container.classList.toggle("none");
  startTimer.classList.toggle("none");
}

//  Show next question

function showQuestion() {
  const questionText = document.getElementById("question-text");
  questionText.textContent = qs[currentQuestion].question;
  choices.forEach((choice, index) => {
    choice.textContent = qs[currentQuestion].choices[index];
  });
  feedback.textContent = ""; //  resets feedback
}

//  Checks whether answer is correct and calls next question or quiz complete message

choices.forEach((choice, index) => {
  choice.addEventListener("click", () => {
    checkAnswer(index);
  });
});

function checkAnswer(index) {
  if (index === qs[currentQuestion].correct) {
    feedback.style.color = "red";
    feedback.innerHTML = "<em>--Correct!</em>";
    correctAnswers++;
  } else {
    feedback.style.color = "red";
    feedback.innerHTML = "<em>--Incorrect!</em>";
    //  subtract time from timer on wrong answer
    subtract();
    function subtract() {
      secondsLeft -= 5;
    }
  }
  // timed interval to load next question
  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < qs.length) {
      showQuestion();
    } else {
      questionArea.innerHTML = `<p>You got <strong>${correctAnswers}</strong> out of <strong>${qs.length}</strong> questions right.</p>
        `;
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 2000);
}

// Quiz complete message

function sendMessage() {
  timeEl.textContent = "Quiz complete";
  form.classList.toggle("hidden");
}

//  Submit button actions

const submit = document.querySelector("#submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();
  form.classList.toggle("hidden");
  container.classList.toggle("none");
  showLeaderB();
  addHighScore(initials, correctAnswers);
});

// Event listener at input to

inputField.addEventListener("input", () => {
  // Retrieve high scores from local storage
  initials = inputField.value;
});

// Function to add a new high score as local storage object array Scores
function addHighScore(name, score) {
  highScores.push({ name, score });
  // Update local storage
  localStorage.setItem("Scores", JSON.stringify(highScores));
  updateLeaderboard();
}

// Update the leaderboard
function updateLeaderboard() {
  highScores.sort((a, b) => b.score - a.score);
  const leaderboardList = document.getElementById("leaderboard-list");
  leaderboardList.innerHTML = ""; // Clear previous entries

  highScores.slice(0, 3).forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${score.name}: got a ${score.score}`;
    leaderboardList.appendChild(listItem);
  });
}

//  Restart quiz app

const restart = document.querySelector(".restart");
restart.addEventListener("click", function () {
  document.location.reload();
});

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

// Variables declared and event listeners

let currentQuestion = 0;
let correctAnswers = 0;
let timerInterval;
let timeEl = document.querySelector(".time");
let mainEl = document.getElementById("main");
let secondsLeft = 30;

const container = document.querySelector(".container");
const questionArea = document.querySelector(".questionArea");

//  Start button
const startTimer = document.querySelector(".start")
  startTimer.addEventListener("click", setTime);
  startTimer.addEventListener("click", removeClassNone);

const choices = document.querySelectorAll(".choice");
choices.forEach((choice, index) => {
  choice.addEventListener("click", () => {
    checkAnswer(index);
  });
});

// Input listener to set local storage vars: initials & score
const inputField = document.querySelector('input[type="text"]');
inputField.addEventListener('input', function() {
  const inputText = inputField.value;
  localStorage.setItem("initials", inputText);
  localStorage.setItem("score", correctAnswers);

});

// timer section

function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left.";

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      sendMessage();
      questionArea.innerHTML = `<p>You got <strong>${correctAnswers}</strong> out of <strong>${qs.length}</strong> questions right.</p>
        `;
    }
  }, 1000);
}
// reveals quiz questions container

function removeClassNone() {
  container.classList.toggle("none");
  console.log("toggle container unhidden, start hidden");
  startTimer.classList.toggle("none");
}

//  Show next question

function showQuestion() {
  const questionText = document.getElementById("question-text");
  questionText.textContent = qs[currentQuestion].question;

  const choices = document.querySelectorAll(".choice");
  choices.forEach((choice, index) => {
    choice.textContent = qs[currentQuestion].choices[index];
  });

  const feedback = document.getElementById("feedback");
  feedback.textContent = ""; //  resets feedback
}
//  Checks whether answer is correct and calls next question or quiz complete message

function checkAnswer(index) {
  const feedback = document.getElementById("feedback");
  if (index === qs[currentQuestion].correct) {
    feedback.style.color = "red";
    feedback.innerHTML = "<em>--Correct!</em>";
    correctAnswers++;
  } else {
    feedback.style.color = "red";
    feedback.innerHTML = "<em>--Incorrect!</em>";
    //     subtract time from timer
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
  document.querySelector(".leader").classList.toggle("hidden");  
}

//  Submit button actions

const submit = document.querySelector("#submit");
  submit.addEventListener("click",function(event){
  event.preventDefault();
  document.querySelector("#form").classList.toggle("none");
  document.getElementById("leaderboard").classList.toggle("none");
  container.classList.toggle("none");
  getRoster();
})

// Leaderboard Scores Roster

function getRoster() {
// Get a value from local storage
const myInitials = localStorage.getItem("initials");
console.log(myInitials);
const  roster1= document.querySelector(".init");
roster1.append(`Init: ${myInitials}`);
const myScore = localStorage.getItem("score");
const rosterScore = document.querySelector(".score-li");
console.log(myScore);
rosterScore.append("Score: " + parseInt(myScore));

}

//  Restart quiz app

const restart = document.querySelector(".restart");
  restart.addEventListener("click",function() {
    document.location.reload();
  });



  const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", toggleHidden);
function toggleHidden() {
  console.log("clicked");
  container.classList.toggle("none");
}
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

let currentQuestion = 0;
let correctAnswers = 0;
let timerInterval;

const startTimer = document.querySelector(".start")
  startTimer.addEventListener("click", setTime);
  startTimer.addEventListener("click", removeClassHidden);

const container = document.querySelector(".container");
  
const choices = document.querySelectorAll(".choice");
choices.forEach((choice, index) => {
  choice.addEventListener("click", () => {
    checkAnswer(index);
  });
});
const questionArea = document.querySelector(".questionArea");
const inputField = document.querySelector('input[type="text"]');

inputField.addEventListener('input', function() {
  const inputText = inputField.value;
  localStorage.setItem("initials", inputText);
  localStorage.setItem("score", correctAnswers);

});

const submit = document.querySelector("#submit");
  submit.addEventListener("click",function(event){
  event.preventDefault();
  console.log("prevent default")
  document.querySelector("#form").classList.toggle("hidden");
  console.log("form hidden toggled");
  document.getElementById("leaderboard").classList.toggle("hidden");
  console.log("leaderboard hidden toggled");
  container.classList.add("none");
  console.log("conatiner hidden toggled");
  getRoster();
})

// timer section

let timeEl = document.querySelector(".time");
let mainEl = document.getElementById("main");
let secondsLeft = 30;

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

function removeClassHidden() {
  container.classList.toggle("hidden");
  console.log("toggle container hidden, start hidden");
  startTimer.classList.add("none");
}

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

function sendMessage() {
  timeEl.textContent = "Quiz complete";
  document.querySelector(".leader").classList.toggle("hidden");  
}

function getRoster() {
// Get a value from local storage
const myInitials = localStorage.getItem("initials");
console.log(myInitials);
const  roster1= document.querySelector(".init");
roster1.append(myInitials);
const myScore = localStorage.getItem("score");
const rosterScore = document.querySelector(".score-li");
console.log(myScore);
rosterScore.append(parseInt(myScore));

}
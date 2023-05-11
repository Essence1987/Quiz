// An array of objects that contains quiz questions and answers
const questions = [
  {
    question: "What is my name?",
    choices: ["Holden", "Haley", "Jordan", "Kenzie"],
    answer: 0
  },
  {
    question: "How old am I?",
    choices: ["18", "36", "24", "30"],
    answer: 1
  },
  {
    question: "What is my favorite holiday?",
    choices: ["Christmas", "Halloween", "New Years", "Easter"],
    answer: 0
  },
  {
    question: "How many kids do I have?",
    choices: ["1", "3", "2", "4"],
    answer: 2
  }
];

// Keep track of the current question being displayed
let currentQuestion = 0;

// Set the starting time for the timer
let timeLeft = 30;

// A function that displays the timer
function showTimer() {
  const timerElement = document.createElement("div");
  timerElement.id = "timer";
  timerElement.innerText = `Time left: ${timeLeft}s`;
  document.querySelector("#quiz").appendChild(timerElement);

  // Update the timer every second
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      quizComplete();
    }
  }, 1000);
}

// A function that displays a question and its choices
function showQuestion() {
  const questionElement = document.createElement("div");
  questionElement.id = "question";
  questionElement.innerText = questions[currentQuestion].question;

  const choicesElement = document.createElement("div");
  choicesElement.id = "choices";

  // Loop through each choice for the current question and create an HTML element for it
  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    const choiceElement = document.createElement("div");
    choiceElement.classList.add("choice");
    choiceElement.innerText = questions[currentQuestion].choices[i];
    choiceElement.setAttribute("data-answer", i);
    choiceElement.addEventListener("click", handleChoice);
    choicesElement.appendChild(choiceElement);
  }

  // Add the question and choices elements to the quiz container
  const quizElement = document.querySelector("#quiz");
  quizElement.innerHTML = "";
  quizElement.appendChild(questionElement);
  quizElement.appendChild(choicesElement);

  // Show the timer
  showTimer();
}

// A function that handles a choice being clicked
function handleChoice(event) {
  const selectedChoice = event.target;
  const selectedAnswer = selectedChoice.dataset.answer;
  const correctAnswer = questions[currentQuestion].answer;
  const resultElement = document.createElement("div");
  resultElement.classList.add("result");

  // Check if the selected answer matches the correct answer
  if (selectedAnswer == correctAnswer) {
    resultElement.innerText = "Correct!";
    resultElement.classList.add("correct");
  } else {
    resultElement.innerText = "Incorrect!";
    resultElement.classList.add("incorrect");
  }

  // Add the result element to the results container
  const resultsElement = document.querySelector("#results");
  resultsElement.innerHTML = "";
  resultsElement.appendChild(resultElement);

  // Move to the next question if there are more questions, or end the quiz if there are no more questions
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    quizComplete();
  }
}

// A function that displays a "quiz complete" message
function quizComplete() {
  const quizElement = document.querySelector("#quiz");
  quizElement.innerHTML = "";
  const resultsElement = document.querySelector("#results");
  resultsElement.innerHTML = "Quiz complete!";
}

// Display the first question when the page loads
window.addEventListener('load', function() {
  showQuestion();
});

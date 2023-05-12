// An array of objects that contains quiz questions and answers
const questions = [
  {
    question: "The ______ statement evaluates a condition in parentheses and, if the result is true, executes a block of code.",
    choices: ["else", "if", "let", "alert"],
    answer: 1
  },
  {
    question: "What is the comparison operator for Equals?",
    choices: [">", "!=", "=", "=="],
    answer: 3
  },
  {
    question: "The OR operator is represented by what symbol?",
    choices: ["||", "&&", "!", "??"],
    answer: 0
  },
  {
    question: "This is made of characters. It is always kept in double quotations?",
    choices: ["Number", "String", "Boolean", "Object"],
    answer: 1
  },
  {
    question: "_____ is a non-primitive datatype in javascript which used to store multiple values.",
    choices: ["var", "function", "arrays", "syntax"],
    answer: 2
  },
  {
    question: "Events can be generated in two ways, one is by the user and another is by what?",
    choices: ["API", "Listener", "Boolean", "Arrays"],
    answer: 0
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    choices: ["<script>", "<js>", "<scripting>", "<javascript>"],
    answer: 0
  },
  {
    question: "A ________ is a plain JavaScript function passed to some method as an argument or option.",
    choices: ["closure", "index", "executed", "callback"],
    answer: 3
  }
];

// Keep track of the current question being displayed
let currentQuestion = 0;

// Set the starting time for the timer
let timeLeft = 60;

// A function that displays the timer
function showTimer() {
    const timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.innerText = `Time left: ${timeLeft}s`;
    document.querySelector("#quiz").appendChild(timerElement);
  
    // Start the timer only if it hasn't been started yet
  if (currentQuestion === 0) {
    const timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.innerText = `Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        quizComplete();
      }
    }, 1000);
  }
    
    // Update the score based on the remaining time when the quiz is complete
    if (currentQuestion === questions.length) {
      score += timeLeft;
    }
  }

  
// A function that displays a question and its choices
function showQuestion() {
  document.getElementById('start-container').style.display = "none";
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

// A variable to store the start time of each question
let questionStartTime;

// A variable to store the user's score
let score = 0;

// A function that handles a choice being clicked
function handleChoice(event) {
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset.answer;
    const correctAnswer = questions[currentQuestion].answer;
    const resultContainer = document.createElement("div"); // Create a container element
    resultContainer.style.textAlign = "center"; // Set the container element's text-align property to center
    const resultElement = document.createElement("div");
    resultElement.classList.add("result");
  
    // Check if the selected answer matches the correct answer
    if (selectedAnswer == correctAnswer) {
      const endTime = Date.now();
      // Converts milliseconds to seconds
      const timeTaken = (endTime - questionStartTime) / 1000;
      // Add to the user's score based on how quickly they answered the question correctly.
      if (timeTaken <= 30) {
        score += 30 - Math.floor(timeTaken);
      }
      resultElement.innerText = "Correct!";
      resultElement.classList.add("correct");
  
      // Move to the next question if there are more questions
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        // Update the score based on the remaining time when the quiz is complete
        score += timeLeft;
        quizComplete();
      }
  
      // Add the result element to the results container
      const resultsElement = document.querySelector("#results");
      resultsElement.innerHTML = "";
      resultContainer.appendChild(resultElement); // Append the result element to the container element
      resultsElement.appendChild(resultContainer); // Append the container element to the results container
  
      // Show the final score if the quiz is complete
      if (currentQuestion === questions.length) {
        quizComplete();
      }
    } else {
      resultElement.innerText = "Incorrect! Please try again.";
      resultElement.classList.add("incorrect");
  
      // Add the result element to the results container
      const resultsElement = document.querySelector("#results");
      resultsElement.innerHTML = "";
      resultContainer.appendChild(resultElement); // Append the result element to the container element
      resultsElement.appendChild(resultContainer); // Append the container element to the results container
    }
  }

// A function that displays a "quiz complete" message with the user's score
function quizComplete() {
    
    const quizElement = document.querySelector("#quiz");
    quizElement.innerHTML = "";
  
    const resultsElement = document.querySelector("#results");
    resultsElement.innerHTML = "Quiz complete! Your score is " + score + ".";
    resultsElement.classList.add("center");
  }
  
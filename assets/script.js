// Steps to be completed:
// 1. create a HTML with sections to hold the JS code.
// 2. Add a start button that begins the code on click (event listener).
// 3. formulate the questions and their multiple choice answers.
// 4. create a response to a correct answer and a response to an incorrect answer.
// 5. create a scoring system for answers given.
// 6. Add a timerInterval that counts down and reduces time on a wrong answer.
// 7. once the timer hits zero or all questions answered, end the quiz.
// 8. store the score on the local storage and display.
const headerEl = document.getElementById('header')
const startButton = document.getElementById('start-btn')
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById ('answer-buttons')
const timerEl = document.getElementById("timer");

let questionsShuffled, currentQuestion;
let timeLeft, timerInterval;

startButton.addEventListener('click', startGame);

function startGame() {
    console.log('started');
    headerEl.classList.add('hidden');
    startButton.classList.add('hidden');
    startTimer()
    questionsShuffled = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionContainerEl.classList.remove('hidden');
setNextQuestion();
}

function startTimer() {
    const timerLength = 70;
    timeLeft = timerLength;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.innerText = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        timerEl.innerText = "Time's up!";
      }
    }, 1000);
  }

function setNextQuestion(){
    resetState();
    if (currentQuestion >= questionsShuffled.length) {
        return saveScore();
    }
    showQuestion(questionsShuffled[currentQuestion]);
    currentQuestion++;
}

function showQuestion(question){
questionEl.innerText = question.question;
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('button')
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener ('click', selectAnswer)
    answerButtonsEl.appendChild(button)
})
}

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    if (selectedButton.dataset.correct === undefined) {
        var correct = false;
    } else {
        var correct = selectedButton.dataset.correct;
    }

    if (correct === false) {
        timeLeft -= 10;
        timerEl.innerText = timeLeft;
      };
      console.log(correct)
    setNextQuestion();
}

function saveScore() {
    localStorage.setItem('score', timeLeft);
    clearInterval(timerInterval);
    timerEl.innerText = "Game Over!";
    createForm();
}

function createForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter your initials';
    form.appendChild(input);
    const button = document.createElement('button');
    button.innerText = 'Submit';
    form.appendChild(button);
    form.addEventListener('submit', event => {
        event.preventDefault();
        const initials = input.value;
        const score = timeLeft;
        localStorage.setItem('initials', initials);
        localStorage.setItem('score', score);
        window.location.href = 'highscores.html';
    });
    document.body.appendChild(form);
  }

const questions = [
    {
        question: 'Commonly used data types DO NOT include?',
        answers: [
            { text: '1. strings', correct: false },
            { text: '2. boolean', correct: false },
            { text: '3. alerts', correct: true },
            { text: '4. numbers', correct: false },
        ]
    },
    {
        question: 'The condition in an if/else is enclosed within _____',
        answers: [
            {text: '1. quotes', correct: false},
            {text: '2. curly brackets', correct: false},
            {text: '3. parentheses', correct: true},
            {text: '4. square brackets', correct: false},
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ______',
        answers: [
            {text: '1. numbers & strings', correct: false},
            {text: '2. other arrays', correct: false},
            {text: '3. booleans', correct: false},
            {text: '4. all of the above', correct: true},
        ]
    },
    {
        question: 'String values must be enclosed within ______ when being assigned to variables.',
        answers: [
            {text: '1. commas', correct: false},
            {text: '2. curly brackets', correct: false},
            {text: '3. quotes', correct: true},
            {text: '4. parentheses', correct: false},
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is',
        answers: [
            {text: '1. JavaScript', correct: false},
            {text: '2. terminal/bash', correct: false},
            {text: '3. for loops', correct: false},
            {text: '4. console log', correct: true},
        ]
    },
]
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is the best HTML for creating hyperlinks?',
        choice1: '<img src="image.gif" alt="MyImage">',
        choice2: '<a href="url" target="_blank">',
        choice3: '<a href="http://www.w3schools.com">W3schools</a>',
        choice4: 'var colors = ["red", "green", "blue"]',
        answer: 3,
    },
    {
        question: 'How can you open a link in a new tab/browser window?',
        choice1: 'text-transform:capitalize',
        choice2: '<a href="url" target="_blank>',
        choice3: '<a href="http://www.w3schools.com">W3schools</a>',
        choice4: '<img src="image.gif" alt="MyImage">',
        answer: 2,
    },
    {
        question: 'How can you make a bulleted list?',
        choice1: 'div p',
        choice2: '<ul>',
        choice3: '#demo',
        choice4: 'navigator.appName',
        answer: 2,
    },
    {
        question: 'What is the correct HTML element for playing video files?',
        choice1: '<video>',
        choice2: '<tite>',
        choice3: '<audio>',
        choice4: '<textarea>',
        answer: 1,
    },
    {
        question: 'What does CSS stand for?',
        choice1: '<input type="text">',
        choice2: 'body {color: black;}',
        choice3: '<!DOCTYPE html>',
        choice4: 'Cascading Style Sheets',
        answer: 4,
    },
    {
        question: 'How do you add a background color for all <h1> elements?',
        choice1: 'a {text-decoration:none;}',
        choice2: 'text-transform:capitalize',
        choice3: 'h1 {background-color:#FFFFFF;}>',
        choice4: '<a href="url" target="_blank">',
        answer: 3,
    },
    {
        question: 'Which CSS property is used to change the text color of an element?',
        choice1: '<meter>',
        choice2: 'color',
        choice3: 'style',
        choice4: '<style>',
        answer: 2,
    },
    {
        question: 'How do you make each word in a text start with a capital letter?',
        choice1: 'h1 {background-color:#FFFFFF;}',
        choice2: 'a {text-decoration:none;}',
        choice3: 'text-transform:capitalize',
        choice4: 'alert("Hello World");',
        answer: 3,
    },
    {
        question: 'How do you select all p elements inside a div element?',
        choice1: 'div p',
        choice2: '<title>',
        choice3: 'Math.round(7.25',
        choice4: 'p',
        answer: 1,
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        choice1: '<img src="image.gif" alt="MyImage">',
        choice2: '<a href="http://www.w3schools.com">W3schools</a>',
        choice3: 'var colors = ["red", "green", "blue"]',
        choice4: 'Both the <head> section and the <body> section are correct',
        answer: 4,
    },
    {
        question: 'How does a FOR loop start??',
        choice1: 'function myFunction()',
        choice2: 'font-weight:bold;',
        choice3: 'Cascading Style Sheets',
        choice4: 'for (i = 0; i <= 5; i++)',
        answer: 4,
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        choice1: 'font-family',
        choice2: 'if (i= 5)',
        choice3: 'if (i == 5)',
        choice4: 'myFunction()',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 12

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/endjgja;fkj.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    questions.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice=> {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'incorrect' : 'correct'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 500)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
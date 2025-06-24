const questions = [
    {
        question: "What is the captial of South Korea?",
        answers: [
            { text: "Seoul", correct: true },
            { text: "Busan", correct: false },
            { text: "Incheon", correct: false },
            { text: "Gwangju", correct: false }
        ]
    },
    {
        question: "How many members are in BTS?",
        answers: [
            { text: "8", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "9", correct: false }
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Tamil Nadu", correct: false },
            { text: "Gujarat", correct: false },
            { text: "Kerala", correct: false },
            { text: "New Delhi", correct: true }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "CO", correct: false },
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "Na ", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()  {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;


currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
});

}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScrore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScrore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();

const question = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
        ]
    },
    {
        question: "What is the capital of India",
        answer: [
            { text: "Mumbai", correct: false },
            { text: "Pune", correct: false },
            { text: "Delhi", correct: true },
            { text: "Indore", correct: false },
        ]
    },
    {
        question: "What is the name of India's PM",
        answer: [
            { text: "Naredra modi", correct: true },
            { text: "shivraj singh", correct: false },
            { text: "JP nadda", correct: false },
            { text: "Amit shah", correct: false },
        ]
    },
    {
        question: "Which is the longest river in the world",
        answer: [
            { text: "Ganga", correct: false },
            { text: "Neel", correct: true },
            { text: "yamuna", correct: false },
            { text: "Sindhu", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");

const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;

let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
const selectBtn = e.target;
const isCorrect = selectBtn.dataset.correct === "true";
if(isCorrect){
    selectBtn.classList.add("correct");
score++;
}
else{
    selectBtn.classList.add("incorrect")
}
Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct === "true"){
        button.classList.add("correct")
    };
    nextBtn.style.display = "block"
});
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextBtn.innerHTML = "play Again";
    nextBtn.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex<question.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex<question.length){
        handleNextButton();
    }
    else{
        startQuiz()
    }
})
startQuiz()
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choiceText'));
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
        question: "Reign in Blood from Slayer was released in?",
        option1: "1986",
        option2: "1999",
        option3: "2001",
        option4: "1992",
        answer: 1
    },
    {
        question: "Who was the original vocalist of Cannibal Corpse??",
        option1: "David Bowie",
        option2: "Adam Sandler",
        option3: "Chris Barnes",
        option4: "Paul Rudd",
        answer: 3
    },
    {
        question: "What instrument did (RIP) Cliff Burton play?",
        option1: "Tuba",
        option2: "Bass",
        option3: "Drums",
        option4: "Guitar",
        answer: 2
    },
    {
        question: "What country is Wacken Open Air held in?",
        option1: "Sweden",
        option2: "Denmark",
        option3: "Germany",
        option4: "Australia",
        answer: 3
    },
    {
        question: "What year did thrashers Municipal Waste form?",
        option1: "2001",
        option2: "1998",
        option3: "2004",
        option4: "1996",
        answer: 1
    },
    {
        question: "Norway is best known for producing what sub genre of metal?",
        option1: "Death",
        option2: "Thrash",
        option3: "Black",
        option4: "Jazz",
        answer: 3
    },
    {
        question: "Who came up with the now infamous “devil horns”?",
        option1: "Ronnie James Dio",
        option2: "Fred Durst",
        option3: "Lars Ulrich",
        option4: "Tim Allen",
        correctAnswer: 1
    },
    {
        question: "Legendary Canadian grind band Cryptopsy is from what city?",
        option1: "Calgary",
        option2: "Toronto",
        option3: "Montreal",
        option4: "Halifax",
        answer: 3
    },
    {
        question: "Finish this album title, “Slaughter of the……”?",
        option1: "Face",
        option2: "Mind",
        option3: "Soul",
        option4: "Nose",
        answer: 3
    },
    {
        question: "What year did the legendary Napalm Death form?",
        option1: "1981",
        option2: "1985",
        option3: "1995",
        option4: "2006",
        answer: 1
    },
]

const scorePoints = 100;
const maxQuestions = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(option => {
        const number = option.dataset['number'];
        option.innerText = currentQuestion['option' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(scorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
    })
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
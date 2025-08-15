const words = ['cat', 'elephant', 'country', 'pineapple', 'cherry', 'travelling', 'table', 'weather', 'banana', 'number', 'insects', 'plane'];
const wordElement = document.querySelector('.word');
const statisticElement = document.querySelector('.status');
const correctCountElement = document.querySelector('.correct-count');
const wrongCountElement = document.querySelector('.wrong-count');
const wordMistakesElement = document.querySelector('.word-mistakes');
const timerElement = document.getElementById('timer');

let currentWord = '';
let currentLetterIndex = 0;
let correctWords = 0;
let wrongWords = 0;
let currentWordMistakes = 0;
let timerInterval;
let seconds = 0;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function displayWord() {
    wordElement.innerHTML = '';
    for (let i = 0; i < currentWord.length; i++) {
        const span = document.createElement('span');
        span.textContent = currentWord[i];
        wordElement.append(span);
    }
}

function resetGame() {
    correctWords = 0;
    wrongWords = 0;
    upgradeStatistic();
    stopTimer();
    startTimer();
}

function checkWordsCount() {
    if (wrongWords === 5) {
        alert(`Вы проиграли :( Ваше время ${timerElement.textContent})`);
        resetGame();
    }

    if (correctWords === 5) {
        alert(`Победа! Ваше время ${timerElement.textContent}`);
        resetGame();
    }
}

function startNewWord() {
    checkWordsCount();
    currentWord = getRandomWord();
    currentLetterIndex = 0;
    displayWord();
    
}

function upgradeStatistic() {
    correctCountElement.textContent = correctWords;
    wrongCountElement.textContent = wrongWords;
    wordMistakesElement.textContent = currentWordMistakes;
}

function startTimer() {
    seconds = 0;
    timerElement.textContent = "00:00";

    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes < 10 ? "0" + minutes : String(minutes);
        const formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : String(remainingSeconds);

        timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}



document.addEventListener("keydown", (event) => {
    const typedChar = event.key;
    const expectedChar = currentWord[currentLetterIndex];
    const letterSpan = wordElement.children[currentLetterIndex];

    if (typedChar === expectedChar) {
        letterSpan.classList.remove('w');
        letterSpan.classList.add('c');
        currentLetterIndex++;

        if (currentLetterIndex === currentWord.length) {
            if (currentWordMistakes === 0) {
                correctWords++;
                upgradeStatistic();

            } else {
                wrongWords++;
                upgradeStatistic();
            }

            setTimeout(startNewWord, 100);
            currentWordMistakes = 0;
            upgradeStatistic();
        }
    } else {
        letterSpan.classList.add('w');
        currentWordMistakes++;
        upgradeStatistic();
    }

})


startNewWord();
startTimer();


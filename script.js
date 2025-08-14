const words = ['cat', 'elephant', 'country', 'pineapple', 'cherry', 'travelling', 'table', 'weather', 'banana', 'number', 'insects', 'plane'];
const wordElement = document.querySelector('.word');
const statisticElement = document.querySelector('.status');
const correctCount = document.querySelector('.correct-count');
const wrongCount = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');
const timerElement = document.getElementById('timer');

let currentWord = '';
let currentLetterIndex = 0;
let correctWords = 0;
let wrongtWords = 0;
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

function startNewWord() {
    currentWord = getRandomWord();
    currentLetterIndex = 0;
    displayWord();
}

function upgradeStatistic() {
    correctCount.textContent = correctWords;
    wrongCount.textContent = wrongtWords;
    wordMistakes.textContent = currentWordMistakes;
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

                if (correctWords === 5) {
                    stopTimer();
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;

                    const formattedMinutes = minutes < 10 ? "0" + minutes : String(minutes);
                    const formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : String(remainingSeconds);

                    const timeMessage = `Ваше время: ${formattedMinutes}:${formattedSeconds}`;
                    setTimeout(alert('Вы выйграли' + ' ' + timeMessage), 1000);
                    correctWords = 0;
                    wrongtWords = 0;
                    upgradeStatistic();
                    

                }
                
                upgradeStatistic();

            } else {
                wrongtWords++;
                if (wrongtWords === 5) {
                    stopTimer();
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;

                    const formattedMinutes = minutes < 10 ? "0" + minutes : String(minutes);
                    const formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : String(remainingSeconds);

                    const timeMessage = `Ваше время: ${formattedMinutes}:${formattedSeconds}`;
                    setTimeout(alert('Вы проиграли' + ' ' + timeMessage), 1000);
                    correctWords = 0;
                    wrongtWords = 0;
                    upgradeStatistic();
                }
                
                upgradeStatistic();
            }


            setTimeout(startNewWord, 100);
            startTimer();
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


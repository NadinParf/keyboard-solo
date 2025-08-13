const words = ['cat', 'elephant', 'country', 'pineapple', 'cherry', 'travelling', 'table', 'weather', 'banana', 'number', 'insects', 'plane'];
const wordElement = document.querySelector('.word');

let currentWord = '';
let currentLetterIndex = 0;

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

document.addEventListener("keydown", (event) => {
    const typedChar = event.key;
    const expectedChar = currentWord[currentLetterIndex];
    const letterSpan = wordElement.children[currentLetterIndex];

    if (typedChar === expectedChar) {
        letterSpan.classList.remove('w');
        letterSpan.classList.add('c');
        currentLetterIndex++;
        if (currentLetterIndex === currentWord.length) {
           
            startNewWord();
            
        }
    } else {
        letterSpan.classList.add('w');
        
    }

})

startNewWord();

// не получается сделать чтобы текущее слово полностью окрашивалось в зеленый 
// перед тем как пояляется новое слово. Сейчас слово окрашивается в зеленый без 
// последней буквы. Если удалить startNewWord();
// из if (currentLetterIndex === currentWord.length), тогда все слово окршивается 
// как надо. 
// 
// Как совместить, чтобы слово полностью окрашивалось в зеленый перед появлением нового слова?
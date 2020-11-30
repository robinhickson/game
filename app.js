//Wheel of Success variation: 'Boxing Clever' game in JavaScript
// Global variables

//define and get the keyboard
const getQwerty = document.getElementById('qwerty');

//define and get the game phrase
const getPhrase = document.getElementById('phrase');

//define and get the start button + screen
const getBtn__Reset = document.querySelector('.btn__reset');
let hideOverlay = document.getElementById('overlay');

//define the array of phrases for the game
const phrases = [
    'float like a butterfly sting like a bee',
    'everybody has a plan until they get punched in the face',
    'if you work hard in training the fight is easy',
    'you never lose until you actually give up',
    'only about how hard you can get hit and keep moving forward',
    'sure the fight was fixed i fixed it with a right hand',
    'the question is not at what age i want to retire but what income',
];

//count the number of wrong guesses and end game message
let missedNumber;
let endGameMessage ='';
let winLose = document.getElementById('banner');

//initialise random phrase array and save
let getArray = [];
let chosenPhrase;


//Functions
//listen for game start button-click and (re)start game
const startGame = () => {

    //count the number of wrong guesses
    missedNumber = 0;

    // initialise html
    getPhrase.innerHTML = "";

    //hide overlay and reveal game
    hideOverlay.style.display = "none";
    getRandomPhraseAsArray(phrases);
}

// listen for reset
getBtn__Reset.addEventListener('click', () => {

    startGame();
});


//get a random phrase (as string array of letters) from the phrases array
const getRandomPhraseAsArray = arr => {
    let randomArray = Math.floor(Math.random() * arr.length);
    chosenPhrase = randomArray;
    randomArray = arr[randomArray];
    getArray = Array.from(randomArray);
    addPhraseToDisplay(randomArray);

};

//add the phrase to the display and add classes to letters to hide/show/add space
const addPhraseToDisplay = arr => {
    for (i = 0; i < arr.length; i++) {
        let phraseLetter = arr[i];
        let addLetter = document.createElement('li');
        addLetter.textContent = phraseLetter;
        if (phraseLetter === ' ') {
            phraseLetter = String.fromCharCode(160);
            addLetter.className = ('blankLetter');
        } else {
            addLetter.className = ('letter');
        }
        getPhrase.appendChild(addLetter);
    }
};



//check clicked button letter for match to letters in phrase
const checkLetter = button => {
    let buttonLetter = button.textContent;
    if (button.className !== 'chosen') {
        button.className = 'chosen';
        if (getArray.includes(buttonLetter)) {
            button.style.display = 'none';
            let getLetters = document.querySelectorAll('.letter');
            for (i = 0; i < getLetters.length; i++) {
                if (buttonLetter === getLetters[i].textContent) {
                    getLetters[i].className = ('letter show');
                }
            }
        } else {
            missedNumber ++;
            let liTriesParent = document.querySelector('ol');
            let removeChildLi = liTriesParent.firstElementChild;
            if (removeChildLi) {
                liTriesParent.removeChild(removeChildLi)
            }
            
        }
    }
}


//check for win : revealed array is complete and equal to phrase
const checkwin = () => {
    //initialise letter counter variables
    const show = document.querySelectorAll('.show'); //assigned from correct button match
    const letter = document.querySelectorAll('.letter'); //assigned from randomly selected phrase
    const showLength = show.length;
    const letterLength = letter.length;
if (showLength && (showLength === letterLength)) {
        winLoseScreen(true);
}
    
if (missedNumber >= 4){
    winLose.innerHTML = `<h3>Uh oh! One more punch, and you're a goner!</br></h3>`;
    if (missedNumber > 4) {
        winLoseScreen(false);    
    } 
}
};



//'you lose/you win' overlay screen - show rematch button
const winLoseScreen = (bool) => {
    
    let end = '';
    if (bool) {
        end = 'win';
        endGameMessage = phrases[chosenPhrase] + `<h2>Congratulations! That's a knockout!!</br></h2>`;

    } else {
        end = 'lose';
        endGameMessage = `<h2>Ouch!! You are out for the count!</br></h2>`;
       
        
    }
    let endGame = `<h3><a class = ${end} onclick = "window.location.reload(true);"> Rematch ? </a></h3 >`;
    hideOverlay.innerHTML = endGameMessage + endGame;
    hideOverlay.style.display = "flex";
    getPhrase.style.display ="none";
};


//get user input on keyboard buttons
const keybListener = getQwerty.addEventListener('click', button => {
    const letterButton = button.target;
    if (letterButton.tagName == 'BUTTON') {
        checkLetter(letterButton);
    }
    checkwin();
});

//END

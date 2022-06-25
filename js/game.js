const lineQ = document.querySelector("#lineQ");
const lineA = document.querySelector("#lineA");
const lineZ = document.querySelector("#lineZ");

const arrayQ = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const arrayA = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
const arrayZ = ["Z", "X", "C", "V", "B", "N", "M"];

let keyword, gameOver, underscores, lettersUsed, wrongLetters, letter, index, search, letterLeft, attempt;

let finalMsg = document.querySelector("#final-word-container");
let wordGame = document.querySelector("#wordgame-container");
let wrongLetterContainer = document.querySelector("#wrong-letters-container")

function randomWord(){
  return wordList[Math.floor(Math.random() * wordList.length)];
}

/* Creaciones de los guiones bajos para las letras de la palabra secreta */

function cUnderscores(){
  wrongLContainer.textContent = "";
  rightLContainer.textContent = "";
  for(let i=0; i<keyWord.length; i++){
    let div = document.createElement("div");
    div.classList.add("underscore");
    div.classList.add("flex-col-center");
    rightLContainer.appendChild(div);
  }
}
/* Creacion del teclado en pantalla */
function cKeyboard(){
  lineQ.textContent = "";
  lineA.textContent = "";
  lineZ.textContent = "";
  for(let i = 0; i < arrayQ.length; i++){
    let div = document.createElement("div");
    div.classList.add("keyboard-letter");
    div.classList.add("flex-col-center");
    div.textContent = arrayQ[i];
    div.id = arrayQ[i];
    div.addEventListener("click", checkKeyboardScreen);
    lineQ.appendChild(div);
  }
  for(let i = 0; i < arrayA.length; i++){
    let div = document.createElement("div");
    div.classList.add("keyboard-letter");
    div.classList.add("flex-col-center");
    div.textContent = arrayA[i];
    div.id = arrayA[i];
    div.addEventListener("click", checkKeyboardScreen);
    lineA.appendChild(div);
  }
  for(let i = 0; i < arrayZ.length; i++){
    let div = document.createElement("div");
    div.classList.add("keyboard-letter");
    div.classList.add("flex-col-center");
    div.textContent = arrayZ[i];
    div.id = arrayZ[i];
    div.addEventListener("click", checkKeyboardScreen);
    lineZ.appendChild(div);
  }
}

/* Creacion del ahorcado y sus estados */

const canvas = document.querySelector("canvas");
const paintbrush = canvas.getContext("2d");


function cHanged(attempt){
  paintbrush.beginPath();
  paintbrush.lineWidth = 6;
  switch(attempt){
    case 0:
      // Base
      paintbrush.moveTo(15, 350);
      paintbrush.lineTo(310, 350);
      
      // Column
      paintbrush.moveTo(105, 0);
      paintbrush.lineTo(105, 320);
      paintbrush.moveTo(135, 350);
      paintbrush.lineTo(105, 320);
      paintbrush.moveTo(75, 350);
      paintbrush.lineTo(105, 320);
      paintbrush.moveTo(90,335);
      paintbrush.lineTo(120,335);

      // Beams
      paintbrush.moveTo(155, 0);
      paintbrush.lineTo(105, 50);
      paintbrush.moveTo(105, 0);
      paintbrush.lineTo(257, 0);

      // Rope
      paintbrush.moveTo(255, 0);
      paintbrush.lineTo(255, 58);
      break;
    case 1:
      // Head 
      paintbrush.arc(255, 80, 20,2*Math.PI,0);
      break;
    case 2:
      // Chest
      paintbrush.moveTo(255, 185);
      paintbrush.lineTo(255, 100);
      break;
    case 3:
      // Leg L
      paintbrush.moveTo(275, 240);
      paintbrush.lineTo(255, 185);
      break;   
    case 4:
      // Leg R
      paintbrush.moveTo(235, 240);
      paintbrush.lineTo(255, 185);
      break;
    case 5:
      // Arm L
      paintbrush.moveTo(235, 170);
      paintbrush.lineTo(255, 110);
      break;
    case 6:
      // Arm R
      paintbrush.moveTo(275, 170);
      paintbrush.lineTo(255, 110);
      break;
  }
  paintbrush.stroke();
}

/* Preparacion del Juego simple */
function createBoardGame(){
  mainMenuSection.style.display = "none";
  gameSection.style.display = "block";
  wordSection.style.display = "none";

  keyWord = randomWord();
  letterLeft = keyWord.length;
  attempt = 0;
  gameOver = false;
  lettersUsed = [];
  wrongLetters = [];
  finalMsg.style.display = "none";
  wordGame.style.display = "none";
  paintbrush.clearRect(0, 0, canvas.width, canvas.height);

  cHanged(attempt);
  cUnderscores();
  cKeyboard();

  underscores = document.querySelectorAll(".underscore");

  window.addEventListener("keydown", checkKeyfromPC); 
}

/* Preparacion del juego multijugador */
function gameNewWord(newWord){
  mainMenuSection.style.display = "none";
  gameSection.style.display = "block";
  wordSection.style.display = "none";

  keyWord = newWord.toUpperCase();
  letterLeft = keyWord.length;
  attempt = 0;
  gameOver = false;
  lettersUsed = [];
  wrongLetters = [];
  finalMsg.style.display = "none";
  wordGame.style.display = "none";
  paintbrush.clearRect(0, 0, canvas.width, canvas.height);

  cHanged(attempt);
  cUnderscores();
  cKeyboard();

  underscores = document.querySelectorAll(".underscore")

  window.addEventListener("keydown", checkKeyfromPC); 
}

/* Validacion de letras en el teclado en pantalla */
function checkKeyboardScreen(){
  let data = (this.textContent).charCodeAt(0)
  if(!gameOver){
    if(data >= 65 && data <= 90 || data >= 97 && data <= 122 || data == 209) {
      letter = (this.textContent).toUpperCase();
      this.classList.add("pressed");
      checkLetter();
    }
  }
}

/* Validacion de letras en teclado PC */
function checkKeyfromPC(l){
  if(!gameOver){
    if(l.keyCode >= 65 && l.keyCode <= 90 || l.keyCode == 192){
      letter = (l.key).toUpperCase();
      checkLetter();
      let letterDiv = document.querySelector(`#${letter}`);
      letterDiv.classList.add("pressed");
      }
  }
}

/* Validacion de letra usada,letra correcta y letra incorrecta */
const wrongLContainer = document.querySelector("#wrong-letters-container");
const rightLContainer = document.querySelector("#right-letters-container");

function checkLetter(){
  if(!lettersUsed.includes(letter)){
    search = 0;
    index = keyWord.indexOf(letter, search)
    if(index != -1){
      lettersUsed.push(letter);
      while(index != -1){
        letterLeft--;
        underscores[index].textContent = letter;
        search = index +1;
        index = keyWord.indexOf(letter, search);
        }
      }else{
        lettersUsed.push(letter);
        wrongLetters.push(letter);
        wrongLetterContainer.textContent = wrongLetters.join(' ');
        attempt++;
        cHanged(attempt);
    }
    win();
  }
}

function win(){
  if(letterLeft == 0){
    gameOverMsg(won=true, keyWord);
    gameOver = true;
  } else if (attempt == 6){
    gameOverMsg(won=false, keyWord);
    gameOver = true;
  }    
}

function gameOverMsg(won){
  finalMsg.style.display = "flex";
  if(won){
    finalMsg.classList.remove("red");
    finalMsg.classList.add("green");
    finalMsg.textContent = "Felicidades Ganaste el juego";
  } else {
    finalMsg.classList.remove("green");
    finalMsg.classList.add("red");
    finalMsg.textContent = "Fallaste fulano ha muerto en la horca";

    wordGame.style.display = "flex";
    wordGame.textContent = `La palabra de esta partida era: ${keyWord} `;
  }
}

const buttonNewGame = document.querySelector("#new-game");
buttonNewGame.addEventListener("click",function(){transition(createBoardGame)});

const buttonSurrender = document.querySelector("#surrender");
buttonSurrender.addEventListener("click",function(){transition(mainMenu)});
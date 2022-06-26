const inputWord = document.querySelector("#word-input");
const saveAndPlay = document.querySelector("#saveandplay");
const playWithFriends = document.querySelector("#playwfriends");
const backToMenu = document.querySelector("#backtomenu");

let wordSelected;

function eliminarDiacriticosyEspacios(texto) {
  return texto
  .normalize('NFD')
  .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
  .replace(/ /g, "")
  .normalize();
}

function wordmenu() {
  mainMenuSection.style.display = "none";
  gameSection.style.display = "none";
  wordSection.style.display = "";

  /* Expresion solo letras*/
  inputWord.value = "";
  let tempInput = "";
  let expresion = /[A-Z]/i;

  /* validacion del input */
  inputWord.addEventListener("input", function (w) {
    if (w.data == null) {
    } else if (expresion.test(w.data)) {
      tempInput = inputWord.value;
    } else {
      inputWord.value= tempInput;
    }
  });
}

/* Agregar la nueva palabra a la lista de palabras */
function saveWord() {
  /* Validacion que no este vacio y que no supere los 16 caracteres*/
  if (inputWord.value != "") {
    if (inputWord.value.length <= 16) {
      wordList.push(eliminarDiacriticosyEspacios(inputWord.value).toUpperCase());
      inputWord.value = "";
      createBoardGame();
    } else {
      alert("La palabra supera los 16 caracteres");
      inputWord.value = "";
    }
  }
}

/* Jugar la palabra ingresada */
function playWord(){
  if (inputWord.value != "") {
    if (inputWord.value.length <= 16) {
      wordSelected = eliminarDiacriticosyEspacios(inputWord.value);
      gameNewWord(wordSelected);
    } else {
      alert("La palabra supera los 16 caracteres");
      inputWord.value = "";
    }
  }
}

saveAndPlay.addEventListener("click",function(){transition(saveWord)});
playWithFriends.addEventListener("click",function(){transition(playWord)});
backToMenu.addEventListener("click",function(){transition(mainMenu)});

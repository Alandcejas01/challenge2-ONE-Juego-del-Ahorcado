var botonCambioTema = document.querySelector("#toggle-theme");
let main = document.querySelector("main");
let mainMenuSection = document.querySelector("#main-menu");
let gameSection = document.querySelector("#game");
let wordSection = document.querySelector("#word")

botonCambioTema.addEventListener("click",function(){
  document.body.classList.toggle("dark-theme");
})

function inicio(){
  mainMenu();
}
const buttonStart = document.querySelector("#start-game");
const buttonAddWord = document.querySelector("#add-word");

buttonStart.addEventListener("click", function(){transition(createBoardGame)});
buttonAddWord.addEventListener("click", function(){transition(wordmenu)})
inicio();
// let wordList =["HTML", "CSS", "JAVASCRIPT", "GIT", "GITHUB", "ALURA", "ORACLE", "ONE", "PROGRAMACION", "WEB", "IDE", "PAGINA"];

let wordList =["PERRO", "AUTO", "CASA", "DENTISTA", "SALUD", "ESPERANZA", "POLICIA", "JUGUETE", "CAMA", "MILANESA", "PIZZA", "EDUCACION", "MADERA", "COLORES", "LADRILLO", "TAZA", "YOUTUBE"]

function firstloading() {
  mainMenu()
  setTimeout(() => {
    curtain.classList.remove("firstload")
  }, 1000);
}

function transition(f){
  curtain.classList.add("load")
  setTimeout(() => {f()}, 500);
  setTimeout(() => {curtain.classList.remove("load")}, 1000);
}

function mainMenu(){
  mainMenuSection.style.display = "block";
  gameSection.style.display = "none";
  wordSection.style.display = "none";
}


window.addEventListener("load", firstloading);
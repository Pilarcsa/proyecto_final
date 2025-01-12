const tablero = document.querySelector(".tablero-juego");
const elemPuntuacion = document.querySelector(".puntaje");
const elemPuntuacionMaxima = document.querySelector(".puntaje-alto");
const modal = document.querySelector(".modal");
const botonModal = document.querySelector (".modal button");
const textoModal = document.querySelector (".modal p");
let tiempoInicial =  10;

let gameOver = false;
let timer = null;
let topoX, topoY;
let falsotopoX, falsotopoY;


//¿cÓMO HACER APÀRECER UNOS topos EN LOS HUECO DEL GRID?
let setIntervalId;
let puntuacion = 0;
 ////////REVISAR ELEMENTOS DE POUNTUCIÓN Y PUNTUACIÓN ALTA!!!!!!
 let puntuacionMaxima = localStorage.getItem("puntaje-alto") || 0;
 elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
 

const topoPosicion = () => {
    do{   topoX= Math.floor ( Math.random() *10) +1;
            topoY= Math.floor ( Math.random() *10) +1;
    }while 
        (topoX === bombaX && topoY === bombaY)
        (topoX === falsotopoX && topoY === falsotopoX);
};

const falsotopoPosicion = () => {
        do{ falsotopoX= Math.floor ( Math.random() *10) +1;
        falsotopoY= Math.floor ( Math.random() *10) +1;
        }while 
        (falsotopoX === bombaX && falsotopoY === bombaY)
        (falsotopoX === topoX && falsotopoY === topoY);
};

const bombaPosicion = () => {
        bombaX= Math.floor ( Math.random() *10) +1;
        bombaY= Math.floor ( Math.random() *10) +1;
};



const GameOverAlerta = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

//inicio del tiempo y modales
function jugar(tiempo){
    
    puntuacion = 0;
    contenedorTimer.innerHTML = "";

    for(let i = 0; i < tiempo; i++){
        let cuadro = document.createElement("div");
        cuadro.style.width = `calc(${100/tiempo}% - 20px)`;
        contenedorTimer.appendChild(cuadro);
    }

     timer = setInterval(() => {
        contenedorTimer.children[0].remove();
        
        if(contenedorTimer.children.length == 0){
            clearInterval(timer);
            modal.classList.remove("desaparece");
            textoModal.innerText = "perdí";
            console.log("....perdí =(");
            gameOver = true;
        }
    },1000);
    //inicio del juego
}
const inicio = () => {
    if(gameOver) return GameOverAlerta();

    
    let Marcador = `<div id="topoClick"class="topo" style="grid-area: ${topoY} / ${topoX}"><img src="img/1459443.png" alt=""></div> <div id="falsoTopoClick"class="topo" style="grid-area: ${falsotopoY} / ${falsotopoX}"><img src="img/1459520.png" alt=""></div><div id="bombaClick"class="topo" style="grid-area: ${bombaY} / ${bombaX}"><img src="img/595582.png" alt=""></div>`;

    
    tablero.innerHTML = Marcador;
    document.getElementById("topoClick").addEventListener("click", function() {
        topoPosicion();
        puntuacion+= 1;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
        puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
        //esto lo he buscado con el Chat Gpt yt con ayuda de videotutoriales.
      });

      document.getElementById("falsoTopoClick").addEventListener("click", function() {
        falsotopoPosicion();
        puntuacion-= 1;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
    
      });

      document.getElementById("bombaClick").addEventListener("click", function() {
        gameOver = true;
     
      });
};

bombaPosicion();
falsotopoPosicion();
topoPosicion();
setInterval(bombaPosicion, 1180);
setInterval(falsotopoPosicion, 1100);
setInterval(topoPosicion, 1000);
//inicio();
setIntervalId = setInterval(inicio, 125);





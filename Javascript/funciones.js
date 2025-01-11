const tablero = document.querySelector(".tablero-juego");
const elemPuntuacion = document.querySelector(".puntaje");
const elemPuntuacionAlta = document.querySelector(".puntaje-alto");


let gameOver = false;
let osoX, osoY; 
let mazo = [];
//¿cÓMO HACER APÀRECER UNOS OSOS EN LOS HUECO DEL GRID?
let setIntervalId;
let puntuacion = 0;
 ////////REVISAR ELEMENTOS DE POUNTUCIÓN Y PUNTUACIÓN ALTA!!!!!!

const osoPosicion = () => {
    osoX= Math.floor ( Math.random() *10) +1;
    osoY= Math.floor ( Math.random() *10) +1;
}

const GameOverAlerta = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

const inicio = () => {
    if(gameOver) return GameOverAlerta();

    let Marcador = `<div class="oso" style="grid-area: ${osoY} / ${osoX}"></div>`;

    
    tablero.addEventListener("click", (mazo) => {
        
        if(mazo.target === Marcador) {
            osoPosicion();
            mazo.push([osoX,osoY]);
            puntuacion++;
            Marcador.className = "invisible";

        } else {
          puntuacion -= 2;

        };

         if(puntuacion > elemPuntuacionAlta.innerText.replace("High-score: ","")){
            elemPuntuacionAlta.innerText = `High-score: ${puntuacion}`;
        }

    });
    tablero.innerHTML = Marcador;
};

osoPosicion();
//inicio();
setIntervalId = setInterval(inicio, 125);


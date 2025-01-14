const tablero = document.querySelector(".tablero-juego");
const elemPuntuacion = document.querySelector(".puntaje");
const elemPuntuacionMaxima = document.querySelector(".puntaje-alto");
const modal = document.querySelector(".modal");
const botonModal = document.querySelector(".modal button");
const textoModal = document.querySelector (".modal p");
const contTiempo = document.querySelector (".tiempo");

let tiempoInicial =  59;
let tiempo = null;
let gameOver = false;
let topoX, topoY;
let falsotopoX, falsotopoY;
let bombaX,bombaY;




let setIntervalId;
let puntuacion = 0;

 let puntuacionMaxima = localStorage.getItem("puntaje-alto") || 0;
 elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
 

const topoPosicion = () => {
    do{   topoX= Math.floor ( Math.random() *10) +1;
            topoY= Math.floor ( Math.random() *10) +1;
    }while 
        (topoX === bombaX && topoY === bombaY)//el do y while lo he mirado en www3school y ChatGpt contrastando ambos contenidos
        (topoX === falsotopoX && topoY === falsotopoX);//la sintaxis de este código se me escapaba a lo que habiamos dado en clase por ello lo recogí de Chat gpt 
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



const gameOverModal = () => {
    clearInterval(setIntervalId);
    textoModal.innerText = "perdí";
    console.log("....perdí =(");
    modal;
    location.reload();
}
if(gameOver){gameOverModal()};

//inicio del tiempo y modales



//inicio del juego

const inicio = () => {


    

    // esto lo he recogido del juego de los círculos que realizamos en clase(aun no lo he escrito)


    let Marcador = `<div id="topoClick"class="topo" style="grid-area: ${topoY} / ${topoX}"><img src="img/1459443.png" alt=""></div> <div id="falsoTopoClick"class="topo" style="grid-area: ${falsotopoY} / ${falsotopoX}"><img src="img/1459520.png" alt=""></div><div id="bombaClick"class="topo" style="grid-area: ${bombaY} / ${bombaX}"><img src="img/595582.png" alt=""></div>`;
    tablero.innerHTML = Marcador;

    //he solucioando la cuestion dde clickear el topo y que cuente como puntuación buscando en w3school las formas de utilizar el addeventlistener 
    //la solucion final es crear un div desde javascript con la variable "Marcador", y una vez creada llamar a ese mismo div en html mediante el id correspondiente.
    document.getElementById("topoClick").addEventListener("click", function() {
        topoPosicion();
        puntuacion+= 1;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
        puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
        //la Score y el Highscore lo he buscado con el Chat Gpt y con ayuda de un videotutorial ya que esta parte la veía complicada, sobretodo colocar la High-Score.
      });

      document.getElementById("falsoTopoClick").addEventListener("click", function() {
        falsotopoPosicion();
        puntuacion-= 1;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
    
      });

      document.getElementById("bombaClick").addEventListener("click", function() {
        gameOver = true;
        gameOverModal();
      });
};

botonModal.addEventListener("click", () => {
  const quitarModal = document.getElementById("quitarModal");
  quitarModal.remove();//función del botón start
  setIntervalId = setInterval(inicio, 125);//aplicar el idi del inicio para comenzar el juego
  
 });



bombaPosicion();
falsotopoPosicion();
topoPosicion();
setInterval(bombaPosicion, 1180);
setInterval(falsotopoPosicion, 1100);
setInterval(topoPosicion, 1000);
//inicio();





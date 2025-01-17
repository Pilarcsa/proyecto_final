/*const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (m) => {
  cursor.style.left = m.pageX + 'px';
  cursor.style.left = m.pageY + 'px';

});

document.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});

document.addEventListener("mouseup", () => {
  cursor.classList.add("active");

});//visto en el tutorial https://www.youtube.com/watch?v=0v9qwDueocI
*/



const tablero = document.querySelector(".tablero-juego");

const elemPuntuacion = document.querySelector(".puntaje");
const elemPuntuacionMaxima = document.querySelector(".puntaje-alto");
const elemVidas = document.querySelector(".vidas");

const quitarModal = document.getElementById("quitarModal");
const botonModal = document.querySelector(".modal button");
const textoModal = document.querySelector (".modal p");

const divCuentaAtras = document.getElementById("#divCuentaAtras"); 

let gameOver = true;

let topoX, topoY;
let Topox2X, Topox2Y;
let bombaX,bombaY;

let setIntervalId;
let puntuacion = 0;
let vidas = 3;

 let puntuacionMaxima = localStorage.getItem("puntaje-alto") || 0;
 elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;

 puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;//esto lo reutilizé de un tutorial del juego snake


const topoPosicion = () => {
    do{   topoX= Math.floor ( Math.random() *4) +1;
            topoY= Math.floor ( Math.random() *4) +1;
    }while 
        (topoX === bombaX && topoY === bombaY)//el do y while lo he mirado en www3school y ChatGpt contrastando ambos contenidos
        (topoX === Topox2X && topoY === Topox2X);//la sintaxis de este código se me escapaba a lo que habiamos dado en clase por ello lo recogí de Chat gpt 
};

const Topox2Posición = () => {
        do{ Topox2X= Math.floor ( Math.random() *4) +1;
        Topox2Y= Math.floor ( Math.random() *4) +1;
        }while 
        (Topox2X === bombaX && Topox2Y  === bombaY)
        (Topox2X === topoX && Topox2Y === topoY);
};

const bombaPosicion = () => {
  do{ bombaX= Math.floor ( Math.random() *4) +1;
    bombaY= Math.floor ( Math.random() *4) +1;
   }while
    (bombaX === topoX && bombaY === topoY)
    (bombaX === Topox2X && bombaY === Topox2Y);

};

//////HACER EL MODAL DE PERDERRRR!!!!!

//modal de perder

 gameOverModal = () => {
  textoModal.innerText = `Puntos totales: ${puntuacionMaxima}`;
  clearInterval(setIntervalId); 
}


//inicio del tiempo

function inicioContador() {
  const divCuentaAtras = document.getElementById("divCuentaAtras");

  divCuentaAtras.style.animation = "reducirBarra 60s linear forwards";

  divCuentaAtras.addEventListener("animationend", () => {
    gameOver = true; 
    gameOverModal(); 
  });
}

function inicio(){

    gameOver = false;

    inicioContador();

   let imgtopo = "topo.webp";

    let imgtopox2 = "topox2.webp";

    let imgbombatopo = "topobomba.webp";
   

  

    //he solucioando la cuestion dde clickear el topo y que cuente como puntuación buscando en w3school las formas de utilizar el addeventlistener 
    //la solucion final es crear los divs en html llamar a ese mismo div en html mediante el id correspondiente.
  
      const topoImg = document.getElementById("topoImg");

      topoImg.addEventListener("click", function() {
      topoImg.src = imgtopom; 
        puntuacion+= 15;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
        puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
        //la Score y el Highscore lo he buscado con el Chat Gpt y con ayuda de un videotutorial ya que esta parte la veía complicada, sobretodo colocar la High-Score.
        console.log("click topo");
      });

      
      const topoX2Img = document.getElementById("topoX2Img");
      
      topoX2Img.addEventListener("click", function() {
      topoX2Img.src = imgtopox2m; 
        puntuacion+= 30;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
        puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
        console.log("click topoX2");
      }); 
      
      
       
        const topoBImg = document.getElementById("topoBImg");

        topoBImg.addEventListener("click", function() {
        topoBImg.src = imgbombatopom; 
        puntuacion -= 15, 
        vidas -= 1;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`
        elemVidas.innerHTML = `🤍: ${vidas}`;
        console.log("click bomba");

      if(vidas == 0){
        gameOver = true;
        gameOverModal();
      }

    
    });
};



botonModal.addEventListener("click", () => {
  quitarModal.remove();//función del botón start
  setIntervalId = setInterval(inicio, 125);//aplicar el idi del inicio para comenzar el juego
  
 });



bombaPosicion();
Topox2Posición();
topoPosicion();
setInterval(bombaPosicion, 2000);
setInterval(Topox2Posición, 2000);
setInterval(topoPosicion, 2000);
//inicio();






///Transformar cursor en martillo.
let cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

});

document.addEventListener("mousedown", () => {
  cursor.classList.add("activo");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("activo");

});//visto en el tutorial https://www.youtube.com/watch?v=0v9qwDueocI

const body = document.querySelector("body");
const tablero = document.querySelector(".tablero-juego");

const elemPuntuacion = document.querySelector(".puntaje");
const elemPuntuacionMaxima = document.querySelector(".puntaje-alto");
const elemVidas = document.querySelector(".vidas");

const modalId = document.getElementById("modalId");
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


//modal de perder

 function gameOverModal(){
  clearInterval(setIntervalId); 
  
  let modalPerder = `<div class="modal"><h1> Total Score:${puntuacion} </h1><button id="botonR">try again!</button></div>`;
 document.body.innerHTML = modalPerder;
 
document.getElementById("botonR").addEventListener("click", () => {
  location.reload();

});
};


//inicio del tiempo

function inicioContador() {
  const divCuentaAtras = document.getElementById("divCuentaAtras");

  divCuentaAtras.style.animation = "reducirBarra 80s linear forwards";

  divCuentaAtras.addEventListener("animationend", () => {
    gameOver = true; 
    gameOverModal();
  });
}

const topoPosicion = () => {
  do{   topoX= Math.floor ( Math.random() *4) +1;
          topoY= Math.floor ( Math.random() *4) +1;
  }while 
      (topoX === bombaX && topoY === bombaY)//el do y while lo he mirado en www3school y ChatGpt contrastando ambos contenidos
      (topoX === Topox2X && topoY === Topox2X);//la sintaxis de este código se me escapaba a lo que habiamos dado en clase por ello lo recogí de Chat gpt 
};

const topox2Posicion = () => {
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
//////////

const inicio = () =>{

    gameOver = false;

    if(gameOver) return gameOverModal();

    inicioContador();
    

    var Marcador = `<div class="topo" style="grid-area: ${topoY} / ${topoX}"><img id="topoImg" src="img/topo.webp" alt=""></div>

    <div  class="topo" style="grid-area: ${Topox2Y} / ${Topox2X}"><img id="topoX2Img" src="img/topox2.webp" alt=""></div>

     <div  class="topo" style="grid-area: ${bombaY} / ${bombaX}"><img id="topoBImg" src="img/topobomba.webp" alt=""></div>
    
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">
        <img src="img/tierra.webp" alt="">`;

    tablero.innerHTML= Marcador;
  
    //he solucioando la cuestion dde clickear el topo y que cuente como puntuación buscando en w3school las formas de utilizar el addeventlistener 
    //la solucion final es crear los divs en html llamar a ese mismo div en html mediante el id correspondiente.
      const tImg = document.getElementById("topoImg");
      
      tImg.addEventListener("click", function() {
     
        puntuacion+= 15;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
        puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
        //la Score y el Highscore lo he buscado con el Chat Gpt y con ayuda de un videotutorial ya que esta parte la veía complicada, sobretodo colocar la High-Score.
        console.log("click topo"); 
        tImg.src = 'img/topom.webp'; 
      },2000);

      const tX2Img = document.getElementById("topoX2Img");
      tX2Img.addEventListener("click", function() {
      tX2Img.src = 'img/topox2m.webp'; 
        puntuacion+= 30;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
        puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
        console.log("click topoX2");
      },2000); 
      
    
        const tBImg = document.getElementById("topoBImg");

        tBImg.addEventListener("click", function() {
         
        puntuacion -= 15, 
        vidas -= 1;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`
        elemVidas.innerHTML = `🤍: ${vidas}`;
        console.log("click bomba");

      if(vidas == 0){
        gameOver = true;
        gameOverModal();
      }

    tBImg.src ='img/topobombam.webp';
    },2000);
};


botonModal.addEventListener("click", () => {
  modalId.remove();//función del botón start
  setIntervalId = setInterval(inicio, 800);//aplicar el idi del inicio para comenzar el juego
  
 });



 
bombaPosicion();
topox2Posicion();
topoPosicion();
setInterval(topoPosicion, 2000);
setInterval(topox2Posicion, 1200);
setInterval(bombaPosicion, 1800);


//Fallos: desaparece de vez en cuando un bloque y cuesta clickear los topos desde el ordenador. Desde la tablet y el móvil funcionan bien. 
//Quería intentar arreglar el topo cuando le das click que seque con la imagen un rato antes de reaparecer pero lo hace
//He intendado arreglarlo de otra manera, pero no lo he conseguido.






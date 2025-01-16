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


//modal de perder

 gameOverModal = () => {
  botonModal();
  textoModal.innerText = `Puntos totales: ${puntuacionMaxima}`;
  clearInterval(setIntervalId); 
}


//inicio del tiempo

function inicioContador() {
  const divCuentaAtras = document.getElementById("divCuentaAtras");

  divCuentaAtras.style.animation = "reducirBarra 5s linear forwards";

  divCuentaAtras.addEventListener("animationend", () => {
    gameOver = true; 
    gameOverModal(); 
  });
}

const inicio = () => {

    gameOver = false;

    inicioContador();

    const imgtopo = "img/topo.png";
    const imgtopom = imgtopo.replace("img/topo.png", "img/topom.png");

    const imgtopox2 = "img/topox2.png";
    const imgtopox2m = imgtopox2.replace("img/topox2.png", "img/topox2m.png");

    const imgbombatopo = "img/topobomba.png";
    const imgbombatopom = imgbombatopo.replace("img/topobomba.png", "img/topobombam.png");

    // esto lo he recogido de chat GPT y lo he adaptado a mi código, me habia quedado pillada en la forma de rremplazar ua imgen por otra, 
    //<img id="topoImg" src="${imgtopo}" alt=""> esta solución de Chat Gpt me ha hecho ver que tengo muchas mas posibilidades de las pensaba para jugar con lo elementos incluso si aún no se han creado o se crean insitu en el inicio del juego.


    let Marcador = 
    `<div id="topoClick" class="topo" style="grid-area: ${topoY} / ${topoX}">
      <img id="topoImg" src="${imgtopo}" alt="">
    </div> 
    <div id="Topox2Click" class="topo" style="grid-area: ${Topox2Y} / ${Topox2X}">
      <img id="topoX2Img" src="${imgtopox2}" alt="">
    </div>
    <div id="bombaClick" class="topo" style="grid-area: ${bombaY} / ${bombaX}">
      <img id="topoBImg" src="${imgbombatopo}" alt="">
    </div> 

    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">
    <img src="img/tierra.png" alt="">`;
    //el Marcador lo saqué de un tutorial del juego snake, que se usaba igual para la manzana.
    //lo de la img de la tierra lo he hecho viendo que al meter el marcador me eliminaba del HTML los img que puse e introducia los del Marcador


    


    tablero.innerHTML = Marcador;

    //he solucioando la cuestion dde clickear el topo y que cuente como puntuación buscando en w3school las formas de utilizar el addeventlistener 
    //la solucion final es crear un div desde javascript con la variable "Marcador", y una vez creada llamar a ese mismo div en html mediante el id correspondiente.
    document.getElementById("topoClick").addEventListener("click", function() {
 
      const topoImg = document.getElementById("topoImg");
      topoImg.src = imgtopom; 
        puntuacion+= 15;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
        puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
        //la Score y el Highscore lo he buscado con el Chat Gpt y con ayuda de un videotutorial ya que esta parte la veía complicada, sobretodo colocar la High-Score.
      });

      document.getElementById("Topox2Click").addEventListener("click", function() {
      const topoX2Img = document.getElementById("topoX2Img");
      topoX2Img.src = imgtopox2m; 
        puntuacion+= 30;
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;
        puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
    
      });

      document.getElementById("bombaClick").addEventListener("click", function() {
        const topobombaImg = document.getElementById("topoBImg");
        topobombaImg.src = imgbombatopom; 
        puntuacion -= 15, 
        vidas -= 1;
         elemPuntuacion.innerHTML = `Score: ${puntuacion}`
         elemVidas.innerHTML = `🤍: ${vidas}`;

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
setInterval(bombaPosicion, 1000);
setInterval(Topox2Posición, 1000);
setInterval(topoPosicion, 1000);
//inicio();






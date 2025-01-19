// Objeto que representa al cursor personalizado:
let cursor = document.querySelector(".cursor");

/*_____ 
*Función que aplica una transformación al cursor cuando muevo el ratón:
* @param {Event} e  Evento del evento [Nombre de los parámetros]
* @return  {undefined} No tiene reurn [Descripción del return]
* @see   {@link: https://www.youtube.com/watch?v=0v9qwDueocI } [Enlace del vídeo]
_____*/
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

});

/*_____ 
*Función que aplica una transformación al cursor cuando clickeo el ratón:
* @param {Undefined} e  Evento no significativo [Nombre de los parámetros]
* @return  {mouseup/mousedown} Cuando dejas de clickear se activa `document.addEventListener("mouseup")` [Descripción del return]
* @see   {@link: https://www.youtube.com/watch?v=0v9qwDueocI} [Enlace del vídeo]
_____*/
document.addEventListener("mousedown", () => {
  cursor.classList.add("activo");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("activo");

});


// Selección de todo el body 
const body = document.querySelector("body");

// Selección de toda la cuadrícula
const tablero = document.querySelector(".tablero-juego");

// Selección de los elementos de puntuación y vidas: 
const elemPuntuacion = document.querySelector(".puntaje");
const elemPuntuacionMaxima = document.querySelector(".puntaje-alto");
const elemVidas = document.querySelector(".vidas");

// Selección de los elementos del modal (el contenedor del modal y el botón):
const modalId = document.getElementById("modalId");
const botonModal = document.querySelector(".modal button");

// Objetos que representan a los elementos interactivos del juego dentro de la cuadrícula (X/Y):
let topoX, topoY;
let Topox2X, Topox2Y;
let bombaX,bombaY;

// Objeto que representa la los Intervalos en ms del juego.
let setIntervalId;

// Objeto que representa el GameOver y llama a su activación con "true".
let gameOver = true;

// Objeto que representa la puntuación inicial del juego que equivale a 0.
let puntuacion = 0;

// Objeto que representa las vidas iniciales del juego que equivale a 3.
let vidas = 3;

// Objeto que representa la puntuaciónMáxima del juego(que lo llamamos desde el localstorage del HTML):
 let puntuacionMaxima = localStorage.getItem("puntaje-alto");

 // Lo colocamos en la tabla mediante la funación .InnerHTML y sustituimos la puntuación con el nº correspondiente del localstorage
 elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;
// Hacemos una sintaxis de 
 puntuacionMaxima = puntuacion >= puntuacionMaxima ? puntuacion : puntuacionMaxima;
        localStorage.setItem("puntaje-alto", puntuacionMaxima);
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;//esto lo reutilizé de un tutorial del juego snake


/*_____ 
*Función que aplica el modal de perder:
* @param {Undefined}  Evento no definido [Nombre de los parámetros]
* @return  {undefined} No tiene reurn [Descripción del return]
* @see   {@link: https://youtube.com/playlist?list=PL7tUbHOY3O6hoYICyXzbsg3Be2Ol39PYr&si=YAUQo0GmtSi2v6E0} [Enlace del vídeo]*/

 function gameOverModal(){
  clearInterval(setIntervalId); //quitamos el Intervalo del juego
  
  let modalPerder = `<div class="modal"><h1> Total Score:${puntuacion} </h1><button id="botonR">try again!</button></div>`;//Objeto modalPerder que introduce los elementos del modal. 
  document.body.innerHTML = modalPerder;// Función que introduce dentro del documento de Html los elementos de 'modalPerder'.

 /*_____ 
*Función de clickear el botón del Modal que lleve al inicio del juego:
* @param {Undefined}  Evento no definido [Nombre de los parámetros]
* @return  {undefined} No tiene reurn [Descripción del return]
* @see   {@link: https://youtube.com/playlist?list=PL7tUbHOY3O6hoYICyXzbsg3Be2Ol39PYr&si=YAUQo0GmtSi2v6E0} [Enlace del vídeo]*/
  document.getElementById("botonR").addEventListener("click", () => {
  location.reload();//recarga del juego
});
};

/*_____ 
*Función que aplica el inicio del contador:
* @param {Undefined}  Evento no definido [Nombre de los parámetros]
* @return  {undefined} No tiene reurn [Descripción del return]
* @see   {@link: https://www.youtube.com/watch?v=0v9qwDueocI} [Enlace del vídeo]*/
function inicioContador() {
  const barraTiempo = document.getElementById("IdbarraTiempo");//Recogemos la Id de la barra de tiempo, en este caso "barraTiempo"

 barraTiempo.style.animation = "reducirBarra 80s linear forwards";//Añadimos en el estilo de la barra de Tiempo la animación reducirBarra definida en CSS

 barraTiempo.addEventListener("animationend", () => {//una vez termine el tiempo, el juego termina 
    gameOver = true;//GameOver activado
    gameOverModal();//Llamamos al Modal de perder
  });
}


/*_____ 
*Función que coloca la posición a lo largo(Y) y ancho(X) del tablero los elementos interactivos:
* @param {Event} e  Evento del evento [Nombre de los parámetros]
* @return  {undefined} No tiene reurn [Descripción del return]
* @see   {@link: https://chatgpt.com/share/678cedbc-0e90-8002-89df-05b3336ffc96 / https://youtube.com/playlist?list=PL7tUbHOY3O6hoYICyXzbsg3Be2Ol39PYr&si=YAUQo0GmtSi2v6E0 } [Enlace de ChatGPT]*/
const topoPosicion = () => {
  do{   topoX= Math.floor ( Math.random() *4) +1;//coloca el elemento de forma aleatoria en el tablero de 4x4 mientras que no choque con el resto de elementos
          topoY= Math.floor ( Math.random() *4) +1;
  }while 
      (topoX === bombaX && topoY === bombaY)
      (topoX === Topox2X && topoY === Topox2X);
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


// Función que inicia el juego:
const inicio = () =>{
//Una vez iniciado el juego:
    gameOver = false;// GameOver se desactiva.
    if(gameOver) return gameOverModal();// Condición: si GameOver  activa gameOverModal.

    inicioContador();//iniciamos el contador de tiempo
    
    //Objeto Marcador que introduce los elementos interactivos(aún no creados). Aquí también colocamos los objetos ya definidos X e Y para que se apliquen dentro del tablero.
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

    // Función que introduce dentro del tablero en Html los elementos de 'Marcador'.
    tablero.innerHTML= Marcador;

   //Selección del Id del topo
      const tImg = document.getElementById("topoImg");

      /*_____ 
      *Función de clickear los elementos interactivos que reste/sume puntos o quite vidas:
      * @param {Undefined}  Evento no definido [Nombre de los parámetros]
      * @return  {undefined} No tiene reurn [Descripción del return]
      * @see {@link: https://www.youtube.com/watch?v=0v9qwDueocI / https://youtube.com/playlist?list=PL7tUbHOY3O6hoYICyXzbsg3Be2Ol39PYr&si=YAUQo0GmtSi2v6E0} [Enlace del vídeo]*/

      //función clickear el topo 
      tImg.addEventListener("click", function() {
        tImg.src = 'img/topom.webp';//sustituimos imagen del topo por el topo muerto 
        puntuacion+= 15;//sumamos 15 puntos a puntuación
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;//actualizar puntuación
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;//actualizar puntuación máxima
      },2000);//indicamos los ms para refrescar la función

      //Selección del Id del topo que vale x2
      const tX2Img = document.getElementById("topoX2Img");

      //función clickear el topo x2
      tX2Img.addEventListener("click", function() {
        tX2Img.src = 'img/topox2m.webp';//sustituimos imagen del topo por el topo muerto
        puntuacion+= 30;//sumamos 30 puntos a puntuación
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`;//actualizar puntuación
        elemPuntuacionMaxima.innerHTML = `High Score: ${puntuacionMaxima}`;//actualizar puntuación máxima
      },2000); //indicamos los ms para refrescar la función
      
       //Selección del Id del topo que resta vidas y puntos
      const tBImg = document.getElementById("topoBImg");

      //función clickear el topo bomba
      tBImg.addEventListener("click", function() {
        tBImg.src ='img/topobombam.webp';//sustituimos imagen del topo por el topo muerto
        puntuacion -= 15;//restamos 15 puntos a puntuación
        vidas -= 1;//restamos 1 vida 
        elemPuntuacion.innerHTML = `Score: ${puntuacion}`//actualizar puntuación
        elemVidas.innerHTML = `🤍: ${vidas}`;//actualizar vidas
      
      if(vidas == 0){// Condición: si vidas es igual a cero, se acaba el juego.
        gameOver = true;//GameOver activado
        gameOverModal();//Llamamos al Modal de perder
      }
      },2000);//indicamos los ms para refrescar la función
};

 /*_____ 
*Función de clickear el botón del Modal que lleve al inicio del juego:
* @param {Undefined}  Evento no definido [Nombre de los parámetros]
* @return  {undefined} No tiene reurn [Descripción del return]*/
botonModal.addEventListener("click", () => {
  modalId.remove();//función del botón start quita del Html el modal
  setIntervalId = setInterval(inicio, 800);//Inicia el juego con los intervalos e indicamos los ms para refrescar del juego
 });
 
//Llamamos a las funciones al final del juego para que se activen y aparezcan los elementos del juego
bombaPosicion();
topox2Posicion();
topoPosicion();

//Colocamos los intervalos de cada elementos para activar las animaciones e indicamos los ms para refrescar cada elemento durante la partida
setInterval(topoPosicion, 1200);
setInterval(topox2Posicion, 1000);
setInterval(bombaPosicion, 1800);
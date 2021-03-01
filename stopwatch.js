//funzionamento orologio in alto
var clock = document.querySelector('#clock');

getTimer();
getTimer = setInterval(getTimer, 60000);

function getTimer() {
  // MINUTI
  var d = new Date();
  var min = d.getMinutes();
  //scrivere bene min in varibile
  var min = min < 10 ? `0` + min : min;
  // ORE
  var h = d.getHours();
  //scrivere bene ore in varibile
  var h = h < 10 ? `0` + h : h;
  time = h + ':' + min;
  clock.innerText = time;
}

// btn e esterno btn in variabile
const countDownElement = document.querySelector('#timer');
const buttonStart = document.querySelector('#startStop');
const buttonGiroStop = document.querySelector('#reset');
const btnWrapperStop = document.querySelector('#btnWrapperStop');
const wrapperGrey = document.querySelectorAll('.first')[0];
const wrapperRedGreen = document.querySelectorAll('.second')[0];

buttonStart.addEventListener(`click`, startStop);

function startStop() {
  if (buttonStart.getAttribute('status') == 'basic') {
    // diventa opaca scritta e bg in btn grigio
    buttonGiroStop.style.color = '#fff';
    buttonGiroStop.style.backgroundColor = '#3d3d3d';
    wrapperGrey.style.backgroundColor = '#3d3d3d';
    wrapperRedGreen.style.backgroundColor = '#3d3d3d';
    //CHIMARE FUNZIONE OGNI 1000 MILLISECONDI
    allCentInCount = 0;
    int = setInterval(upDateCountUp, 10);

    function upDateCountUp() {
      //NUMERO MINUTI E SECONDI E ORE NEL COUNTDOWN
      const secondsInCountUp = Math.floor(allCentInCount / 100);
      const minutesInCountUp = Math.floor(allCentInCount / 100 / 60);
      const hoursIncountUp = Math.floor(allCentInCount / 100 / 60 / 60);

      //NUMERO DEI SECONDI MINUTI E ORE IN MODULO SESSAGESIMALE
      let cent = allCentInCount % 100;
      let seconds = secondsInCountUp % 60;
      let minutes = minutesInCountUp % 60;
      let hours = hoursIncountUp % 24;

      //SCRIVERE BENE I SECONDI/MINUTI/ORE CON 0 DAVANTI SE < DI 10
      cent = cent < 10 ? `0` + cent : cent;
      seconds = seconds < 10 ? `0` + seconds : seconds;
      minutes = minutes < 10 ? `0` + minutes : minutes;
      if (hours > 0) {
        hours = hours < 10 ? `0` + hours : hours;
        //scrivere dentro minutaggio con ore
        countDownElement.innerHTML = `${hours}:${minutes}:${seconds},${cent}`;
        allCentInCount++;
      } else {
        //scrivere dentro minutaggio senza ore
        countDownElement.innerHTML = `${minutes}:${seconds},${cent}`;
        allCentInCount++;
      }
      //CAMBIARE STATO AL BOTTONE START PER
      //RIUSARLO COME STOP NELL'ELSE IF
      buttonStart.innerText = 'stop';
      buttonStart.style.backgroundColor = '#330e0c';
      buttonStart.style.color = '#ff453a';
      buttonStart.setAttribute('status', 'stop');
      btnWrapperStop.style.backgroundColor = '#330e0c';
    }
  } else if (buttonStart.getAttribute('status') == 'stop') {
    clearInterval(int);
    buttonStart.setAttribute('status', 'readytoreset');
    //cambiare nome al tasto "Giro"
    buttonGiroStop.innerText = 'Azzera';
  }
}

buttonGiroStop.addEventListener(`click`, reset);
function reset() {
  if (buttonStart.getAttribute('status') == 'readytoreset') {
    // diventa opaca scritta e bg in btn grigio
    buttonGiroStop.style.color = '#98989f';
    buttonGiroStop.style.backgroundColor = '#222';
    wrapperGrey.style.backgroundColor = '#222';
    clearInterval(int);
    countDownElement.innerHTML = `00:00,00`;
    //cambiare stato del bottone start e reset
    buttonStart.setAttribute('status', 'basic');
    //cambiare layout del bottone stop in start
    buttonStart.innerText = 'Avvia';
    buttonStart.style.backgroundColor = '#0a2a12';
    buttonStart.style.color = '#30d158';
    btnWrapperStop.style.backgroundColor = '#0a2a12';
    //cambiare nome al tasto "Azzera"
    buttonGiroStop.innerText = 'Giro';
    var allLapCont = document.querySelectorAll('.SingolLapCont');
    var i;
    for (i = 0; i < allLapCont.length; i++) {
      allLapCont[i].remove();
    }
  }
}

buttonGiroStop.addEventListener(`click`, lap);
function lap() {
  if (
    countDownElement.innerText != '00:00,00' &&
    buttonStart.getAttribute('status') != 'readytoreset'
  ) {
    //costruire un div per contenere N lap e giro e lap
    var singolLapCont = document.createElement('div');
    var zonalap = document.getElementById('lapZone');
    zonalap.appendChild(singolLapCont);
    singolLapCont.classList.add('SingolLapCont');
    //costruire l'elemento che contine il lap
    var lap = countDownElement.innerText;
    var timeLap = document.createElement('span');
    var text = document.createTextNode(lap);
    timeLap.appendChild(text);
    singolLapCont.appendChild(timeLap);
    timeLap.classList.add('lap');
    /* OTTENERE IL GIRO COME DIFFERENZA DEI CENT DI
    SECONDO DEGLI ULTIMI DUE PASSAGGI */
    // OTTENERE I CENT DI SECONDO DELL'ULTIMO PASSAGGIO
    // centesimi nei centesimi
    var centDelPassaggio = parseInt(lap.split(',')[1]);
    // centesimi nei secondi
    var senzaVirgola = lap.split(',')[0];
    var parteDeiSec = senzaVirgola.split(':')[1];
    var centNeiSec = parseInt(parteDeiSec) * 100;
    // centesimi nei minuti
    var parteDeiMinuti = senzaVirgola.split(':')[0];
    var centNeiMin = parseInt(parteDeiMinuti) * 60 * 100;
    //sommare tutti i cent dell'ultimo passaggio
    AllLastCent = centDelPassaggio + centNeiSec + centNeiMin;
    // OTTENERE I CENT DI SECONDO DEL PEN-ULTIMO PASSAGGIO
    var lapNodeList = document.getElementsByClassName('lap');
    if (lapNodeList.length > 1) {
      //passare dalla nodeList al penultimo giro
      var formerLap = lapNodeList[lapNodeList.length - 2].innerText;
      // centesimi nei centesimi
      var centDelFormer = parseInt(formerLap.split(',')[1]);
      // centesimi nei secondi
      var senzaVirgolaFormer = formerLap.split(',')[0];
      var parteDeiSecFormer = senzaVirgolaFormer.split(':')[1];
      var centNeiSecFormer = parseInt(parteDeiSecFormer) * 100;
      // centesimi nei minuti
      var parteDeiMinutiFormer = senzaVirgolaFormer.split(':')[0];
      var centNeiMinFormer = parseInt(parteDeiMinutiFormer) * 60 * 100;
      //sommare tutti i cent dell'ultimo passaggio
      allCentFormer = centDelFormer + centNeiSecFormer + centNeiMinFormer;
      // CENTESIMI DI SECONDO DEL GIRO
      centDelGiro = AllLastCent - allCentFormer;
      //NUMERO MINUTI E SECONDI NEL DIFFERENZIALE
      var secDelGiro = Math.floor(centDelGiro / 100);
      var minDelGiro = Math.floor(centDelGiro / 100 / 60);
      //NUMERO DEI SECONDI MINUTI E ORE IN MODULO SESSAGESIMALE
      let centInModulo = centDelGiro % 100;
      let secInModulo = secDelGiro % 60;
      let minInModulo = minDelGiro % 60;
      /* SCRIVERE BENE I SECONDI/MINUTI/ORE 
      DEL GIRO, CON 0 DAVANTI SE < DI 10 */
      centInModulo = centInModulo < 10 ? `0` + centInModulo : centInModulo;
      secInModulo = secInModulo < 10 ? `0` + secInModulo : secInModulo;
      minInModulo = minInModulo < 10 ? `0` + minInModulo : minInModulo;
      // variabile completa del giro
      var giro = `${minInModulo}:${secInModulo},${centInModulo}`;
      //costruire l'elemento che contine il giro
      var giroElem = document.createElement('span');
      var txtGiro = document.createTextNode(giro);
      giroElem.appendChild(txtGiro);
      singolLapCont.appendChild(giroElem);
      timeLap.classList.add('giroElem');
    } else {
      /* creazione del primo giro in cui 
     non c'è un differenziale quindi 
     uguale al primo passaggio*/
      var giroElem = document.createElement('span');
      var txtGiro = document.createTextNode(lap);
      giroElem.appendChild(txtGiro);
      singolLapCont.appendChild(giroElem);
      timeLap.classList.add('giroElem');
    }
    //ottenere il numero di lap attraverso
    // la lunghezza della node collection
    // che ha classe  Lap
    nlap = document.querySelectorAll('.lap').length;
    //creare il relativo elemento
    var lapEl = document.createElement('span');
    var textLap = document.createTextNode(`Giro ${nlap}`);
    lapEl.appendChild(textLap);
    singolLapCont.appendChild(lapEl);
    lapEl.classList.add('nGiro');
    /* cancellare line layout man mano che si creano
    elementi veri a sostituirle */
    var line = document.querySelectorAll('.line');
    if (line.length > 0) {
      line[line.length - 1].remove();
    }
  }
}

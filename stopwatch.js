const countDownElement = document.querySelector('#timer');
const buttonStart = document.querySelector('#startStop');
const buttonGiroStop = document.querySelector('#reset');
const btnWrapperStop = document.querySelector('#btnWrapperStop');

buttonStart.addEventListener(`click`, startStop);

function startStop() {
  if (buttonStart.getAttribute('status') == 'basic') {
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
      hours = hours < 10 ? `0` + hours : hours;
      //SCRIVERE DENTRO NUOVO MINUTAGGIO
      countDownElement.innerHTML = `${hours}:${minutes}:${seconds},${cent}`;
      allCentInCount++;
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
    clearInterval(int);
    countDownElement.innerHTML = `00:00:00,00`;
    buttonStart.setAttribute('status', 'basic');
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
    countDownElement.innerText != '00:00:00,00' &&
    buttonStart.getAttribute('status') != 'readytoreset'
  ) {
    //costruire un div per contenere N lap e lap
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
    //ottenere il numero di lap attraverso
    // la lunghezza della node collection
    // che ha classe  Lap
    nlap = document.querySelectorAll('.lap').length;
    //creare il relativo elemento
    var lapEl = document.createElement('span');
    var textLap = document.createTextNode(`Giro ${nlap}`);
    lapEl.appendChild(textLap);
    singolLapCont.appendChild(lapEl);
    timeLap.classList.add('Nlap');
  }
}

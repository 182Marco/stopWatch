
const countDownElement = document.getElementsByTagName('p')[0];
const buttonStart = document.getElementsByTagName('button')[0];
const buttonStop = document.getElementsByTagName('button')[1];
const buttonlap = document.getElementsByTagName('button')[2];


buttonStart.addEventListener(`click`, startStop)


function startStop(){
  if(buttonStart.getAttribute("status") == "basic"){
    //CHIMARE FUNZIONE OGNI 1000 MILLISECONDI
    allCentInCount = 0;
    int =setInterval(upDateCountUp, 10);

    function upDateCountUp (){
       //NUMERO MINUTI E SECONDI E ORE NEL COUNTDOWN
      const secondsInCountUp = Math.floor(allCentInCount /100 );
      const minutesInCountUp = Math.floor(allCentInCount /100 / 60);
      const hoursIncountUp = Math.floor(allCentInCount /100/ 60 / 60);

      //NUMERO DEI SECONDI MINUTI E ORE IN MODULO SESSAGESIMALE
      let cent = allCentInCount % 100
      let seconds = secondsInCountUp % 60;
      let minutes = minutesInCountUp % 60;
      let hours = hoursIncountUp % 24;

      //SCRIVERE BENE I SECONDI/MINUTI/ORE CON 0 DAVANTI SE < DI 10
      cent = cent < 10 ?  `0`+ cent : cent;
      seconds = seconds < 10 ?  `0`+ seconds : seconds;
      minutes = minutes < 10 ?  `0`+ minutes : minutes;
      hours = hours < 10 ?  `0`+ hours : hours;
      //SCRIVERE DENTRO NUOVO MINUTAGGIO
      countDownElement.innerHTML = `${hours}:${minutes}:${seconds}:${cent}`;
      allCentInCount ++
      //CAMBIARE STATO AL BOTTONE START PER
      //RIUSARLO COME STOP NELL'ELSE IF
      buttonStart.innerText = "stop"
      buttonStart.style.backgroundColor = "#a2120e"
      buttonStart.setAttribute("status", "stop");
    }
  }else if (buttonStart.getAttribute("status") == "stop") {
      clearInterval(int)
      buttonStart.setAttribute("status", "readytoreset");
  }
}


buttonStop.addEventListener(`click`, reset)
function reset() {
  if (buttonStart.getAttribute("status") == "readytoreset") {
    clearInterval(int)
    countDownElement.innerHTML = `00:00:00:00`;
    buttonStart.setAttribute("status", "basic");
    buttonStart.innerText = "start"
    buttonStart.style.backgroundColor = "green"
    var allLapCont = document.querySelectorAll(".SingolLapCont");
    var i;
    for (i = 0; i < allLapCont.length; i++){
        allLapCont[i].remove();
    }
  }
}


buttonlap.addEventListener(`click`, lap)
function lap() {
  if (countDownElement.innerText != "00:00:00:00"
  && buttonStart.getAttribute("status") != "readytoreset"){
    //costruire un div per contenere N lap e lap
    var singolLapCont = document.createElement("div");
    var zonalap = document.getElementById("lapZone");
    zonalap.appendChild(singolLapCont);
    singolLapCont.classList.add("SingolLapCont");
    //costruire l'elemento che contine il lap
    var lap = countDownElement.innerText
    var timeLap = document.createElement("span");
    var text = document.createTextNode(lap);
    timeLap.appendChild(text);
    singolLapCont.appendChild(timeLap);
    timeLap.classList.add("lap");
    //ottenere il numero di lap attraverso
    // la lunghezza della node collection
    // che ha classe  Lap
    nlap = document.querySelectorAll(".lap").length
    //creare il relativo elemento
    var lapEl = document.createElement("span");
    var textLap = document.createTextNode(`lap ${nlap}`);
    lapEl.appendChild(textLap);
    singolLapCont.appendChild(lapEl);
    timeLap.classList.add("Nlap");
  }
}

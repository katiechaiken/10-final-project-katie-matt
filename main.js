
var audio = new Audio('someone.m4a');

var spaceCount = 0;
var play = false;
function enterKeyPressed(){
  if(event.which === 32 || event.keyCode === 32){
    if(play == false){
      playAudio();
    }
    else if(play == true){
      pauseAudio();
    }
  }
}

function pauseAudio(){
  audio.pause();
  play = false;
}
function playAudio(){
  audio.play();
  play = true;
}

document.getElementById("pause").addEventListener("click", pauseAudio);
document.getElementById("play").addEventListener("click", playAudio);
document.addEventListener("keydown", enterKeyPressed);

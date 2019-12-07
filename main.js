
var song = new Audio('Pompeii.mp3');

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
  song.pause();
  play = false;
}
function playAudio(){
  song.play();
  play = true;
}

document.getElementById("pause").addEventListener("click", pauseAudio);
document.getElementById("play").addEventListener("click", playAudio);
document.addEventListener("keydown", enterKeyPressed);

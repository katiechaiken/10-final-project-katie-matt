
(function (global) {
    document.getElementById("homepagebutton").addEventListener("click", function () {
      global.localStorage.setItem("sharedAlbum", document.getElementById("homealbum").value);
global.localStorage.setItem("clickcount", 1);
}, false);

}(window));

var song = new Audio('shewillbeloved.mp3');

$("#playbutton").click(function(){
  song.play();
});
$("#pausebutton").click(function(){
  song.pause();
});

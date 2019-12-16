
$("#homepagebutton").click(function(){
  if(document.getElementById("homealbum").value == ""){
    alert("empty");
    document.getElementById('homepagebutton').setAttribute('onclick', "window.location.href = 'artist.html';");
  }
  else{
    document.getElementById('homepagebutton').setAttribute('onclick', "window.location.href = 'artistalbumsearch.html';");
  }
});


(function (global) {
    document.getElementById("homepagebutton").addEventListener("click", function () {
      global.localStorage.setItem("sharedArtist", document.getElementById("homeartist").value);
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


(function (global) {
    document.getElementById("homepagebutton").addEventListener("click", function () {
        global.localStorage.setItem("sharedArtist", document.getElementById("homeartist").value);
        global.localStorage.setItem("sharedAlbum", document.getElementById("homealbum").value);
        global.localStorage.setItem("clickcount", 1);
    }, false);
    document.getElementById("JonBellion").addEventListener("click", function () {
        global.localStorage.setItem("sharedArtist", "Jon Bellion");
        global.localStorage.setItem("sharedAlbum", "");
        global.localStorage.setItem("clickcount", 1);
    }, false);
    document.getElementById("TaylorSwift").addEventListener("click", function () {
        global.localStorage.setItem("sharedArtist", "Taylor Swift");
        global.localStorage.setItem("sharedAlbum", "");
        global.localStorage.setItem("clickcount", 1);
    }, false);
    document.getElementById("Aerosmith").addEventListener("click", function () {
        global.localStorage.setItem("sharedArtist", "Aerosmith");
        global.localStorage.setItem("sharedAlbum", "");
        global.localStorage.setItem("clickcount", 1);
    }, false);
    document.getElementById("JayZ").addEventListener("click", function () {
        global.localStorage.setItem("sharedArtist", "Jay-Z");
        global.localStorage.setItem("sharedAlbum", "");
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

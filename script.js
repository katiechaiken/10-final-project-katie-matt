var click;
(function (global) {
  document.getElementById("artistinput").value = global.localStorage.getItem("sharedArtist");
  document.getElementById("albuminput").value = global.localStorage.getItem("sharedAlbum");

  click = global.localStorage.getItem("clickcount");
  $(this).data('clicked', true);

}(window));
// PULL ARTIST INFO THROUGH USER INPUT!
function artistInfo(){
  $(document).ready(function(){
    var artist;
      artist = ($('#artistinput').val())
      for(var i = 0; i < artist.length; i++){
        artist = artist.replace(" ", "+");
      }
      $.ajax({
        type: 'POST',
        url: 'https://ws.audioscrobbler.com/2.0/',
        data: 'method=artist.getinfo&' +
        'artist=' + artist + '&' +
        'api_key=57ee3318536b23ee81d6b27e36997cde&' +
        'format=json',
        dataType: 'jsonp',
        success: function(data) {

          $('#success #artistName').html(data.artist.name);
          $('#success #artistBio').html(data.artist.bio.content);

        },
      });

  });

}

function artistTopAlbums(){
  $(document).ready(function(){
    var artist;
      artist = ($('#artistinput').val())
      for(var i = 0; i < artist.length; i++){
        artist = artist.replace(" ", "+");
      }
      $.ajax({
        type: 'POST',
        url: 'https://ws.audioscrobbler.com/2.0/',
        data: 'method=artist.gettopalbums&' +
        'artist=' + artist + '&' +
        'api_key=57ee3318536b23ee81d6b27e36997cde&' +
        'format=json',
        dataType: 'jsonp',
        success: function(data) {

          $('#success #extraAlbum1').html('<img src='+ data.topalbums.album[0]["image"][2]["#text"] + '/>');
          $('#success #extraAlbum2').html('<img src='+ data.topalbums.album[1]["image"][2]["#text"] + '/>');
          $('#success #extraAlbum3').html('<img src='+ data.topalbums.album[2]["image"][2]["#text"] + '/>');


        },
      });

  });

}

// ALBUM INFO
function albumInfo(){
  $(document).ready(function(){
    var artist;
    var album;
      artist = ($('#artistinput').val())
      album = ($('#albuminput').val())

      for(var i = 0; i < artist.length; i++){
        artist = artist.replace(" ", "+");
      }
      for(var i = 0; i < album.length; i++){
        album = album.replace(" ", "+");
      }

      $.ajax({
        type: 'POST',
        url: 'https://ws.audioscrobbler.com/2.0/',
        data: 'method=album.getinfo&' +
        'artist=' + artist + '&' +
        'album=' + album + '&' +
        'api_key=57ee3318536b23ee81d6b27e36997cde&' +
        'format=json',
        dataType: 'jsonp',
        success: function(data) {
          var list = "";
          console.log(data.album.tracks.track.length);
          for(var i  = 0; i < data.album.tracks.track.length; i++){
              list = list + (data.album.tracks.track[i]["name"] + "<br/>") ;

          }
          $('#success #albumTracks').html(list);
          $('#success #albumImage').html('<img src='+ data.album.image[3]['#text'] + '/>')
          $('#success #albumName').html(data.album.name);
          $('#success #albumInfo').html(data.album.wiki.content);

        },
        error: function(code, message) {
          $('#error2').html('Error Code: ' + code + ', Error Message: ' + message);
        }
      });
  });
}


//TOP TRACKS
function topTracks(){
  $(document).ready(function(){
    var artist;
    artist = ($('#artistinput').val())

      for(var i = 0; i < artist.length; i++){
        artist = artist.replace(" ", "+");
      }
      $.ajax({
        type: 'POST',
        url: 'https://ws.audioscrobbler.com/2.0/',
        data: 'method=artist.gettoptracks&' +
        'artist=' + artist + '&' +
        'limit=10&' +
        'api_key=57ee3318536b23ee81d6b27e36997cde&' +
        'format=json',
        dataType: 'jsonp',
        success: function(data) {
          var list = "";
          console.log(data.toptracks.track.length);
          for(var i  = 0; i < data.toptracks.track.length; i++){
            list = list + (i+1) + ". "+ (data.toptracks.track[i]["name"] + "<br/>") ;

          }

          $('#success #topTracks').html(list);

        },
        error: function(code, message) {
          $('#error2').html('Error Code: ' + code + ', Error Message: ' + message);
        }
      });
  });

}

var songID1;
var songID2;
var songID3;
//PULL ARTIST IMAGE AND SONG ID AND THEN GET TRACK ID TO PLAY
function artistImageAndSong(){


  $(document).ready(function(){
    var artist;
    var found1;
    var found2;
    var found3;
    var songname1;
    var songname2;
    var songname3;
    artist = ($('#artistinput').val())
    artist = artist.charAt(0).toUpperCase() + artist.slice(1);

    for(var i = 0; i < artist.length; i++){
        artist = artist.replace(" ", "%20");
      }

      var artistAPI = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": "f144d33662msh100deaa3295a86ep16468bjsnf8b0aa4ce839"
        }
      }

      $.ajax(artistAPI).done(function(data) {
        console.log(data);
        //ARTIST IMAGE
          for(var i = 0; i < artist.length; i++){
            artist = artist.replace("%20", " ");
          }
        for(var i = 0; i < data.data.length; i++){
          if(data.data[i].artist["name"] == artist){
            found1 = i;
            break;
          }
        }
        if(found1 == null){
          found1 = 0;
        }

        for(var i = found1+1; i < data.data.length; i++){
          if(data.data[i].artist["name"] == artist){
            found2 = i;
            break;
          }
        }

        if(found2 == null){
          found2 = 0;
        }

        for(var i = found2+1; i < data.data.length; i++){
          if(data.data[i].artist["name"] == artist){
            found3 = i;
            break;
          }
        }
        if(found3 == null){
          found3 = 0;
        }

        $('#artistImage').html('<img src='+ data.data[found1].artist["picture_medium"]+'>');

        //SONG STUFF
        songID1 = data.data[found1]["id"];
        songID2 = data.data[found2]["id"];
        songID3 = data.data[found3]["id"];

        songname1 = data.data[found1]["title"];
        songname2 = data.data[found2]["title"];
        songname3 = data.data[found3]["title"];
        $('#song1name').html(songname1);
        $('#song2name').html(songname2);
        $('#song3name').html(songname3);

        var trackAPI1 = {
          "async": true,
          "crossDomain": true,
          "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + songID1,
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "f144d33662msh100deaa3295a86ep16468bjsnf8b0aa4ce839"
          }
        }
        var trackAPI2 = {
          "async": true,
          "crossDomain": true,
          "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + songID2,
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "f144d33662msh100deaa3295a86ep16468bjsnf8b0aa4ce839"
          }
        }
        var trackAPI3 = {
          "async": true,
          "crossDomain": true,
          "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + songID3,
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "f144d33662msh100deaa3295a86ep16468bjsnf8b0aa4ce839"
          }
        }
        $.ajax(trackAPI1).done(function (data) {
          console.log(data);
          console.log(data.preview);
          var song = document.getElementById("player1");
          song.src = data.preview;
          $("#play1").click(function(){
            song.play();
          });
          $("#pause1").click(function(){
            song.pause();
          });
        });

        $.ajax(trackAPI2).done(function (data) {
          console.log(data);
          console.log(data.preview);
          var song = document.getElementById("player2");
          song.src = data.preview;
          $("#play2").click(function(){
            song.play();
          });
          $("#pause2").click(function(){
            song.pause();
          });
        });

        $.ajax(trackAPI3).done(function (data) {
          console.log(data);
          console.log(data.preview);
          var song = document.getElementById("player3");
          song.src = data.preview;
          $("#play3").click(function(){
            song.play();
          });
          $("#pause3").click(function(){
            song.pause();
          });
        });
      });

     });
}


function load(){
  artistInfo();
  topTracks();
  artistImageAndSong();
  albumInfo();
  artistTopAlbums()
}

function cssSelector(){
  if(($('#albuminput').val()).length == 0){
    // var css = document.getElementById("style2");
    // css.href = "file:///Users/kachaiken/Dropbox/cse204/10-final-project-katie-matt/artist.css";
    // document.getElementById("albumTracks").innerHTML = "";
    // document.getElementById("albumImage").innerHTML = "";
    document.getElementById('header').innerHTML = "Artist";
  }
  else if(($('#albuminput').val()).length > 0){
    // var css = document.getElementById("style2");
    // css.href = "file:///Users/kachaiken/Dropbox/cse204/10-final-project-katie-matt/artistalbum.css";
    document.getElementById('header').innerHTML = "Artist and Album";
  }
}
var curpage;
if(document.getElementById("albuminput").value == ""){
  curpage = "artist.html";
}
else{
  curpage = "artistalbumsearch.html";
}
function switchPage(){
  if(curpage == "artist.html" && document.getElementById("albuminput").value == ""){
      document.getElementById('enterbutton').setAttribute('onclick', "window.location.href = 'artist.html';");
  }
  else if(curpage == "artist.html" && document.getElementById("albuminput").value != ""){
    document.getElementById('enterbutton').setAttribute('onclick', "window.location.href = 'artistalbumsearch.html';");
  }
  else if(curpage == "artistalbumsearch.html" && document.getElementById("albuminput").value == ""){
    document.getElementById('enterbutton').setAttribute('onclick', "window.location.href = 'artist.html';");
  }
  else if(curpage == "artistalbumsearch.html" && document.getElementById("albuminput").value != ""){
    document.getElementById('enterbutton').setAttribute('onclick', "window.location.href = 'artistalbumsearch.html';");
  }
}

$("#enterbutton").click(function () {
  cssSelector();
  load();
  switchPage();
  $('#albuminput').val('');
  $('#artistinput').val('');
});

$(document).keydown(function(event) {
  if(event.which === 13 || event.keyCode === 13){
    cssSelector();
    load();
    switchPage();

    $('#albuminput').val('');
    $('#artistinput').val('');
  }
});

if(click > 0){
  cssSelector();
  load();
}

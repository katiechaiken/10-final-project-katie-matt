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
        url: 'http://ws.audioscrobbler.com/2.0/',
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
        url: 'http://ws.audioscrobbler.com/2.0/',
        data: 'method=artist.gettopalbums&' +
        'artist=' + artist + '&' +
        'api_key=57ee3318536b23ee81d6b27e36997cde&' +
        'format=json',
        dataType: 'jsonp',
        success: function(data) {

          $('#success #extraAlbum1').html('<img src='+ data.topalbums.album[0]["image"][3]["#text"] + '/>');
          $('#success #extraAlbum2').html('<img src='+ data.topalbums.album[1]["image"][3]["#text"] + '/>');
          $('#success #extraAlbum3').html('<img src='+ data.topalbums.album[2]["image"][3]["#text"] + '/>');
          $('#success #extraAlbum4').html('<img src='+ data.topalbums.album[3]["image"][3]["#text"] + '/>');


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
        url: 'http://ws.audioscrobbler.com/2.0/',
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
            list+= '\n' + data.album.tracks.track[i]["name"] + ", ";

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
        url: 'http://ws.audioscrobbler.com/2.0/',
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
            list+= '\n' + (i+1) + ". " + data.toptracks.track[i]["name"];
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
//PULL ARTIST IMAGE AND SONG ID AND THEN GET TRACK ID TO PLAY
function artistImageAndSong(){


  $(document).ready(function(){
    var artist;
    var found;
    artist = ($('#artistinput').val())

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

        for(var i = 0; i < data.data.length; i++){
          if(data.data[i].artist["name"] == artist){
            found = i;
          }
          // alert(data.data[i].artist["name"]);
        }
        if(found == null){
          found = 0;
        }
        $('#artistImage').html('<img src='+ data.data[found].artist["picture_medium"]+'>');

        //SONG STUFF
        songID = data.data[found]["id"];
        var trackAPI = {
          "async": true,
          "crossDomain": true,
          "url": "https://deezerdevs-deezer.p.rapidapi.com/track/" + songID,
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "f144d33662msh100deaa3295a86ep16468bjsnf8b0aa4ce839"
          }
        }
        $.ajax(trackAPI).done(function (data) {
          console.log(data);
          console.log(data.preview);
          var song = document.getElementById("player");
          song.src = data.preview;
          $("#play").click(function(){
            song.play();
          });
          $("#pause").click(function(){
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
    var css = document.getElementById("style2");
    css.href = "file:///Users/kachaiken/Dropbox/cse204/10-final-project-katie-matt/artist.css";
    document.getElementById("albumTracks").innerHTML = "";
    document.getElementById("albumImage").innerHTML = "";
  }
  else if(($('#albuminput').val()).length > 0){
    var css = document.getElementById("style2");
    css.href = "file:///Users/kachaiken/Dropbox/cse204/10-final-project-katie-matt/artistalbum.css";
  }
}
$("#enterbutton").click(function () {
  cssSelector();
  load();
  $('#albuminput').val('');
  $('#artistinput').val('');
});

$(document).keydown(function(event) {
  if(event.which === 13 || event.keyCode === 13){
    cssSelector();
    load();
    $('#albuminput').val('');
    $('#artistinput').val('');
  }
});

if(click > 0){
  cssSelector();
  load();
}

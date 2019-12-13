
// PULL ARTIST INFO THROUGH USER INPUT!
function artistInfo(){
  $(document).ready(function(){
    var artist;

    $("#enterbutton").click(function(){
      artist = ($('#input').val())

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

  });
}


// ALBUM INFO
function albumInfo(){
  $(document).ready(function(){
    var artist;
    var album;
    $("#enterbutton").click(function(){
      artist = ($('#input').val())
      album = ($('#input2').val())
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
          list+= data.album.tracks.track[i]["name"] + ", ";

        }
        $('#success #albumTracks').html(list);
        $('#success #albumImage').html('<img src='+ data.album.image[3]['#text'] + '/>')
      },
      error: function(code, message) {
        $('#error2').html('Error Code: ' + code + ', Error Message: ' + message);
      }
    });
  });
  });
}

//TOP TRACKS
function topTracks(){
  $(document).ready(function(){
    var artist;

    $("#enterbutton").click(function(){
      artist = ($('#input').val())

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
        $('#success #artistNameTopTrack').html(data.toptracks.track[0]["artist"].name);

        $('#success #topTracks').html(list);

      },
      error: function(code, message) {
        $('#error2').html('Error Code: ' + code + ', Error Message: ' + message);
      }
    });
  });
  });
}

var songID1;
var songID2;
//PULL ARTIST IMAGE AND SONG ID AND THEN GET TRACK ID TO PLAY
function artistImageAndSong(){


  $(document).ready(function(){
    var artist;

    $("#enterbutton").click(function(){
      artist = ($('#input').val())

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
      $('#artistImage').html('<img src='+ data.data[0].artist["picture_medium"]+'>');

      //SONG STUFF
      songID = data.data[1]["id"];
      //to get songs from album for more specific plays!
      //https://rapidapi.com/deezerdevs/api/deezer-1?endpoint=53aa5085e4b07e1f4ebeb42c
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
  });
}

function load(){
  topTracks();
  artistImageAndSong();
  albumInfo();
  artistInfo();
}


load();

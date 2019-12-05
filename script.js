// ARTIST INFO
$(document).ready(function(){
  $.ajax({
    type: 'POST',
    url: 'http://ws.audioscrobbler.com/2.0/',
    data: 'method=artist.getinfo&' +
    'artist=Jon+Bellion&' +
    'api_key=57ee3318536b23ee81d6b27e36997cde&' +
    'format=json',
    dataType: 'jsonp',
    success: function(data) {
      $('#success #artistName').html(data.artist.name);
      $('#success #artistBio').html(data.artist.bio.content);
    },
    error: function(code, message) {
      $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
    }
  });
});

// ALBUM INFO
$(document).ready(function(){
  $.ajax({
    type: 'POST',
    url: 'http://ws.audioscrobbler.com/2.0/',
    data: 'method=album.getinfo&' +
    'artist=Jon+Bellion&' +
    'album=The+Human+Condition&' +
    'api_key=57ee3318536b23ee81d6b27e36997cde&' +
    'format=json',
    dataType: 'jsonp',
    success: function(data) {
      var list = "";
      console.log(data.album.tracks.track.length);
      for(var i  = 0; i < data.album.tracks.track.length; i++){
        list+= data.album.tracks.track[i]["name"] + ", ";

      }
      $('#success #albumTracks').html("Tracks in The Human Condition: " + list);
      $('#success #albumImage').html("Album art: " + '<img src='+ data.album.image[3]['#text'] + '/>')
    },
    error: function(code, message) {
      $('#error2').html('Error Code: ' + code + ', Error Message: ' + message);
    }
  });
});

//TOP TRACKS
$(document).ready(function(){
  $.ajax({
    type: 'POST',
    url: 'http://ws.audioscrobbler.com/2.0/',
    data: 'method=artist.gettoptracks&' +
    'artist=Jon+Bellion&' +
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
      $('#success #artistNameTopTrack').html(data.toptracks.track[0]["artist"].name + " top 10 tracks:");

      $('#success #topTracks').html(list);

    },
    error: function(code, message) {
      $('#error2').html('Error Code: ' + code + ', Error Message: ' + message);
    }
  });
});

//API FROM DEEZER TO PLAY SONG (hard coded the track ID (676891442)... fix later)
$(document).ready(function(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://deezerdevs-deezer.p.rapidapi.com/track/676891442",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "f144d33662msh100deaa3295a86ep16468bjsnf8b0aa4ce839"
    }
  }
  $.ajax(settings).done(function (data) {
    console.log(data);
    console.log(data.preview);
    var song = document.createElement("audio");
    song.src = data.preview;
    $("#play").click(function(){
      song.play();
    });
    $("#pause").click(function(){
      song.pause();
    });
  });

});

$(document).ready(function(){

  var settings = {
  	"async": true,
  	"crossDomain": true,
  	"url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=jon%20bellion",
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  		"x-rapidapi-key": "f144d33662msh100deaa3295a86ep16468bjsnf8b0aa4ce839"
  	}
  }

$.ajax(settings).done(function(data) {
	console.log(data);
    alert(data.data[0]["id"]);
  });

});

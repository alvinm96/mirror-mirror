(function(window) {
  var tts = function(options, text) {
    try {
      var synthesizeEndpoint = 'https://api.voicebox.com/speech-synthesis/v1/synthesize';
      var xhttp = new XMLHttpRequest();
      var voice = options.voice;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var audio = new window.Audio();
          var blobUrl = window.URL.createObjectURL(xhttp.response);
          audio.src = blobUrl;
          audio.play();
        }
      };
      var synthesizeQuery = synthesizeEndpoint +
        '?text=' + encodeURIComponent(text) + 
        '&voice=' + voice;
      xhttp.open('GET', synthesizeQuery, true);
      xhttp.setRequestHeader('Authorization', 'Basic ' + options.key);
      xhttp.responseType = 'blob';
      xhttp.send();  
    } catch (e) {
      console.log(e);
    }
  };
  window.tts = tts;
})(window);
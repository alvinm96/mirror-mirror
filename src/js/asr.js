/**
 * Created by alvinm on 7/11/16.
 */
// grants access to VoiceBox endpoints
var apiKey = 'RUo4RmVLVVVpUGJnYkxHejpOSmdJS3hkTExXT0NHZVla';
// The URL
var asrEndpoint = 'https://api.voicebox.com/speech-recognition/v1/recognize';
function uploadFile(file) {
  // reset html
  document.getElementById('asrResult').innerHTML = '';
  // Media Type of the audio file
  // Object used to exchange data with VoiceBox servers
  var xhttp = new XMLHttpRequest();
  // Object that allows for compiling a set of key/value pairs to send to VoiceBox servers
  var formData = new FormData();
  // function triggered each time the readyState property changes.
  xhttp.onreadystatechange = function() {
    // Confirms the operation is complete and successfully made
    if(xhttp.readyState === 4 && xhttp.status === 200) {
      // display the response in the HTML
      document.getElementById('asrResult').innerHTML = xhttp.responseText;
    }
  };
  // append the audio file to the formData object
  formData.append('audioFile', file[0]);
  // append the encoding to the formData object
  formData.append('encoding', 'audio/wav');
  // create a POST Request to the AsrEndpoint
  xhttp.open('POST', asrEndpoint, true);
  // Set the auth header to apiKEY, allows access to endpoint.
  xhttp.setRequestHeader("Authorization", 'Basic ' + apiKey);
  // send the formData to the Endpoint
  xhttp.send(formData);
}
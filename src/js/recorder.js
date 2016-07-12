/**
 * Created by alvinm on 7/11/16.
 */
var navigator = window.navigator;

navigator.getUserMedia = (
  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUerMedia
);

var Context = window.AudioContext || window.webkitAudioContext;
var context = new Context();

var mediaStream;
var rec;

function record() {
  navigator.getUserMedia({audio: true}, function(localMediaStream){
    mediaStream = localMediaStream;

    var mediaStreamSource = context.createMediaStreamSource(localMediaStream);

    rec = new Recorder(mediaStreamSource, {

      workerPath: `file://${__dirname}/../bower_components/recorderjs/recorderWorker.js`
    });
    rec.record();
  }, function(err){
    console.log('Browser not supported');
  });
}

function stop() {
  mediaStream.stop();
  rec.stop();

  rec.exportWAV(function(e) {
    rec.clear();
    Recorder.forceDownload(e, 'filename.wav');
  });
}
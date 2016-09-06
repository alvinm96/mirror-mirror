/**
 * Created by danb on 4/25/16.
 */

var wsOptions;
var ws;
var isConnected;
var isAudioDone;
var buffersReceived;
var buffersSent;
var buffersDropped;

var self = this;

onmessage = function(e) {
  var eventName = e.data[0];
  switch(eventName) {
    case 'init':
      wsOptions = e.data[1];
      buffersReceived = 0;
      buffersSent = 0;
      buffersDropped = 0;
      wsOptions.encoding = 'audio/raw;coding=linear;rate=' + wsOptions.sampleRate + ';byteorder=LE';
      isConnected = false;
      isAudioDone = false;
      connectWs();
      console.log('wsWorker -init');
      break;
    case 'data':
      ++buffersReceived;
      if(isConnected && !isAudioDone) {
        ws.send(e.data[1]);
      } else {
        ++buffersDropped;
      }
      break;
    case 'audioDone':
      isAudioDone = true;
      var doneMessage = {
        message: 'AudioDone'
      }
      ws.send(JSON.stringify(doneMessage));
      break;
    case 'close':
      // Force close the socket.  Happens when caller decide to stop sening data.
      //  Will trigger the 'onclose' socket event
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      isConnected = false;
    default:
      break;
  }
}

function connectWs() {
  ws = new WebSocket(wsOptions.jwt.url);

  ws.onopen = function(event) {
    
    // send the connection information to the server
    var connectionInfo = {
      token: wsOptions.jwt.token,
      encoding: wsOptions.encoding,
      locale: wsOptions.locale
    };
    ws.send(JSON.stringify(connectionInfo));
    isConnected = true;
    postMessage({
      event: 'socketOpen'
    });
  };

  ws.onmessage = function(event) {
    postMessage({
      event: 'data',
      data: event.data
    });
  }
  
  ws.onclose = function() {
    isConnected = false;
    postMessage({
      event: 'socketClosed'
    });
  }

  ws.onerror = function(err) {
    isConnected = false;
    sendError(err);
  };
}

function sendError(err) {
  postMessage(err);
}


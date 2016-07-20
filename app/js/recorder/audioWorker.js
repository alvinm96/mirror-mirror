/**
 * Created by danb on 4/24/16.
 */


var audioOptions;
var rawBuffersProcessed = 0;
var isListening = false;
var curOutputBuffer;
var curOutputBufferOffset = 0;

onmessage = function(e) {
  var eventName = e.data[0];
  switch(eventName) {
    case 'data':
      // downsample and add to buffer
      if(isListening) {
        processData(e.data[1]);
        ++rawBuffersProcessed;
      }
      break;
    case 'audioStart':
      audioOptions = e.data[1];
      curOutputBufferOffset = 0;
      curOutputBuffer = new Int16Array(audioOptions.bufferSize);
      isListening = true;
      postMessage( {
        event: 'audioStart',
      });
      break;
    case 'audioDone':
      // if there is data in the current buffer, post it.  Post the 'audioDone' event
      if (curOutputBufferOffset > 0) {
        postCurrentBuffer()
      }
      postMessage( {
        event: 'audioDone',
      });
      isListening = false;
      break;
    default:
      postMessage({
        event: 'error',
        message: 'unexpected command: ' + command
      });
      break;
  }
}

function processData(rawAudio) {
  // a sample ratio greater less than 1 means the browser sample at a lower rate than the requested rate
  //  and downsampling cannot be done.  Sample ratio of 1 means downsampling is not required.
  // If not 'listening, ignore the buffers
  if((audioOptions.sampleRatio > 1) && isListening) {
    downsampleRawAudio(rawAudio)
  } else {
    convertRawAudio(rawAudio);
  }
}

function downsampleRawAudio(rawAudio) {
  var downsampleLength = Math.round(rawAudio.length / audioOptions.sampleRatio);
  var downsampleOffset = 0;
  var offsetRawAudio = 0;
  while (downsampleOffset < downsampleLength) {
    var nextOffsetBuffer = Math.round((downsampleOffset + 1) * audioOptions.sampleRatio);
    var accum = 0,
      count = 0;
    for (var i = offsetRawAudio; i < nextOffsetBuffer && i < rawAudio.length; i++) {
      accum += rawAudio[i];
      count++;
    }
    // convert sample from float to Int16
    var sample = Math.min(1, accum / count) * 0x7FFF;
    addSampleToOutputBuffer(sample);
    downsampleOffset++;
    offsetRawAudio = nextOffsetBuffer;
  }
}

function convertRawAudio(rawAudio) {
  var offset = 0;
  while (offset < rawAudio.length) {
    var sample = Math.min(1, rawAudio[offset]) * 0x7FFF;
    ++offset;
    addSampleToOutputBuffer(sample);
  }
}

function addSampleToOutputBuffer(sample) {
  // add to the output buffer if there is space, otherwise send the current buffer and create a new one
  if (curOutputBufferOffset < audioOptions.bufferSize) {
    curOutputBuffer[curOutputBufferOffset] = sample;
    ++ curOutputBufferOffset;
  } else {
    // send the current buffer, create a new one, and add the sample to the buffer
    postCurrentBuffer();
    curOutputBuffer[curOutputBufferOffset] = sample;
    ++curOutputBufferOffset;
  }
}

function postCurrentBuffer() {
  // send the current buffer and create a new buffer for the samples
  // FIXME.  need to find a way to optimize data transfer.  Data is cloned in postMessage by default
  //  not good for 8K buffers
  var transferBuffer = curOutputBuffer;
  postMessage( {
    event: 'data',
    sampleRate: audioOptions.sampleRate,
    sampleBytes: audioOptions.sampleBytes,
    buffer: transferBuffer
  });
  curOutputBuffer = new Int16Array(audioOptions.bufferSize);
  curOutputBufferOffset = 0;
}

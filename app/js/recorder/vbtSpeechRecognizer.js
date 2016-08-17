/**
 * Created by danb on 4/20/16.
 */

/*
Known issues:
 - need to implement ring buffers to account for delay opening websockets (delayTime)
 - need to deal with jwt security issues (robably have to tell the developer to create their own server
 - need new state:  'isRecognizing' must exist since the recognize process extends past the listening end state
 - validation and error handling must be fully implemented
 - Pythia timeout must be propogated to the client so 'stopListening' can be triggered
 */
  
(function(window) {

  var VbtSpeechRecognizer = function(options, callback) {
    try {

      // set up webworker for audio data processing: downsampling and recorder buffer building
      var audioWorker = new Worker('js/recorder/audioWorker.js');
      audioWorker.onmessage = handleAudioWorkerMessages;
      audioWorker.onerror = handleAudioWorkerErrors;

      // set up webworker for send recorder buffers to Glados
      // FIXME:  wsWorker should be a 'shrared worker' so data *might* be be able to be sent directly
      //  from the audioWorker to the wsWorker
      var wsWorker = new Worker('js/recorder/wsWorker.js');
      wsWorker.onmessage = handleWsWorkerMessages;
      wsWorker.onerror = handleWsWorkerErrors;

      // save instance data
      this.jwt = options.jwt || {};
      this.audioInputNode = options.audioInputNode || {};
      this.delayTime = options.delayTime || 3000;
      this.locale = options.locale || 'en-US';
      this.callback = callback;
      var self = this;

      // State information
      this.isListening = false;

      // The raw audio is captured in the silence detection module.  This insures that the data reflective of the user
      // speech is captured in the output buffers and cuts down on redundant audio processing
      this.vad;
      this.vadOptions = {
        source: this.audioInputNode,
        vadBufferLen: 512,
        energy_threshold_ratio_neg: 0.8,
        sendRawAudio: processRawAudio,
        voiceStart: startSpeech,
        voiceStop: stopSpeech
      };
      
      //  audioWorker setup
      /*
       Calculate the sample ratio.  If the ratio is less than or 1 it means the browser is sampling
       at less than the requested output sample rate, in which case there can be no downsampling.
       If the sample rate is 1, no downsampling is required
       */
      this.outputSampleRate = options.outputSampleRate || 16000;  // preferred Pythia sample rate
      this.outputSampleRatio = this.audioInputNode.context.sampleRate / this.outputSampleRate;
      if (this.outputSampleRatio <= 1) {
        outputSampleRate = this.audioInputNode.context.sampleRate;
      }
      this.sampleBytes = options.sampleBytes || 2;
      this.outputBufferSize = options.outputBufferSize || 4096;  // preferred Pythia buffer size is 8192 bytes
      this.rawBuffersReceived = 0;
      this.outputBuffersReceived = 0;
      this.audioOptions = {
        sampleRate: this.outputSampleRate,
        sampleBytes: this.sampleBytes,
        bufferSize: this.outputBufferSize,
        sampleRatio: this.outputSampleRatio
      };

      // wsWorker setup
      
      // calculate the number of buffers needed to provide the delayTime
      var millisPerBuffer = this.outputBufferSize / this.outputSampleRate;
      var buffersRequired = Math.ceil((this.delayTime / millisPerBuffer) );
      this.wsOptions = {
        jwt: this.jwt,
        sampleRate: this.outputSampleRate,
        locale: this.locale,
        buffersRequired: buffersRequired
      };

      function processRawAudio(buffer) {
        ++self.rawBuffersReceived;
        audioWorker.postMessage(['data', buffer])
        //console.log('got buffer')
      };
      function startSpeech() {
        console.log('--> start speech');
      }
      function stopSpeech() {
        console.log('--> stop speech');
        self.stopListening();
        self.callback('stopSpeech');
      }

      // Public methods
      this.setJWT = function(jwt) {
        self.jwt = jwt;
      };
      this.startListening = function() {
        wsWorker.postMessage(['init', self.wsOptions]);
        audioWorker.postMessage(['audioStart', self.audioOptions]);
        self.vad = new VAD(this.vadOptions);
      };
      this.stopListening = function() {
        self.vad.stopVad();
        audioWorker.postMessage(['audioDone']);
      }
      
      // Private methods
      function handleAudioWorkerMessages(e) {
        var event = e.data.event;
        switch (event) {
          case 'audioStart':
            console.log('vbtSpeech received audioStart from audio worker');
            break
          case 'data':
            setTimeout(function(){
              // post data to wsWorker
              ++self.outputBuffersReceived;
              wsWorker.postMessage(['data', e.data.buffer]);
            }, 0);

            break;
          case 'audioDone':
            wsWorker.postMessage(['audioDone']);
            console.log('vbtSpeech received audioDone from audio worker');
            console.log('  raw audio buffers processed (' + self.vadOptions.vadBufferLen +' 2 byte samples per buffer):  ' + self.rawBuffersReceived);
            console.log('  outputBuffers received (' + self.audioOptions.bufferSize +' 2 byte samples per buffer):  ' + self.outputBuffersReceived);
            console.log('  browser sample rate: ' + self.audioInputNode.context.sampleRate + ' 2 byte samples per second');
            console.log('  output sample rate: ' + self.audioOptions.sampleRate + ' 2 byte samples per second');
            console.log('  sample ratio:  ' + self.audioOptions.sampleRatio);
            break;
          default:
            console.log('unexpected event from audioWorker: ' + event);
        }
      }
      function handleAudioWorkerErrors(e) {
        console.log(e.message);
      }
      function handleWsWorkerMessages(e) {
        var event = e.data.event;
        switch (event) {
          case 'socketOpened':
            console.log('wsWorker -socketOpened');
            break;
          case 'data':
            var event = e.data.event;
            var data = e.data.data;
            console.log('wsWorker result:  ' + data);
            self.callback(event, data);
            break;
          default:
            break;
        }
      }
      function handleWsWorkerErrors(e) {
        console.log(e.message);
      }
    } catch (exception) {
      this.callback('error', exception);
    }
  };

  window.VbtSpeechRecognizer = VbtSpeechRecognizer;
})(window);


/// <reference path="./../../../typings/index.d.ts" />
import { Component, OnInit } from '@angular/core';

import { AsrHttpService } from './asr-http.service.ts';

import './recorder.js';
declare var Recorder: any;

@Component({
  'selector': 'asr-http',
  'template': `
              <button (click)="startRecording()">start</button>
              <button (click)="stopRecording()">stop</button>
              <button (click)="send()">send</button>        
              `,
  'providers': [ AsrHttpService ]
})
export class AsrHttpComponent implements OnInit {
  audioContext: AudioContext;
  audioInput: AudioNode;
  realAudioInput: AudioNode;
  inputPoint;
  audioRecorder;
  rafId;
  analyserContext;
  analyserNode: AnalyserNode;
  download = 'audio.wav'
  downloadURL;
  window: any;

  constructor(private asr: AsrHttpService) { }

  ngOnInit() {
    this.window = window;

    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    this.audioContext = new AudioContext();

    navigator.getUserMedia({audio: true}, (stream) => {
      this.inputPoint = this.audioContext.createGain();
      this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
      this.audioInput = this.realAudioInput;
      this.audioInput.connect(this.inputPoint);
      this.analyserNode = this.audioContext.createAnalyser();
      this.analyserNode.fftSize = 2048;
      this.inputPoint.connect(this.analyserNode);
      this.audioRecorder = new Recorder(this.inputPoint, null);      
    }, (e) => {
      alert('Error getting audio');
      console.log(e);
    });
  }

  startRecording() {
    this.audioContext.resume();
    this.audioRecorder.record();
  }

  stopRecording() {
    this.audioContext.suspend();
    this.audioRecorder.stop();
    this.audioRecorder.clear();
    this.createDownloadLink();
  }
  
  createDownloadLink() {
    this.audioRecorder.exportWAV((blob) => {
      let url = URL.createObjectURL(blob);
      this.downloadURL = url;
    });
  }

}
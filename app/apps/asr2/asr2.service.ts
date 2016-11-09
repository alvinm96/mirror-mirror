/// <reference path="./../../../node_modules/@types/webrtc/index.d.ts"/>
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { config } from './../../config';
import { Observable } from 'rxjs/Rx';

const rec = require('node-record-lpcm16');
const fs = require('fs');
declare var Recorder;

@Injectable()
export class Asr2Service {
  private baseUrl: string = 'https://api.voicebox.com';
  private recorder: any;
  private ws: WebSocket;
  private audioInput;
  private audioContext: AudioContext;
  private firstMessage: boolean = true;
  private response: Observable<any> = new Observable<any>();

  constructor(private http: Http) { }

  authorize() {
    let url = this.baseUrl + '/authn/v1/jwt';
    let headers = new Headers({
      'Accept': 'application/json',
      'Authorization': ('Basic ' + config.voicebox.key)
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, JSON.stringify(null), options)
      .map((res) => {
        return res.json();
      })
      .subscribe(this.connectToAsr);
  }

  connectToAsr(jwt: any) {
    this.ws = new WebSocket(jwt.url);
    
    this.ws.onopen = (event) => { 
      let message = {
        'token': jwt.token,
        'encoding': 'audio/raw;rate=16000;byteorder=LE;coding=linear',
        'locale': 'en-US'
      };
      this.ws.send(JSON.stringify(message));
    };

    this.ws.onmessage = this.onMessage;
    this.ws.onclose = this.onClose;
    this.ws.onerror = this.onError;
  }

  startRecording() {
    let recording = rec.start({
      verbose: true
    });
    let buffers;
    recording.on('data', (data) => {
      buffers = data;
    });
  }

  private onMessage(event: MessageEvent) {
    console.log(event.data);
  }

  private onClose(event) {

  }

  private onError(event) {

  }

}
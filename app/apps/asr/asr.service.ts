/// <reference path="./../../../node_modules/@types/webrtc/index.d.ts"/>
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NluService } from './../nlu/nlu.service';
import { config } from './../../config';

@Injectable()
export class AsrService { 
  isListening: boolean = false;  
  audioContext: AudioContext;
  audioNode: AudioNode;
  vbtSpeechRecognizer: any;
  window: any;
  isReady = new EventEmitter<boolean>(false);
  intent = new EventEmitter<Object>();
  asrResult = new EventEmitter<Object>();

  constructor(private http: Http, private nlu: NluService) { }

  initASR() {
    this.window = window;
    
    this.audioContext = new AudioContext();
    
    navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);


    navigator.getUserMedia({audio: true}, (stream) => {
      this.audioNode = this.audioContext.createMediaStreamSource(stream);     
    }, (err) => {
      console.log('navigator.getUserMedia error');
    })        
    this.getJWT().subscribe((res) => {    
      this.initVbtSpeechRecognition(res);
      this.isReady.emit(true);
    }); 
  }

  setListening() {
    if (this.vbtSpeechRecognizer) {
      if (!this.isListening) {
        this.vbtSpeechRecognizer.startListening();
        this.isListening = false;
      } else {
        this.vbtSpeechRecognizer.stopListening();
        this.isListening = true;
      }
    }
  }

  getJWT(): Observable<any> {
    let body = JSON.toString();
    let apiKey = config.voicebox.key;
    let url = 'https://api.voicebox.com/authn/v1/jwt';
    let headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Basic ' + apiKey
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { }; 
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleUtterance(utterance: string) {
    this.nlu.getIntent(utterance)
      .subscribe((res) => {
        this.intent.emit(res);
      });
  }
  private initVbtSpeechRecognition(jwt: any) {
    if (!this.audioNode) {
      alert('There was an error with initializing audio');
    } else {
      let options = {
        jwt: jwt,
        audioInputNode: this.audioNode,
        vadBufferLen: 512
      };
    
      this.vbtSpeechRecognizer = new this.window.VbtSpeechRecognizer(options, (event, data) => {
        switch(event) {
          case 'error':
            console.log(data);
            break;
          case 'stopSpeech':
            break;
          case 'data':
            let resultJson = JSON.parse(data);
            if (resultJson.hasOwnProperty('results')) {
              this.asrResult.emit(resultJson);

              if (resultJson.status === 'finalResult') {
                  this.handleUtterance(resultJson.results[0].utterance);
              }
            } else {
              let rawJson = JSON.stringify(resultJson, null, 2);
            }
            break;
          default:
            break;
        }
      });
    }
  }
}
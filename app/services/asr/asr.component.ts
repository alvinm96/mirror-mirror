/// <reference path="./../../../typings/index.d.ts" />
import { Component, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { NluService } from './../nlu/nlu.service';

import { config } from './../../config';

@Component({
  selector: 'asr',
  templateUrl: './services/asr/asr.component.html',
})

export class AsrComponent implements AfterContentInit { 
  isListening: boolean = false;
  audioContext: AudioContext;
  audioNode: AudioNode;
  vbtSpeechRecognizer: any;
  window: any;
  @Output() response = new EventEmitter<Object>();
  utterance: string;

  constructor(private http: Http, private nlu: NluService) { }

  ngAfterContentInit() {
    this.window = window;

    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    this.audioContext = new AudioContext();

    navigator.getUserMedia({audio: true}, (stream) => {
      this.audioNode = this.audioContext.createMediaStreamSource(stream);
    }, (err) => {
      console.log('navigator.getUserMedia error');
    })        
    this.getJWT().then((res) => {
      this.initVbtSpeechRecognition(res);
      this.setListening();
    }); 
  }

  sendResponse(resJson: Object) {
    this.response.emit(resJson); 
  } 

  private setListening() {
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

  private getJWT() {
    let body = JSON.toString();
    let apiKey = config.voicebox.key;
    let url = 'https://api.voicebox.com/authn/v1/jwt';
    let headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Basic ' + apiKey
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, body, options)
      .toPromise()
      .then(this.extractData)
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

  private initVbtSpeechRecognition(jwt) {
    if (!this.audioNode) {
      alert('Error in web audio initialization');
    } else {
      let options = {
        jwt: jwt,
        audioInputNode: this.audioNode,
        vadBufferLen: 512
      }
    
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
              let result = resultJson.results[0].utterance;
              this.utterance = result;

              if (resultJson.status === 'finalResult') {
                this.nlu.getIntent(result)
                  .then((res) => {
                    this.sendResponse(res);
                  });
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
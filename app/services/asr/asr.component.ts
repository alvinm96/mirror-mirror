/// <reference path="./../../../typings/index.d.ts" />
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'asr',
  templateUrl: './services/asr/asr.component.html',
  outputs: [ 'utterance', 'status' ]
})

export class AsrComponent implements OnInit { 
  isListening: boolean = false;
  audioContext: AudioContext;
  audioNode: AudioNode;
  vbtSpeechRecognizer;
  window: any;
  utterance = new EventEmitter<string>();
  status = new EventEmitter<string>();
  icon: string = '<i class="fa fa-microphone"></i>';

  constructor(private http: Http) { }

  sendUtterance(val: string) {
    this.utterance.emit(val);
  }

  sendStatus(val: string) {
    this.status.emit(val);
  }

  ngOnInit() {
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

    this.getJWT().then(res => {
      this.initVbtSpeechRecognition(res);
      this.setListening();
    }); 
  }

  private setListening() {
    console.log('asdf');
    if (this.vbtSpeechRecognizer) {
      if (!this.isListening) {
        console.log('Listening');
        this.vbtSpeechRecognizer.startListening();
        this.isListening = false;
        this.icon = '<i class="fa fa-stop stop"></i>';
      } else {
        this.vbtSpeechRecognizer.stopListening();
        this.isListening = true;
        this.icon = '<i class="fa fa-microphone"></i>'
      }
    }
  }

  private getJWT() {
    let body = JSON.toString();
    let apiKey = 'RUo4RmVLVVVpUGJnYkxHejpOSmdJS3hkTExXT0NHZVla';
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
    alert('got jwt');
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
              this.sendUtterance(resultJson.results[0].utterance);
              this.sendStatus(resultJson.status);
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
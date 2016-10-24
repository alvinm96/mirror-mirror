/// <reference path="./../../../node_modules/@types/node/index.d.ts"/>
import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from './../../config';
import * as fs from 'fs';
const record = require('node-record-lpcm16');

@Injectable()
export class SnowboyService {
  recordings: any[] = [];
  token: string = config.snowboy.key;
  isRecording = new EventEmitter<boolean>();

  constructor(private http: Http) {}

  train(name: string) {
    let url = 'https://snowboy.kitt.ai/api/v1/train/';

    let samples = [
      {'wave': this.getWave('./app/apps/snowboy/1.wav')},
      {'wave': this.getWave('./app/apps/snowboy/1.wav')},
      {'wave': this.getWave('./app/apps/snowboy/1.wav')},
    ];

    let headers = new Headers({
      // 'Accept': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/json;charset=utf-16'
    });
    let options = new RequestOptions({headers: headers});

    let data = {
      'name': name,
      'language': 'en',
      'age_group': '20_29',
      'gender': 'M',
      'microphone': 'macbook microphone',      
      'token': '43d9f5b45d1bc7afde2db0644cd91f00550725b8',
      'voice_samples': samples
    };

    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(xhr.response);
        let model = fs.createWriteStream('./app/' + name + '.pmdl');

        model.on('finish', function() {
          console.log('created model');
        });
        model.write(xhr.response);
      }
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.setRequestHeader('Accept', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify(data));
  }
  //TODO: This will train the already set hotword 
  improve() {

  }

  record() {
    let filename = (this.recordings.length + 1) + '.wav'
    let file = fs.createWriteStream('./app/apps/snowboy/' + filename);
    record.start();
    console.log('started recording');
    setTimeout(() => {
      console.log('stopped recording');
      record.stop().pipe(file);

      this.recordings.push('./app/apps/snowboy/' + filename);
    }, 3000);
  }

  private getWave(file: string) {
    return new Buffer(fs.readFileSync(file)).toString('base64');
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }  
}
/// <reference path="../../../node_modules/@types/electron/index.d.ts"/>
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from './../../config';
import * as electron from 'electron';

const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

@Injectable()
export class PushbulletService {
  private authWin: Electron.BrowserWindow;
  private token: string;
  sendToken = new EventEmitter<string>();

  constructor(private http: Http) { }

  getPushes(): Observable<any> {
    let url = 'https://api.pushbullet.com/v2/pushes?limit=1';
    let headers = new Headers({'Access-Token': this.token});
    let options = new RequestOptions({headers: headers});
    
    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  sendToDevice(message: any): Observable<any> {
    let url = 'https://api.pushbullet.com/v2/pushes';
    let headers = new Headers({
      'Access-Token': this.token,
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers:headers});
    let body = {
      'type': message.type,
      'title': message.title,
      'body': message.body,
      'url': message.url
    };
    return this.http.post(url, JSON.stringify(body), options)
      .map((res) => {
        console.log('Message sent');
        return res.json();
      })
      .catch(this.handleError);
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

  authorize() {
    let url = 'https://www.pushbullet.com/authorize?client_id=' + config.pushbullet.client_id +
      '&client_secret=' + config.pushbullet.client_secret + 
      '&redirect_uri=' + encodeURIComponent('http://localhost') +
      '&response_type=token';

    this.authWin = new BrowserWindow({fullscreen: true, show: true, webPreferences: { nodeIntegration: false }});
    this.authWin.loadURL(url);

    this.authWin.webContents.on('will-navigate', (event, url) => {
      this.handleCallback(url);
    });

    this.authWin.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      this.handleCallback(newUrl);
    }); 
  }

  private handleCallback(url) {
    var raw_code = /token=([^&]*)/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);

    if (code || error) {
      this.authWin.destroy();
    }
    if (code) {
      this.token = code;
      this.sendToken.emit(code);
    } else if (error) {
      alert('Error with logging in');
    }
  }
}
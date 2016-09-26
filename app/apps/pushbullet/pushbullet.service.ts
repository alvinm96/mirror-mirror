import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { config } from './../../config';
import * as electron from 'electron';

const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

@Injectable()
export class PushbulletService {
  authWin: Electron.BrowserWindow;
  token: string;
  sendToken = new EventEmitter<string>();

  constructor(private http: Http) { }

  getPushes() {
    let url = 'https://api.pushbullet.com/v2/pushes?limit=1';
    let headers = new Headers({'Access-Token': this.token});
    let options = new RequestOptions({headers: headers});
    
    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  sendToDevice(message: any) {
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
      .map(() => {
        console.log('Message sent');
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
      '&response_type=code';

    this.authWin = new BrowserWindow({fullscreen: true, show: true, webPreferences: { nodeIntegration: false }});
    this.authWin.loadURL(url);

    this.authWin.webContents.on('will-navigate', (event, url) => {
      this.handleCallback(url);
    });

    this.authWin.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      this.handleCallback(newUrl);
    }); 
  }

  private getToken(code) {
    let url = 'https://api.pushbullet.com/oauth2/token';
    
    let body = {
      'grant_type': 'authorization_code',
      'client_id': config.pushbullet.client_id,
      'client_secret': config.pushbullet.client_secret,
      'code': code
    }

    let headers = new Headers({'Content-Type': 'application/json'});

    let options = new RequestOptions({headers: headers});
    return this.http.post(url, JSON.stringify(body), options)
      .map((res: Response) => {
        let body = res.json();
        this.sendToken.emit(body.access_token);
        this.token = body.access_token;
      });  
  }

  private handleCallback(url) {
    var raw_code = /code=([^&]*)/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);

    if (code || error) {
      this.authWin.destroy();
    }
    if (code) {
      this.getToken(code);
    } else if (error) {
      alert('Error with logging in');
    }
  }
}
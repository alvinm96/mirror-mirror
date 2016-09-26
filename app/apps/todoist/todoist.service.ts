import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../../config';
import * as electron from 'electron';

const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
let uuid = require('node-uuid');

@Injectable()
export class TodoistService {
  private baseUrl: string = 'https://todoist.com/API/v7/sync';
  // private token: string = config.todoist.key;
  private token: string;
  authWin: Electron.BrowserWindow;

  constructor(private http: Http) { }

  getTodos() {
    let body = 'token='+ this.token +'&sync_token=*&resource_types=["items"]';  
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(this.baseUrl, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addTodo(todo: string) {
    let command = [{
      'type': 'item_add',
      'temp_id': uuid.v4(),
      'uuid': uuid.v1(),
      'args': {
        'content': this.capitalize(todo)
      }
    }];

    let body = 'token='+ this.token + '&commands=' + JSON.stringify(command);
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = new RequestOptions({headers: headers});
    
    return this.http.post(this.baseUrl, body, options)
      .map((res) => {
        this.getTodos();
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

  private capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }  

  authorize() {
    let url = this.getLoginUrl(['data:read_write','data:delete']);

    this.authWin = new BrowserWindow({fullscreen: true, show: true, webPreferences: {nodeIntegration: false}});
    this.authWin.loadURL(url);

    this.authWin.webContents.on('will-navigate', (event, url) => {
      this.handleCallback(url);
    });

    this.authWin.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      this.handleCallback(newUrl);
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

  private getToken(code) {
    let url = 'https://todoist.com/oauth/access_token';
    let params = new URLSearchParams();
    params.set('client_id', config.todoist.client_id);
    params.set('client_secret', config.todoist.client_secret);
    params.set('code', code);
    params.set('redirect_uri', 'http://localhost');
    let options = new RequestOptions({search: params});

    return this.http.post(url, JSON.stringify({}), options)
      .map((res: Response) => {
        let body = res.json();
        this.token = body.access_token;
      })
      .catch(this.handleError);
  }  

  private getLoginUrl(scopes) {
    return 'https://todoist.com/oauth/authorize?client_id=' + config.todoist.client_id +
      '&scope=' + encodeURIComponent(scopes.join(',')) +
      '&state=thisisasecretstring';
  }  
}
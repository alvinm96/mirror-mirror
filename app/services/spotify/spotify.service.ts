import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

const electron = require('electron');
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

@Injectable()
export class SpotifyService {
  private client_id: string = '78de19497f9742c9a41f220188a617da';
  private redirect_uri: string = 'http://localhost';
  authWin: Electron.BrowserWindow;

  constructor(private http: Http) { }

  getAccessToken() {
    let url = this.getLoginUrl(['user-read-email']);

    this.authWin = new BrowserWindow({fullscreen: true, show: true, webPreferences: {nodeIntegration: false}});
    this.authWin.loadURL(url);

    this.authWin.webContents.on('did-navigate', (event, url) => {
      this.handleCallback(url);
    });

    this.authWin.webContents.on('will-navigate', (event, url) => {
      this.handleCallback(url);
    });

    this.authWin.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      this.handleCallback(newUrl);
    });
  }

  getUserProfile() {
    let url = 'https://api.spotify.com/v1/me';
    let headers = new Headers({
      'Accept': 'application/json',
      'Authorization': ('Bearer ' + window.localStorage.getItem('spotify-token'))
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(url, options)
      .toPromise()
      .then((res: Response) => {
        let body = res.json();
        console.log(body);
      })
      .catch((err: any) => {
      alert(err);
      });
      
  }

  searchSong(query: string) {
    let url = 'https://api.spotify.com/v1/search';
    let params = new URLSearchParams();
    params.set('q', query);
    params.set('type', 'track');
    let headers = new Headers({
      'Accept': 'application/json',
      'Authorization': ('Bearer ' + window.localStorage.getItem('spotify-token'))
    });
    let options = new RequestOptions({headers: headers, search: params});

    return this.http.get(url, options)
      .toPromise()
      .then((res: Response) => {
        let body = res.json();
        console.log(body);
      })
      .catch((err: any) => {
      alert(err);
      });
  }

  private handleCallback(url) {  
    var raw_code = /access_token=([^&]*)/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);

    if (code || error) {
      this.authWin.destroy();
    }
    if (code) {
      window.localStorage.setItem('spotify-token', code);
    } else if (error) {
      alert('Error with logging in');
    }
  }

  private getLoginUrl(scopes) {
    return 'https://accounts.spotify.com/authorize?client_id=' + this.client_id +
      '&redirect_uri=' + encodeURIComponent(this.redirect_uri) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
  }

}
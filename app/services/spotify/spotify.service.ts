import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { TtsService } from './../tts/tts.service'

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { config } from './../../config';

const electron = require('electron');
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

@Injectable()
export class SpotifyService {
  private redirect_uri: string = 'http://localhost';
  authWin: Electron.BrowserWindow;
  private audio: HTMLAudioElement;

  constructor(private http: Http, private tts: TtsService) { }

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
        this.tts.synthesizeSpeech('There was an error getting your profile. Please authorize the mirror first.');
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
        return body;
      })
      .catch((err: any) => {
        this.tts.synthesizeSpeech('There was an error searching the song. Please authorize the mirror first.');
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
    return 'https://accounts.spotify.com/authorize?client_id=' + config.spotify.client_id +
      '&redirect_uri=' + encodeURIComponent(this.redirect_uri) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
  }
}
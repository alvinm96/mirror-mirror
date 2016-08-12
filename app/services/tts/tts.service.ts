import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { config } from './../../config.ts'
@Injectable()
export class TtsService {
  private key: string = config.voicebox.key;
  private voice: string = config.voicebox.ttsVoice || 'Reem';

  constructor(private http: Http) { }

  getVoices() {
    let url = 'https://api.voicebox.com/speech-synthesis/v1/voices';
    let val = 'Basic ' + this.key;
    let headers = new Headers({'Authorization': val});
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  synthesize(response: string) {
    let url = 'https://api.voicebox.com/speech-synthesis/v1/synthesize';
    let params = new URLSearchParams();
    params.set('text', response);
    params.set('voice', this.voice);

    let val = 'Basic ' + this.key;
    let headers = new Headers({
      'Authorization': val,
      'Accept': 'audio/wav'
    });
    let options = new RequestOptions({headers: headers});
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
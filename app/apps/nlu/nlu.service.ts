import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { config } from './../../config';

@Injectable()
export class NluService {
  private baseUrl: string = 'https://api.api.ai/v1/';
  private accessToken = config.apiai.key;

  constructor(private http: Http) { }

  getIntent(utterance: string): Observable<any> { 
    let url = this.baseUrl + 'query/';

    let body = {
      'query': utterance,
      'v': '20160818',
      'sessionId': '1234567890',
      'lang': 'en',
      'timezone': 'America/Washington'
    };

    let headers = new Headers({
      'Authorization': ('Bearer ' + this.accessToken),
      'Content-Type': 'application/json; charset=utf-8'
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, JSON.stringify(body), options)
      .map(this.extractData)
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
}  

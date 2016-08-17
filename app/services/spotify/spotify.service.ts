import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  private clientId = '78de19497f9742c9a41f220188a617da';
  private clientSecret = 'fd3dbee9e0fb460f87625ef85f52b52f';

  constructor(private http: Http) { }

  authorize() {
    let url = 'https://accounts.spotify.com/api/token';
    let body = 'grant_type=client_credentials';

    let encoded = 'Basic ' + (new Buffer(this.clientId + ':' + this.clientSecret).toString('base64'))
    let headers = new Headers({
      'Authorization': encoded
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, body , options)
      .toPromise()
      .then(res => {
        console.log(res);
      })
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
}
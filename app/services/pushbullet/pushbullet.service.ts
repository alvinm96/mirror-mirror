import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { config } from './../../config';

@Injectable()
export class PushbulletService {

  constructor(private http: Http) { }

  getPushes() {
    let url = 'https://api.pushbullet.com/v2/pushes?limit=1';
    let headers = new Headers({'Access-Token': config.pushbullet.key});
    let options = new RequestOptions({headers: headers});
    
    return this.http.get(url, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  sendToDevice(message: any) {
    let url = 'https://api.pushbullet.com/v2/pushes';
    let headers = new Headers({
      'Access-Token': config.pushbullet.key,
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
      .toPromise()
      .then(() => {
        console.log('Message sent');
      })
      .catch((err) => {
        console.log('Failed to send');
      });
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
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { config } from './../../config.ts';
@Injectable()
export class TodoistService {
  private url: string = 'https://todoist.com/API/v7/sync';
  private token: string = config.todoist.key;

  constructor(private http: Http) { }
 
  getTodoist() {
    let body = 'token='+ this.token +'&sync_token=*&resource_types=["items"]';  
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addTodo(content: string) {
    let command = [{
      'type': 'item_add',
      'temp_id': 'e2d56278-6308-11e6-8b77-86f30ca893d3',
      'uuid': '7eec80ed-e205-4d81-9715-39b89fc191d6',
      'args': {
        'content': content,
      }
    }];
    let body = 'token='+ this.token + '&commands=' + command;
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = new RequestOptions({headers: headers});
    
    return this.http.post(this.url, body, options);   
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
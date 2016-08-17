/**
 * Created by alvinm on 7/26/16.
 */
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { config } from './../../config.ts'

@Injectable()
export class MapsService {
  private key: string = config.google.key;
  private directionsUrl: string = 'https://maps.googleapis.com/maps/api/directions/json?';

  constructor(private http: Http) { }

  getDirections(origin:any, destination:any) {
    let url = this.directionsUrl +
      'origin=' + origin +
      '&destination=' + destination +
      '&key=' + this.key;

    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
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
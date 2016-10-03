/**
 * Created by alvinm on 7/22/16.
 */
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../../config';

@Injectable()
export class ForecastService {
  private baseUrl: string = 'https://api.darksky.net/forecast/' + config.darksky.key + '/';

  constructor(private http: Http) { }

  getForecast(lat: number, lng: number, time?: string): Observable<any> {
    let url = this.baseUrl + lat + ',' + lng;

    if (time) {
      url += ',' + time + 'T01:00:00';
    }

    return this.http.get(url)
      .map(this.extractData)
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
/**
 * Created by alvinm on 7/22/16.
 */
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { config } from './../../config';

@Injectable()
export class ForecastService {
  private baseUrl: string = 'https://api.forecast.io/forecast/' + config.forecastio.key + '/';

  constructor(private http: Http) { }

  getForecast(lat: number, lng: number, time?: string) {
    let url = this.baseUrl + lat + ',' + lng;

    if (time) {
      url += ',' + time + 'T01:00:00';
    }

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
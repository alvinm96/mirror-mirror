/**
 * Created by alvinm on 7/22/16.
 */
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { config } from './../../config.ts';

@Injectable()
export class WeatherService {
  private baseUrl: string = 'http://api.wunderground.com/api/' + config.weather.key + '/';

  constructor(private http: Http) { }

  getCurrentWeather() {
    let url = this.baseUrl + 'conditions/q/' + config.user.location.state + '/' + config.user.location.city + '.json';
    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getTenDayForecast() {
    let url = this.baseUrl + 'forecast10day/q/' + config.user.location.state + '/' + config.user.location.city + '.json';

    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getHourlyForecast() {
    let url = this.baseUrl + 'hourly/q/' + config.user.location.state + '/' + config.user.location.city + '.json';
    
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
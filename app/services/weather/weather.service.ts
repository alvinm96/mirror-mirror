/**
 * Created by alvinm on 7/22/16.
 */
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {
  private location = {
    state: 'WA',
    city: 'Bellevue'
  };

  private currentWeatherUrl = 'http://api.wunderground.com/api/e7bd2c3d8009a801/conditions/q/' + this.location.state + '/' + this.location.city + '.json';
  private tenDayForecastUrl = 'http://api.wunderground.com/api/e7bd2c3d8009a801/forecast10day/q/' + this.location.state + '/' + this.location.city + '.json';
  private hourlyForecastUrl = 'http://api.wunderground.com/api/e7bd2c3d8009a801/hourly/q/' + this.location.state + '/' + this.location.city + '.json';

  constructor(private http: Http) { }

  getCurrentWeather() {
    return this.http.get(this.currentWeatherUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getTenDayForecast() {
    return this.http.get(this.tenDayForecastUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getHourlyForecast() {
    return this.http.get(this.hourlyForecastUrl)
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
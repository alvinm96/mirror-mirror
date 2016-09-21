/**
 * Created by alvinm on 7/26/16.
 */
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { config } from './../../config'

@Injectable()
export class MapsService {
  private key: string = config.google.key;
  private base: string = 'https://maps.googleapis.com/maps/api/';

  constructor(private http: Http) { }

  getDirections(origin: any, destination: any) {
    let url = this.base + 'directions/json';

    let params = new URLSearchParams();
    params.set('origin', origin);
    params.set('destination', destination);
    params.set('key', this.key);
    let options = new RequestOptions({search: params});

    return this.http.get(url, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getPlaces(destination: string) {
    let url = this.base + 'place/textsearch/json';
    let params = new URLSearchParams();
    params.set('query', encodeURIComponent(destination));
    params.set('location', (config.user.location.lat + ',' + config.user.location.lng));
    params.set('key', this.key);
    params.set('radius', '10');
    let options = new RequestOptions({search: params});    
    
    return this.http.post(url, null, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getLatLng(location: string) {
    let url = this.base + 'geocode/json';
    let params = new URLSearchParams();
    params.set('address', location);
    params.set('key', this.key);
    let options = new RequestOptions({search: params});    
    
    return this.http.get(url, options)
      .toPromise()
      .then((res: Response) => {
        return res.json().results[0];
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
/**
 * Created by alvinm on 7/26/16.
 */
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { config } from './../../config'

@Injectable()
export class MapsService {
  private key: string = config.google.key;
  private base: string = 'https://maps.googleapis.com/maps/api/';

  constructor(private http: Http) { }

  getDirections(origin: any, destination: any): Observable<any> {
    let url = this.base + 'directions/json';

    let params = new URLSearchParams();
    params.set('origin', origin);
    params.set('destination', destination);
    params.set('key', this.key);
    let options = new RequestOptions({search: params});

    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPlaces(origin: string, destination: string): Observable<any> {
    let url = this.base + 'place/textsearch/json';
    let params = new URLSearchParams();
    params.set('query', encodeURIComponent(destination));
    params.set('location', origin);
    params.set('key', this.key);
    params.set('radius', '10');
    let options = new RequestOptions({search: params});    
    
    return this.http.post(url, null, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMap(routes: any[]): Observable<any> {
    let url = this.base + 'staticmap';
    let params = new URLSearchParams();
    params.set('size', Math.floor(window.innerHeight/2) + 'x' + Math.floor(window.innerWidth/2)); 
    params.set('key', this.key);
    params.set('path', 'color:blue|weight:4|enc:' + routes);
    let options = new RequestOptions({search: params});
    return this.http.get(url, options)
      .map((res) => {
        return res.url;
      });
  }

  getLatLng(location: string): Observable<any> {
    let url = this.base + 'geocode/json';
    let params = new URLSearchParams();
    params.set('address', location);
    params.set('key', this.key);
    let options = new RequestOptions({search: params});    
    
    return this.http.get(url, options)
      .map((res: Response) => {
        return res.json().results[0];
      })
      .catch(this.handleError);
  }

  geolocation(): Observable<any> {
    let url = 'https://www.googleapis.com/geolocation/v1/geolocate';
    let params = new URLSearchParams();
    params.set('key', config.google.key);
    let options = new RequestOptions({search: params});

    return this.http.post(url, null, options)
      .map((res: Response) => {
        return res.json().location;
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
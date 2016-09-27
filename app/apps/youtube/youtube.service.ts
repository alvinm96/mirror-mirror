import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { config } from './../../config';

@Injectable()
export class YoutubeService {
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3/';
  private key: string = config.google.key;

  constructor(private http: Http) { }

  searchVideos(query: string): Observable<any> {
    let url = this.baseUrl + 'search';
    let params: URLSearchParams = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('q', query.split(' ').join('+'));
    params.set('key', this.key);
    let options = new RequestOptions({search: params});

    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
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
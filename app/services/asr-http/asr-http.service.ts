import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { config } from './../../config.ts';

@Injectable()
export class AsrHttpService {
  url: string = 'https://api.voicebox.com/speech-recognition/v1/recognize';

  constructor(private http: Http) { }

  sendAudio(formData: FormData) {
    let val = 'Basic ' + config.voicebox.key;
    let headers = new Headers({
      'Authorization': val
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url, JSON.stringify , options);
  }
}
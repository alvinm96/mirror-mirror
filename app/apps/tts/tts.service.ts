import { Injectable } from '@angular/core';
import { config } from './../../config';

@Injectable()
export class TtsService {
  private key: string = config.voicebox.key;
  private voice: string = config.voicebox.ttsVoice;

  constructor() { }

  synthesizeSpeech(text: string) {
    let url = 'https://api.voicebox.com/speech-synthesis/v1/synthesize';
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var audio = new Audio();
        var blobUrl = URL.createObjectURL(xhttp.response);
        audio.src = blobUrl;
        audio.play();
      }
    };
    var synthesizeQuery = url +
      '?text=' + encodeURIComponent(text) + 
      '&voice=' + this.voice;
    xhttp.open('GET', synthesizeQuery, true);
    xhttp.setRequestHeader('Authorization', 'Basic ' + this.key);
    xhttp.responseType = 'blob';
    xhttp.send();  
  }
}
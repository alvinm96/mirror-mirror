import { Component, OnInit } from '@angular/core';

import { TtsService } from './tts.service.ts';

@Component({
  selector: 'tts',
  template: '',
  providers: [ TtsService ]
})
export class TtsComponent implements OnInit {
  voices: Object[] = [];

  constructor(private tts: TtsService) { }

  ngOnInit() {
    this.getVoices();
  }

  private getVoices() {
    this.tts.getVoices()
      .then((res) => {
        console.log(res);
        this.voices = res;
      });
  }
}
import { Injectable } from '@angular/core';

import { config } from './../../config'

@Injectable()
export class TtsService {
  private key: string = config.voicebox.key;
  private voice: string = config.voicebox.ttsVoice;
  voices: Object[] = [];
  synthesize: any;
  window;
  options: Object;

  constructor() { 
    this.window = window;
    this.options = {
      voice: this.voice,
      key: this.key
    };
  }

  synthesizeSpeech(text: string) {
    this.synthesize = this.window.tts(this.options, text);
  }
}
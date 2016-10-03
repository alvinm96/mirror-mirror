/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { inject, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TtsService } from './tts.service';
import { config } from './../../config';

describe('TtsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TtsService ]
    });
  });

  it('should have voice from config file', inject([TtsService], (service) => {
    expect(service.options.voice).toEqual(config.voicebox.ttsVoice);
    expect(service.voice).toEqual(config.voicebox.ttsVoice);
  }));
});
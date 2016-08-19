/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, OnInit } from '@angular/core';

import { TtsService } from './services/tts/tts.service.ts';

import { NluResponse } from './services/nlu/nlu.ts';
import { config } from './config.ts';
let PythonShell = require('python-shell');

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styles: ['#testBtn{border-style: none; background-color: black; color: black;}'],
})

export class DashboardComponent implements OnInit {
  window: any;
  audio: HTMLAudioElement; 
  destination: string;
  app: string;
  nluResponse: NluResponse;
  options = {
    pythonOptions: ['-u'],
    args: ['./app/mirror-mirror.pmdl']
  };

  constructor(private tts: TtsService) { }

  ngOnInit() {
    var shell = new PythonShell('./app/snowboy/examples/Python/demo.py', this.options);
    shell.on('message', (message) => {
      console.log(message);
      if (message === 'keyword detected') {
        this.app = 'asr';
      }
    });        
  }

  getNLUResponse(response) {
    this.nluResponse = response;
    this.app = this.nluResponse.result.parameters.app;
    this.destination = this.nluResponse.result.parameters.address ||
                       this.nluResponse.result.parameters.location;
  }
}
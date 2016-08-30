/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, AfterContentInit } from '@angular/core';

import { TtsService } from './services/tts/tts.service';
import { TodoistService } from './services/todoist/todoist.service';

import { NluResponse } from './services/nlu/nlu';
import { config } from './config';
let PythonShell = require('python-shell');

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements AfterContentInit {
  window: any;
  audio: HTMLAudioElement; 
  destination: string;
  app: string;
  nluResponse: NluResponse;
  musicPlaying: boolean = false;
  options = {
    pythonOptions: ['-u'],
    args: ['./app/hello-mirror.pmdl']
  };

  constructor(private tts: TtsService, private todoist: TodoistService) { }

  ngAfterContentInit() {
    var shell = new PythonShell('./app/snowboy/examples/Python/demo.py', this.options);
    shell.on('message', (message) => {
      if (message === 'keyword detected') {
        this.app = 'asr';
      }
    });        
  }

  getNLUResponse(response) {
    this.nluResponse = response;
    console.log(response);
    this.app = this.nluResponse.result.parameters.app;
    if (this.app === 'music') {
      this.musicPlaying = true;
    }
    if (this.app === 'todo') {
      let query: string = this.nluResponse.result.resolvedQuery();
      this.addTodo(query.substr(3,query.length-1));
    }
    this.destination = this.nluResponse.result.parameters.location ||
                       this.nluResponse.result.parameters.address ||
                       this.nluResponse.result.parameters['geo-city'];
  }

  addTodo(todo: string) {
    this.todoist.addTodo(todo);
  }
}
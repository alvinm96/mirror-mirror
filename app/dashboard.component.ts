/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, AfterContentInit } from '@angular/core';
import { TtsService } from './services/tts/tts.service';
import { TodoistService } from './services/todoist/todoist.service';
import { NluResponse } from './services/nlu/nlu';
import { config } from './config';
const PythonShell = require('python-shell');

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
  showSpotify: boolean = false;
  video: string;
  song: string;
  location: string;
  date: string;

  constructor(private tts: TtsService, private todoist: TodoistService) { }

  ngAfterContentInit() {

  }

  getNLUResponse(response: NluResponse) {
    this.nluResponse = response;
    console.log(response);
    this.app = this.nluResponse.result.parameters.app;

    if (this.nluResponse.result.action === 'input.unknown') {
      this.tts.synthesizeSpeech('I didn\'t get that. Can you try again?');
      this.app = '';
    }
    
    switch(this.app) {
      case 'weather':    this.getWeather();
                         break;
      case 'todo':       this.addTodo;
                         break;
      case 'spotify':    this.getSpotify();
                         break;
      case 'directions': this.getDirections();
                         break;        
      case 'video':      this.getVideo();
                         break;
      case 'close':      this.app = '';
                         break; 
    }
  }

  getVideo() {
    try {
      this.video = this.nluResponse.result.parameters.query;
    } catch (err) {
      this.tts.synthesizeSpeech('I could not find that video');
    }    
  }

  getDirections() {
    this.destination = this.nluResponse.result.parameters.location ||
                       this.nluResponse.result.parameters.address ||
                       this.nluResponse.result.parameters['geo-city'];    
  }

  getSpotify() {
    this.showSpotify = true;
    this.song = this.nluResponse.result.parameters.song;
    if (this.nluResponse.result.parameters.artist) {
      this.song += ' artist:' + this.nluResponse.result.parameters.artist;
    }
  }

  getWeather() {
    this.location = this.nluResponse.result.parameters.location;
    this.date = this.nluResponse.result.parameters.date;    
  }

  addTodo(todo: string) {
    this.todoist.addTodo(this.nluResponse.result.parameters.query);
    this.tts.synthesizeSpeech('Adding' + this.nluResponse.result.parameters.query);    
  }
}
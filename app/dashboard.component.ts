/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, AfterContentInit, ViewChild } from '@angular/core';
import { SpotifyComponent } from './apps/spotify/spotify.component';
import { TtsService } from './apps/tts/tts.service';
import { TodoistService } from './apps/todoist/todoist.service';
import { PushbulletService } from './apps/pushbullet/pushbullet.service';
import { NluResponse } from './apps/nlu/nlu';
import { config } from './config';
const PythonShell = require('python-shell');

@Component({
  selector: 'dashboard',
  template: require('./dashboard.component.html')
})

export class DashboardComponent {
  @ViewChild(SpotifyComponent) private spotify: SpotifyComponent;
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
  sendUrl: string;
  sendObj: Object;
  test;
  constructor(private tts: TtsService, private todoist: TodoistService, private push: PushbulletService) { }

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
      case 'spotify':    this.playSpotify();
                         break;
      case 'directions': this.getDirections();
                         break;        
      case 'video':      this.getVideo();
                         break;
      case 'close':      this.app = '';
                         break;
      case 'send':       this.send();
                         break; 
    }
  }

  send() {
    if (this.sendObj) {
      console.log(this.sendObj);
      this.push.sendToDevice(this.sendObj);
    } else {
      console.log('Nothing to send');
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
                  
    this.sendObj = {
      type: 'link',
      title: 'Maps',
      body: 'Open in Google Maps',
      url: this.sendUrl
    };
  }

  playSpotify() {
    this.showSpotify = true;

    let song = this.nluResponse.result.parameters.song
    if (this.nluResponse.result.parameters.artist) {
      song += ' artist:' + this.nluResponse.result.parameters.artist;
    }

    if (this.nluResponse.result.parameters.action === 'play') {
      this.spotify.playSong(this.test);
    } else if (this.nluResponse.result.parameters.action === 'pause') {
      this.spotify.pauseSong();
    } else if (this.nluResponse.result.parameters.action === 'hide') {
      this.spotify.pauseSong();
      this.showSpotify = false;
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
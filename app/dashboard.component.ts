/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { HourForecastComponent } from './services/weather/hour-forecast.component';
import { WeekForecastComponent } from './services/weather/week-forecast.component';
import { MapsComponent } from './services/maps/maps.component';
import { AsrComponent } from './services/asr/asr.component';
import { CommandsComponent } from './services/help/commands.component.ts';
import { SpotifyComponent } from './services/spotify/spotify.component.ts';

import { AnnyangService } from './annyang.service.ts';
import { TtsService } from './services/tts/tts.service.ts';

import { config } from './config.ts';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styles: ['#testBtn{border-style: none; background-color: black; color: black;}'],
  directives: [
    WeekForecastComponent,
    HourForecastComponent,  
    MapsComponent,
    AsrComponent,
    CommandsComponent,
    SpotifyComponent
  ]
})

export class DashboardComponent implements OnInit {
  utterance: string;
  status: string;
  window: any;
  wakePhrase: string = config.annyang.wakePhrase || 'mirror mirror';
  audio: HTMLAudioElement; 
  destination: string;

  constructor(private annyang: AnnyangService, private tts: TtsService) { }

  ngOnInit() {
    this.audio = new Audio('../tpirding.wav');
    this.annyang.addCommands(this.wakePhrase, () => {
      this.audio.play();
      this.utterance = 'asr';
      this.annyang.pause();
    });

    this.annyang.addCommands('add *tag', this.addTodo);

    this.annyang.addCommands('get the directions to *destination', this.getDirections);

    this.annyang.debug(true);

    if (this.annyang) {
      setTimeout(this.annyang.start(), 1000);
    }       
  }

  addTodo = (tag) => {
    console.log(tag);
  }

  getDirections = (destination) => {
    this.utterance = 'get maps';
    this.destination = destination;
  }

  print = () => {
    console.log(this.utterance);
  }
  
  directionsTest() {
    this.annyang.trigger('get the directions to bothell, washington');
  }

  todoTest() {
    this.annyang.trigger('add todo1');
  }

  triggerKeyword() {
    this.annyang.trigger(this.wakePhrase);
  }
}
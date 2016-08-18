/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, OnInit } from '@angular/core';

import { HourForecastComponent } from './services/weather/hour-forecast.component';
import { WeekForecastComponent } from './services/weather/week-forecast.component';
import { MapsComponent } from './services/maps/maps.component';
import { AsrComponent } from './services/asr/asr.component';
import { CommandsComponent } from './services/help/commands.component.ts';
import { MusicComponent } from './services/music/music.component.ts';

import { AnnyangService } from './annyang.service.ts';
import { TtsService } from './services/tts/tts.service.ts';

import { NluResponse } from './services/nlu/nlu.ts';
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
    MusicComponent
  ]
})

export class DashboardComponent implements OnInit {
  window: any;
  wakePhrase: string = config.annyang.wakePhrase || 'mirror mirror';
  audio: HTMLAudioElement; 
  destination: string;
  app: string;
  nluResponse: NluResponse;

  constructor(private annyang: AnnyangService, private tts: TtsService) { }

  ngOnInit() {
    this.audio = new Audio('../tpirding.wav');
    this.annyang.addCommands(this.wakePhrase, () => {
      this.audio.play();
      this.app = 'asr';
      this.annyang.pause();
    });

    this.annyang.addCommands('add *tag', this.addTodo);

    this.annyang.debug(true);

    if (this.annyang) {
      setTimeout(this.annyang.start(), 1000);
    }       
  }

  addTodo = (tag) => {
    console.log(tag);
  }

  getNLUResponse(response) {
    this.nluResponse = response;
    this.app = this.nluResponse.result.parameters.app;
    this.destination = this.nluResponse.result.parameters.address ||
                       this.nluResponse.result.parameters.location;
  }

  test() {
    console.log(this.nluResponse);
  }

  triggerKeyword() {
    this.annyang.trigger(this.wakePhrase);
  }
}
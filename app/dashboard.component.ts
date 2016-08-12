/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { HourForecastComponent } from './services/weather/hour-forecast.component';
import { WeekForecastComponent } from './services/weather/week-forecast.component';
import { MapsComponent } from './services/maps/maps.component';
import { AsrComponent } from './services/asr/asr.component';
import { CommandsComponent } from './services/help/commands.component.ts';
import { TtsComponent } from './services/tts/tts.component.ts'

import { AnnyangService } from './annyang.service.ts';

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
    TtsComponent
  ],
})

export class DashboardComponent implements OnInit {
  utterance: string;
  status: string;
  window: any;
  wakePhrase = config.annyang.wakePhrase || 'mirror mirror';
  audio; 

  constructor(private annyang: AnnyangService) { }

  ngOnInit() {
    this.audio = new Audio('../tpirding.wav');
    this.annyang.addCommands(this.wakePhrase, () => {
      this.audio.play();
      this.utterance = 'asr';
      this.annyang.pause();
    });
    this.annyang.debug(true);
    
    if (this.annyang && this.annyang.getSpeechRecognizer !== undefined) {
      this.annyang.getSpeechRecognizer();
      alert('annyang ready');
      this.annyang.start();
      this.utterance = '';
    }
  }

  talk() {
    this.annyang.trigger(this.wakePhrase);
  }
}
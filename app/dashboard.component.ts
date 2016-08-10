/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, OnInit } from '@angular/core';

import { HourForecastComponent } from './services/weather/hour-forecast.component';
import { WeekForecastComponent } from './services/weather/week-forecast.component';
import { MapsComponent } from './services/maps/maps.component';
import { AsrComponent } from './services/asr/asr.component';
import { CommandsComponent } from './services/commands.component.ts';

import './js/annyang.min.js';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  directives: [
    WeekForecastComponent,
    HourForecastComponent,  
    MapsComponent,
    AsrComponent,
    CommandsComponent
  ],
})

export class DashboardComponent implements OnInit {
  utterance: string;
  status: string;
  window: any;
  annyang: any;
  commands;

  constructor() { }

  ngOnInit() {
    this.window = window;
    this.annyang = this.window.annyang;
    
    this.commands = {
      'hello': function() { alert('works'); }
    };

    this.annyang.addCommands(this.commands);

    this.annyang.start();

    console.log(this.annyang.isListening());
  }
}
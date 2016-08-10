/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, OnInit } from '@angular/core';

import { HourForecastComponent } from './services/weather/hour-forecast.component';
import { WeekForecastComponent } from './services/weather/week-forecast.component';
import { MapsComponent } from './services/maps/maps.component';
import { AsrComponent } from './services/asr/asr.component';
import { CommandsComponent } from './services/commands.component.ts';

import { AnnyangService } from './annyang.service.ts';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styles: ['#testBtn{border-style: none; background-color: black; color: black;}'],
  directives: [
    WeekForecastComponent,
    HourForecastComponent,  
    MapsComponent,
    AsrComponent,
    CommandsComponent
  ],
  providers: [ AnnyangService ]
})

export class DashboardComponent implements OnInit {
  utterance: string;
  status: string;
  window: any;
  wakePhrase = 'hello';
  isListening: boolean = false;

  constructor(private annyang: AnnyangService) { }

  ngOnInit() {
    this.annyang.addCommands(this.wakePhrase, () => {
      this.isListening = true;
    });
    this.annyang.start();
  }

  talk() {
    this.annyang.trigger(this.wakePhrase);
  }

}
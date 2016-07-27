/**
 * Created by alvinm on 7/25/16.
 */
import { Component } from '@angular/core';

import { AsrComponent } from './services/asr/asr.component';
import { ForecastComponent } from './services/weather/forecast.component';

import { MapsComponent } from './services/maps/maps.component';

@Component({
  selector: 'dashboard',
  template: `    
                <button (click)="selectASR()">View Utterance</button>
                <button (click)="selectHourForecast()">Hourly Forecast</button>
                <asr *ngIf="selectedApp === 'ASR'">Loading...</asr>
                <forecast *ngIf="selectedApp === 'Hourly Forecast'">Loading...</forecast>
                <maps></maps>
            `,
  directives: [
    AsrComponent,
    ForecastComponent,
    MapsComponent
  ]
})

export class DashboardComponent {
  selectedApp: any;

  constructor() {}

  selectASR() {
    this.selectedApp = 'ASR';
    let res = document.getElementById('asrResponse');
    console.log(res);
  }

  selectHourForecast() {
    this.selectedApp = 'Hourly Forecast';
    
  }

}
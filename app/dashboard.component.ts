/**
 * Created by alvinm on 7/25/16.
 */
import { Component } from '@angular/core';

import { AsrComponent } from './services/asr/asr.component';
import { HourForecastComponent } from './services/weather/hour-forecast.component';
import { WeekForecastComponent } from './services/weather/week-forecast.component';
import { MapsComponent } from './services/maps/maps.component';

@Component({
  selector: 'dashboard',
  template: `    
                <button (click)="home()">Home</button>
                <button (click)="selectASR()">Record Command</button>
                <button (click)="selectHourForecast()">Hourly Forecast</button>
                <button (click)="selectDaysForecast()">7 Day Forecast</button>
                <button (click)="selectMap()">View Directions</button>
                
                <asr *ngIf="selectedApp === 'ASR'">Loading...</asr>
                <hour-forecast *ngIf="selectedApp === 'Hourly Forecast'">Loading...</hour-forecast>
                <week-forecast *ngIf="selectedApp === 'Days Forecast'">Loading...</week-forecast>
                <map *ngIf="selectedApp === 'View Directions'">Loading...</map>
                
            `,
  directives: [
    AsrComponent,
    WeekForecastComponent,
    HourForecastComponent,
    MapsComponent
  ]
})

export class DashboardComponent {
  selectedApp: any;

  constructor() {}

  home() {
    this.selectedApp = '';
  }

  selectASR() {
    this.selectedApp = 'ASR';
  }

  selectHourForecast() {
    this.selectedApp = 'Hourly Forecast';
  }

  selectDaysForecast() {
    this.selectedApp = 'Days Forecast';
  }

  selectMap() {
    this.selectedApp = 'View Directions';
  }

}
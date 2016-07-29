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
                <div class="form-group">
                  <label for="command">Utterance: (temporary)</label>
                  <input type="text" class="form-control" [(ngModel)]="selectedApp"/>
                </div>

                <asr *ngIf="selectedApp === 'ASR'">Loading...</asr>
                <hour-forecast *ngIf="selectedApp === 'Hourly Forecast'">Loading...</hour-forecast>
                <week-forecast *ngIf="selectedApp === 'Days Forecast'">Loading...</week-forecast>
                <map *ngIf="selectedApp === 'Maps'">Loading...</map>
                
            `,
  directives: [
    AsrComponent,
    WeekForecastComponent,
    HourForecastComponent,
    MapsComponent
  ]
})

export class DashboardComponent {
  selectedApp: string;

  constructor() {}
}
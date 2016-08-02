/**
 * Created by alvinm on 7/25/16.
 */
import { Component, Input, ViewChild } from '@angular/core';

import { HourForecastComponent } from './services/weather/hour-forecast.component';
import { WeekForecastComponent } from './services/weather/week-forecast.component';
import { MapsComponent } from './services/maps/maps.component';
import { AsrNewComponent } from './services/asr/asr-new.component';

@Component({
  selector: 'dashboard',
  template: `                 
                <div>
                  <asr-new (status)="status = $event" (utterance)="utterance = $event">Loading...</asr-new>
                </div>
                <p id="result" *ngIf="status==='finalResult'">Stopped Recording</p>
                <div [ngSwitch]="utterance"> 
                  <hour-forecast *ngSwitchCase="'get the forecast for today'">Loading...</hour-forecast>
                  <week-forecast *ngSwitchCase="'get the forecast for the week'">Loading...</week-forecast>
                  <map *ngSwitchCase="'get maps'">Loading...</map>
                </div>
            `,
  styles: ['#result{color:red;}'],
  directives: [
    WeekForecastComponent,
    HourForecastComponent,
    MapsComponent,
    AsrNewComponent
  ]
})

export class DashboardComponent {
  @Input() selectedApp: string;
  utterance: string;
  status: string;

  constructor() {
  }
}
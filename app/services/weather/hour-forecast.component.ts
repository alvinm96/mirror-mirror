/**
 * Created by alvinm on 7/27/16.
 */
import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service';
import { Period } from './period';

@Component({
  selector: 'hour-forecast',
  template: `
            <div class="app">
              <table class="forecast">
                  <tr> <h2>{{month}} {{day}}</h2> </tr>
                  <tr>
                      <th *ngFor="let hour of periods" id="time">{{hour.time}}</th>
                  </tr>
                  <tr>
                      <th *ngFor="let hour of periods">
                          <i [class]="getIcon(hour.condition)"></i> 
                          <span id="temp">{{hour.temperature}}</span>
                          <i class="wi wi-fahrenheit"></i>
                      </th>
                  </tr>
              </table>
            </div>
            `,
  styleUrls: ['./services/weather/forecast.css'],
  providers: [ WeatherService ]
})

export class HourForecastComponent implements OnInit {
  periods: Period[] = [];
  month: string;
  day: number;
  
  constructor(private weatherService: WeatherService) { }

  getHourlyForecast(num: number) {
    this.weatherService.getHourlyForecast()
      .then((res) => {
        for(let i = 0; i < num; i++) {
          this.month = res.hourly_forecast[0].FCTTIME.month_name;
          this.day = res.hourly_forecast[0].FCTTIME.mday;

          let time = res.hourly_forecast[i].FCTTIME.civil;
          let condition = res.hourly_forecast[i].icon;
          let temperature = res.hourly_forecast[i].temp.english;

          this.periods[this.periods.length++] = new Period(condition, temperature, time);

          let today = new Date();

          if (res.hourly_forecast[0].FCTTIME.mon == today.getMonth()+1 && this.day == today.getDate()) {
            this.month = 'Today';
            this.day = null;
          }
        }
      });
  }
  
  ngOnInit() {
    this.getHourlyForecast(10);
  }

  getIcon(condition) {
    return 'wi wi-wu-' + condition;
  }
}
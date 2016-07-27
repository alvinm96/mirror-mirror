/**
 * Created by alvinm on 7/27/16.
 */
import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service';
import { Period } from './period';

@Component({
  selector: 'forecast',
  template: `
            <div class="app">
              <table class="forecast">
                  <tr> <h2>{{month}} {{day}}</h2> </tr>
                  <tr>
                      <th *ngFor="let hour of hourPeriods" id="time">{{hour.time}}</th>
                  </tr>
                  <tr>
                      <th *ngFor="let hour of hourPeriods">
                          <i [class]="getIcon(hour.condition)"></i> 
                          <span id="temp">{{hour.temperature}}</span>
                          <i class="wi wi-fahrenheit"></i>
                      </th>
                  </tr>
              </table>
              <table class="forecast">
                  <tr>
                      <th *ngFor="let day of dayPeriods" id="time">{{day.time}}</th>
                  </tr>
                  <tr>
                      <th *ngFor="let day of dayPeriods">
                          <i [class]="getIcon(day.condition)"></i> 
                          <span id="temp">{{day.temperature}}</span>
                          <i class="wi wi-fahrenheit"></i>
                      </th>
                  </tr>
              </table>
            </div>
            `,
  styles: [`
            #time {
                font-size: 20px;
            } 
            .forecast { 
                float: center;
                width: 100%;
            } 
            th,td { 
                padding-left:15px;
                padding-right:15px;
            }
            #temp {
                font-size: 30px;
            }
            `],
  providers: [ WeatherService ]
})

export class ForecastComponent implements OnInit {
  hourPeriods: Period[] = [];
  dayPeriods: Period[] = [];
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

          this.hourPeriods[this.hourPeriods.length++] = new Period(condition, temperature, time);

          let today = new Date();

          if (res.hourly_forecast[0].FCTTIME.mon == today.getMonth()+1 && this.day == today.getDate()) {
            this.month = 'Today';
            this.day = null;
          }
        }
      });
  }

  getWeeklyForecast(num: number) {
    this.weatherService.getTenDayForecast()
      .then((res) => {
        for(let i = 1; i <= num; i++) {
          let month = res.forecast.simpleforecast.forecastday[i].date.monthname;
          let day = res.forecast.simpleforecast.forecastday[i].date.day;
          let condition = res.forecast.simpleforecast.forecastday[i].icon;
          let temperature = res.forecast.simpleforecast.forecastday[i].high.fahrenheit;

          this.dayPeriods[this.dayPeriods.length++] = new Period(condition, temperature, (month + ' ' + day));
        }
      });
  }

  ngOnInit() {
    this.getHourlyForecast(10);
    this.getWeeklyForecast(6);
  }

  getIcon(condition) {
    return 'wi wi-wu-' + condition;
  }
}
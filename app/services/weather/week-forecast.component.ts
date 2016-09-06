/**
 * Created by alvinm on 7/27/16.
 */
import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service';
import { Period } from './period';

@Component({
  selector: 'week-forecast',
  templateUrl: './services/weather/week-forecast.component.html',
  providers: [ WeatherService ]
})

export class WeekForecastComponent implements OnInit {
  periods: Period[] = [];
  month: string;
  day: number;  
  state: string = 'hide';

  constructor(private weatherService: WeatherService) { }

  getWeeklyForecast(num: number) {
    this.weatherService.getTenDayForecast()
      .then((res) => {
        for(let i = 1; i <= num; i++) {
          let month = res.forecast.simpleforecast.forecastday[i].date.monthname;
          let day = res.forecast.simpleforecast.forecastday[i].date.day;
          let condition = res.forecast.simpleforecast.forecastday[i].icon;
          let temperature = {
            high: res.forecast.simpleforecast.forecastday[i].high.fahrenheit,
            low: res.forecast.simpleforecast.forecastday[i].low.fahrenheit,
          }
          this.periods[this.periods.length++] = new Period(condition, temperature, (month + ' ' + day));
        }
      });
  }

  ngOnInit() {
    this.getWeeklyForecast(7);
  }

  getIcon(condition) {
    return 'wi wi-wu-' + condition;
  }
}
/**
 * Created by alvinm on 7/22/16.
 */
import { Component, OnInit } from '@angular/core';
import { ForecastService } from './forecast.service';
import { config } from './../../config';

@Component({
  selector: 'weather',
  template: require('./weather.component.html'),
  styleUrls: ['./apps/weather/weather.component.css'],
  providers: [ ForecastService ]
})

export class WeatherComponent implements OnInit {
  icon: string;
  temperature: number;

  constructor(private forecast: ForecastService) { }

  ngOnInit() {
    this.forecast.getForecast(config.user.location.lat, config.user.location.lng)
      .then((res) => {
        this.icon = 'wi wi-forecast-io-' + res.currently.icon;
        this.temperature = res.currently.temperature;
      });
  }
}
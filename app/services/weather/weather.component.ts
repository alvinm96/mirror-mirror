/**
 * Created by alvinm on 7/22/16.
 */
import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service';
import { Period } from './period';

@Component({
  selector: 'weather',
  templateUrl: './services/weather/weather.component.html',
  providers: [ WeatherService ]
})

export class WeatherComponent implements OnInit {
  current: Period = new Period('', '');

  constructor(private weatherService: WeatherService) { }

  getCurrentObservations(res) {
    this.current = new Period(res.current_observation.icon, res.current_observation.feelslike_f);
  }

  ngOnInit() {
    this.weatherService.getCurrentWeather()
      .then((res) => {
        this.getCurrentObservations(res);
      });
  }

  getIcon(condition) {
    return 'wi wi-wu-' + condition;
  }
}
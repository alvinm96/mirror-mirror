/**
 * Created by alvinm on 7/22/16.
 */
import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service';
@Component({
  selector: 'weather',
  template: `
             <i [class]="getIcon()"></i>
             <span id="temp">{{temperature}}</span>
             <i class="wi wi-fahrenheit"></i>
            `,
  providers: [ WeatherService ]
})

export class WeatherComponent implements OnInit {
  weatherToday: any;
  conditions: any;
  temperature: any;
  icon: any;

  constructor(private weatherService: WeatherService) { }

  getConditions(res) {
    this.conditions = res.current_observation.icon;
    this.temperature = res.current_observation.feelslike_f;
  }

  ngOnInit() {
    this.weatherToday = this.weatherService.getWeatherToday()
      .then(res => {
        this.getConditions(res);
      })
  }

  getIcon() {
    return 'wi wi-wu-' + this.conditions;
  }

}
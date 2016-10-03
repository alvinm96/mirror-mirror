/**
 * Created by alvinm on 7/22/16.
 */
import { Component, OnInit } from '@angular/core';
import { ForecastService } from './forecast.service';
import { MapsService } from './../maps/maps.service';
import { config } from './../../config';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [ ForecastService ]
})

export class WeatherComponent implements OnInit {
  icon: string;
  temperature: number;

  constructor(private forecast: ForecastService, private maps: MapsService) { }

  ngOnInit() {
    this.maps.geolocation().subscribe((location) => {
      this.forecast.getForecast(location.lat, location.lng)
        .subscribe((res) => {
          this.icon = 'wi wi-forecast-io-' + res.currently.icon;
          this.temperature = res.currently.temperature;
        }, (error) => {
          console.log('There was an error');
        });
    });
  }
}
/**
 * Created by alvinm on 7/22/16.
 */
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { ForecastService } from './forecast.service';
import { TtsService } from '../tts/tts.service';
import { MapsService } from './../maps/maps.service';
import { config } from './../../config';

@Component({
  selector: 'forecast',
  templateUrl: './services/weather/forecast.component.html',
  styleUrls: ['./services/weather/forecast.component.css'],
  providers: [ ForecastService ]
})

export class ForecastComponent implements OnInit {
  @Input() location: string;
  @Input() date: string;
  currentData: any;
  hourlyData: any;
  weeklyData: Array<any>;
  private datasets = [
    {
      label: "Temperature",
      data: [ ],
      pointRadius: 0,
    }
  ];
  private labels = [ ];
  private colors = [
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)'
    }
  ]

  constructor(private forecast: ForecastService, private tts: TtsService, private maps: MapsService) { }

  ngOnInit() {
    this.getForecast();
  }

  getForecast() {
    this.maps.getLatLng(this.location)
      .then((latLng) => {
        if (this.date) {
          this.forecast.getForecast(latLng.lat, latLng.lng, this.date)
            .then((res) => {
              this.currentData = res.currently;

              let times = _.map(res.hourly.data, (hour: any, index: number) => {
                if (index < 24) {
                  this.datasets[0].data.push(hour.temperature);

                  if (index % 3 === 1) {
                    let time = new Date(hour.time * 1000);
                    let hours = time.getHours();
                    let ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours: 12;                    
                    this.labels.push(hours + ampm);
                  } else {
                    this.labels.push(' ');
                  }
                }
              });
            
            });          
        } else {
          this.forecast.getForecast(latLng.lat, latLng.lng)
            .then((res) => {
              this.currentData = res.currently;
              let weekly = res.daily;
              this.weeklyData = weekly.data;

              let times = _.map(res.hourly.data, (hour: any, index: number) => {
                if (index < 24) {
                  this.datasets[0].data.push(hour.temperature);

                  if (index % 3 === 1) {
                    let time = new Date(hour.time * 1000);
                    let hours = time.getHours();
                    let ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours: 12;                    
                    this.labels.push(hours + ampm);
                  } else {
                    this.labels.push(' ');
                  }
                }
              });
            
            });
        }
      });
  }
  getTomomorrow() {
    let today = new Date();
    let year = today.getFullYear();
    let month: any = today.getMonth();
    let day: any = today.getDay();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return year + '-' + month + '-' + day;
  
  }


  convertTime(val: number) {
    return new Date(val*1000);
  }
}
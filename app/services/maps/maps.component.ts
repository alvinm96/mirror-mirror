/**
 * Created by alvinm on 7/27/16.
 */
import { Component, Input, OnInit } from '@angular/core';

import { MapsService } from './maps.service';
import { TtsService } from './../tts/tts.service.ts';
import { config } from './../../config.ts';

@Component({
  selector: 'map',
  templateUrl: './services/maps/maps.component.html',
  providers: [ MapsService ]
})

export class MapsComponent implements OnInit {
  origin = config.weather.location.city;
  @Input() destination;
  response = {
    dist: null,
    dur: null
  }
  lat: number;
  lng: number;
  zoom: number = 15;
  map;

  constructor(private mapsService: MapsService, private tts: TtsService) { 
  }

  ngOnInit() {
    this.getMap(this.destination);
    this.getDirections(this.destination);
  }

  getMap(destination: string) {
    this.map = 'http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=' + encodeURIComponent(this.origin) +
      '&wp.1=' + encodeURIComponent(destination) +
      '&key=' + config.bing.key + 
      '&mapSize=' + window.innerWidth/2 + ',' + window.innerHeight/2;    
  }

  getDirections(destination) {
    this.mapsService.getDirections(this.origin, destination)
      .then((res) => {
        this.response.dist = res.routes[0].legs[0].distance.text;
        this.response.dur = res.routes[0].legs[0].duration.text;
        this.lat = res.routes[0].legs[0].start_location.lat;
        this.lng = res.routes[0].legs[0].start_location.lng;
        
        this.tts.synthesizeSpeech('it is ' + 
          this.response.dist + ' to ' + destination +
           ' it will take ' + this.response.dur);
      })
      .catch((err) => {
        alert('Location not found');
      });
  }
}
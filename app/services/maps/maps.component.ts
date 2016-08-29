/**
 * Created by alvinm on 7/27/16.
 */
import { Component, Input, OnInit } from '@angular/core';

import { PushbulletService } from './../pushbullet/pushbullet.service.ts';
import { MapsService } from './maps.service';
import { TtsService } from './../tts/tts.service.ts';
import { config } from './../../config.ts';

@Component({
  selector: 'map',
  templateUrl: './services/maps/maps.component.html',
  providers: [ MapsService ]
})

export class MapsComponent implements OnInit {
  origin = config.user.location.city;
  @Input() destination: string;
  response = {
    dist: null,
    dur: null
  }
  lat: number;
  lng: number;
  zoom: number = 15;
  map;

  constructor(private mapsService: MapsService, private tts: TtsService, private push: PushbulletService) { }

  ngOnInit() {
    if (this.destination) {
      this.getDirections(this.destination);
    } else {
      this.tts.synthesizeSpeech('Destination was not found');
    }
  }

  getMap(destination: string) {
    this.map = 'http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=' + encodeURIComponent(this.origin) +
      '&wp.1=' + encodeURIComponent(destination) +
      '&key=' + config.bing.key + 
      '&mapSize=' + window.innerWidth/2 + ',' + window.innerHeight/2;    
  }

  getDirections(destination) {
    let formattedAddress;
    this.mapsService.getPlaces(destination)
      .then((res) => {
        formattedAddress = res.results[0].formatted_address;
      });
  
    if (formattedAddress) {
      this.mapsService.getDirections(this.origin, formattedAddress)
        .then((res) => {
          this.response.dist = res.routes[0].legs[0].distance.text;
          this.response.dur = res.routes[0].legs[0].duration.text;
          this.lat = res.routes[0].legs[0].start_location.lat;
          this.lng = res.routes[0].legs[0].start_location.lng;
          
          this.getMap(formattedAddress);

          this.tts.synthesizeSpeech('it is ' + 
            this.response.dist + ' to your destination, it will take ' + this.response.dur);

          let obj = {
            type: 'link',
            title: 'Maps',
            body: 'Open in Google Maps',
            url: 'https://www.google.com/maps/place/' + this.origin + '/' + formattedAddress
          }   
          // this.push.sendToDevice(obj);   
        });
    }
  }
}
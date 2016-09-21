/**
 * Created by alvinm on 7/27/16.
 */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PushbulletService } from './../pushbullet/pushbullet.service';
import { MapsService } from './maps.service';
import { TtsService } from './../tts/tts.service';
import { config } from './../../config';

@Component({
  selector: 'map',
  templateUrl: './apps/maps/maps.component.html',
})

export class MapsComponent implements OnInit {
  @Input() destination: string;
  origin: string = config.user.location.address;
  response = {
    dist: null,
    dur: null
  }
  lat: number;
  lng: number;
  map: any;
  @Output() responseUrl = new EventEmitter<string>();

  constructor(private mapsService: MapsService, private tts: TtsService, private push: PushbulletService) { }

  ngOnInit() {
    if (this.destination) {
      this.getDirections(this.destination);
    }
  }

  getMap(destination: string) {
    this.map = 'http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=' + encodeURIComponent(this.origin) +
      '&wp.1=' + encodeURIComponent(destination) +
      '&key=' + config.bing.key + 
      '&mapSize=' + window.innerWidth/2 + ',' + window.innerHeight/2;    
  }

  getDirections(destination: string) {
    let formattedAddress: string;
    this.mapsService.getPlaces(destination)
      .then((res) => {
        formattedAddress = res.results[0].formatted_address;
        this.mapsService.getDirections(this.origin, formattedAddress)
          .then((res) => {
            this.response.dist = res.routes[0].legs[0].distance.text;
            this.response.dur = res.routes[0].legs[0].duration.text;
            this.lat = res.routes[0].legs[0].start_location.lat;
            this.lng = res.routes[0].legs[0].start_location.lng;
          
            this.tts.synthesizeSpeech('it is ' + this.response.dist + ' to your destination, it will take ' + this.response.dur);

            this.getMap(formattedAddress);
            this.responseUrl.emit('https://www.google.com/maps/dir/' + this.origin + '/' + formattedAddress.split(' ').join('+'));
        });        
    })
    .catch((err) => {
      this.tts.synthesizeSpeech('destination was not found');
    });
  }
}
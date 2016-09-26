import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PushbulletService } from './../pushbullet/pushbullet.service';
import { MapsService } from './maps.service';
import { TtsService } from './../tts/tts.service';
import { config } from './../../config';

@Component({
  selector: 'map',
  template: require('./maps.component.html'),
})

export class MapsComponent implements OnInit {
  @Input() destination: string;
  @Output() responseUrl = new EventEmitter<any>();  
  origin: string;
  response = {
    dist: null,
    dur: null
  }
  // lat: number;
  // lng: number;
  map: any;

  constructor(private mapsService: MapsService, private tts: TtsService, private push: PushbulletService) { }

  ngOnInit() {
    if (this.destination) {
      this.getDirections(this.destination);
    }

    this.mapsService.geolocation().subscribe((val) => {
      this.origin = val.location.lat + ',' + val.location.lng; 
    });
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
      .subscribe((res) => {
        formattedAddress = res.results[0].formatted_address;
        this.mapsService.getDirections(this.origin, formattedAddress)
          .subscribe((dir) => {
            this.response.dist = dir.routes[0].legs[0].distance.text;
            this.response.dur = dir.routes[0].legs[0].duration.text;
            // this.lat = res.routes[0].legs[0].start_location.lat;
            // this.lng = res.routes[0].legs[0].start_location.lng;
          
            this.tts.synthesizeSpeech('it is ' + this.response.dist + ' to your destination, it will take ' + this.response.dur);

            this.getMap(formattedAddress);
            this.responseUrl.emit('https://www.google.com/maps/dir/' + this.origin + '/' + formattedAddress.split(' ').join('+'));
        });        
    });
  }
}
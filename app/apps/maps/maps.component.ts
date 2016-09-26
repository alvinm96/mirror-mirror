import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PushbulletService } from './../pushbullet/pushbullet.service';
import { MapsService } from './maps.service';
import { TtsService } from './../tts/tts.service';
import { config } from './../../config';

@Component({
  selector: 'map',
  templateUrl: './maps.component.html',
})

export class MapsComponent implements OnInit {
  @Input() destination: string;
  @Output() responseUrl = new EventEmitter<any>();  
  origin: string;
  response = {
    dist: null,
    dur: null
  }
  map: any;

  constructor(private mapsService: MapsService, private tts: TtsService, private push: PushbulletService) { }

  ngOnInit() {
    if (this.destination) {
      this.getDirections(this.destination);
    }

    this.mapsService.geolocation().subscribe((val) => {
      this.origin = val.lat + ',' + val.lng; 
    });
  }

  getDirections(destination: string) {
    let formattedAddress: string;
    this.mapsService.geolocation().subscribe((val) => {
      this.mapsService.getPlaces((val.lat + ',' + val.lng) ,destination)
        .subscribe((res) => {
          formattedAddress = res.results[0].formatted_address;
          this.mapsService.getDirections(this.origin, formattedAddress)
            .subscribe((dir) => {
              this.response.dist = dir.routes[0].legs[0].distance.text;
              this.response.dur = dir.routes[0].legs[0].duration.text;

              this.mapsService.getMap(dir.routes[0].overview_polyline.points)
                .subscribe((res) => {
                  this.map = res;
                });

              this.tts.synthesizeSpeech('it is ' + this.response.dist + ' to your destination, it will take ' + this.response.dur);

              this.responseUrl.emit('https://www.google.com/maps/dir/' + this.origin + '/' + formattedAddress.split(' ').join('+'));
          });        
      });      
    })
  }
}
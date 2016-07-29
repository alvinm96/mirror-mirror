/**
 * Created by alvinm on 7/27/16.
 */
import { Component, OnInit } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import { MapsService } from './maps.service';


@Component({
  selector: 'map',
  template: `
            <div class="app">
            {{dist}} {{dur}}
            <sebm-google-map [zoom]="zoom" [latitude]="lat" [longitude]="lng">
                <sebm-google-map-marker [latitude]="lat" [longitude]="lng"></sebm-google-map-marker>
            </sebm-google-map>
            </div>
            `,
  styleUrls: ['./services/maps/maps.component.css'],
  directives: [ GOOGLE_MAPS_DIRECTIVES ],
  providers: [
    MapsService,
    GoogleMapsAPIWrapper ]
})

export class MapsComponent implements OnInit {
  response: any;
  request = {
    origin: 'Voicebox Technologies Bellevue, WA',
    destination:'16812 NE 6th PL Bellevue, WA 98008'
  };
  dist: number;
  dur: number;
  lat: number;
  lng: number;
  zoom: number = 15;

  constructor(private mapsService: MapsService, private _mapsWrapper: GoogleMapsAPIWrapper) {
   
  }

  getDirections() {
    this.mapsService.getDirections(this.request.origin, this.request.destination)
      .then((res) => {
        this.dist = res.routes[0].legs[0].distance.text;
        this.dur = res.routes[0].legs[0].duration.text;
        this.lat = res.routes[0].legs[0].start_location.lat;
        this.lng = res.routes[0].legs[0].start_location.lng;

      });
  }


  ngOnInit() {
    this.getDirections();
  }
}
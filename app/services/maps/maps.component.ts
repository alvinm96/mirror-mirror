/**
 * Created by alvinm on 7/27/16.
 */
import { Component, Input } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import { MapsService } from './maps.service';

import { config } from './../../config.ts';

@Component({
  selector: 'map',
  templateUrl: './services/maps/maps.component.html',
  styleUrls: ['./services/maps/maps.component.css'],
  directives: [ GOOGLE_MAPS_DIRECTIVES ],
  providers: [
    MapsService,
    GoogleMapsAPIWrapper ]
})

export class MapsComponent {
  origin = config.weather.location.city;
  @Input() destination = 'bellevue';
  response = {
    dist: null,
    dur: null
  }
  lat: number;
  lng: number;
  zoom: number = 15;

  constructor(private mapsService: MapsService, private _mapsWrapper: GoogleMapsAPIWrapper) { }

  getDirections() {
    this.mapsService.getDirections(this.origin, this.destination)
      .then((res) => {
        this.response.dist = res.routes[0].legs[0].distance.text;
        this.response.dur = res.routes[0].legs[0].duration.text;
        this.lat = res.routes[0].legs[0].start_location.lat;
        this.lng = res.routes[0].legs[0].start_location.lng;
      })
      .catch((err) => {
        alert('Location not found');
      });
  }
}
/**
 * Created by alvinm on 7/27/16.
 */
import { Component } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import { MapsService } from './maps.service';

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
  request = {
    origin: null,
    destination: null
  };
  response = {
    dist: null,
    dur: null
  }
  lat: number;
  lng: number;
  zoom: number = 15;

  constructor(private mapsService: MapsService, private _mapsWrapper: GoogleMapsAPIWrapper) { }

  getDirections() {
    this.mapsService.getDirections(this.request.origin, this.request.destination)
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
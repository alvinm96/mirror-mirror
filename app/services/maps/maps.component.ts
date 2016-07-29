/**
 * Created by alvinm on 7/27/16.
 */
import { Component } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import { MapsService } from './maps.service';


@Component({
  selector: 'map',
  template: `
            <div class="app">
              <div id="info">
                <form>
                  <div class="form-group">
                    <label for="origin">Origin: </label>
                    <input type="text" class="form-control" [(ngModel)]="request.origin"/>
                  </div>
                  <div class="form-group">
                    <label for="destination">Destination: </label>
                    <input type="text" class="form-control" [(ngModel)]="request.destination"/>
                  </div>
                  <button type="submit" class="btn btn-default" (click)="getDirections()">Submit</button>
                </form>
                <div id="result" *ngIf="response.dist">
                  <p>From: {{request.origin}}</p>
                  <p>To: {{request.destination}}</p>
                  <p>Distance: {{response.dist}}</p>
                  <p>Duration: {{response.dur}}</p>
                </div>
              </div>
              <div id="map" *ngIf="lat">
                <sebm-google-map [zoom]="zoom" [latitude]="lat" [longitude]="lng">
                    <sebm-google-map-marker [latitude]="lat" [longitude]="lng"></sebm-google-map-marker>
                </sebm-google-map>
              </div>
            </div>
            `,
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
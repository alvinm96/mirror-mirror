import { Component, OnInit, Input } from '@angular/core';

import { MapsService } from './maps.service';
import { config } from './../../config'

@Component({
  'selector': 'places',
  'templateUrl': './services/maps/places.component.html'
})

export class PlacesComponent implements OnInit {
  places: Object[] = [ ];
  distances: number[] = [ ];
  @Input() query: string;

  constructor(private maps: MapsService) { }

  ngOnInit() {
    this.getPlaces(this.query);
  }

  getPlaces(query: string) {
    this.maps.getPlaces('malls nearby')
      .then((res) => {
        this.places = res.results;      
        console.log(this.places);
      });
  }
}
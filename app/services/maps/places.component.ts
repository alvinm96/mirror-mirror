import { Component, OnInit, Input } from '@angular/core';

import { MapsService } from './maps.service.ts';

@Component({
  'selector': 'places',
  'template': ''
})

export class PlacesComponent implements OnInit {
  places: Object[] = [ ];
  @Input() query: string;

  constructor(private maps: MapsService) { }

  ngOnInit() {
    this.getPlaces(this.query);
  }

  getPlaces(query: string) {
    this.maps.getPlaces('restaurants near me')
      .then((res) => {
        this.places = res.results;
        console.log(this.places);
      });
  }
}
import { Component, OnInit } from '@angular/core';

import { SpotifyService } from './spotify.service.ts';

@Component({
  selector: 'spotify',
  template: '',
  providers: [ SpotifyService ]
})

export class SpotifyComponent implements OnInit {

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {
    this.spotify.authorize()
      .then((res) => {
        console.log(res);
      });
  }
}
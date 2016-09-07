import { Component } from '@angular/core';

import { SpotifyService } from './spotify.service';

@Component({
  'selector': 'spotify',
  'template': '<button (click)="authorize()">Login</button><button (click)="getUserProfile()">Profile</button><button (click)="searchSong()">Song</button>',
  'providers': [ SpotifyService ]
})

export class SpotifyComponent {

  constructor(private spotify: SpotifyService) { }

  authorize() {
    this.spotify.getAccessToken();
  }
  getUserProfile() {
    this.spotify.getUserProfile();
  }
  searchSong() {
    this.spotify.searchSong('panda');
  }
}
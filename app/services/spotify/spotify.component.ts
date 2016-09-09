import { Component, OnInit } from '@angular/core';

import { SpotifyService } from './spotify.service';

@Component({
  'selector': 'spotify',
  'templateUrl': './services/spotify/spotify.component.html',
  'styleUrls': ['./services/spotify/spotify.component.css'],
  'providers': [ SpotifyService ],
})

export class SpotifyComponent {
  activeSong: any;
  songSrc: string;
  name: string;
  artist: string;
  albumSrc: string;
  album: string;
  progressWidth: number = 0;
  duration: number = 0;

  constructor(private spotify: SpotifyService) { }

  authorize() {
    this.spotify.getAccessToken();
  }
  getUserProfile() {
    this.spotify.getUserProfile();
  }
  playSong(query: string) {
    this.spotify.searchSong(query)
      .then((res) => {
        console.log(res);
        let song = res.tracks.items[0];
        this.name = song.name;
        this.artist = song.artists[0].name;
        this.albumSrc = song.album.images[0].url;
        this.album = song.album.name;
        this.songSrc = song.preview_url;
        this.activeSong = new Audio();
        this.activeSong.src = this.songSrc;
        this.activeSong.play();

        this.activeSong.addEventListener('timeupdate', () => {
          let percentOfSong = this.activeSong.currentTime / this.activeSong.duration;
          this.progressWidth = document.getElementById('track').offsetWidth * percentOfSong;
          this.duration = Math.floor(this.activeSong.currentTime);
        });
      });
  }
}
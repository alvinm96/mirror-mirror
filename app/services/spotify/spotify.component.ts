import { Component } from '@angular/core';

import { SpotifyService } from './spotify.service';

@Component({
  'selector': 'spotify',
  'templateUrl': './services/spotify/spotify.component.html',
  'styleUrls': ['./services/spotify/spotify.component.css'],
  'providers': [ SpotifyService ]
})

export class SpotifyComponent {
  activeSong: HTMLAudioElement;
  songSrc: string;
  name: string;
  artist: string;
  albumSrc: string;
  album: string;


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
      });
  }
  private updateTime(){
    var currentSeconds = (Math.floor(this.activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor(this.activeSong.currentTime % 60);
    var currentMinutes = Math.floor(this.activeSong.currentTime / 60);

    //Sets the current song location compared to the song duration.
    document.getElementById('songTime').innerHTML = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(this.activeSong.duration / 60) + ":" + (Math.floor(this.activeSong.duration % 60) < 10 ? '0' : '') + Math.floor(this.activeSong.duration % 60);

    //Fills out the slider with the appropriate position.
    var percentageOfSong = (this.activeSong.currentTime/this.activeSong.duration);
    var percentageOfSlider = document.getElementById('songSlider').offsetWidth * percentageOfSong;

    //Updates the track progress div.
    document.getElementById('trackProgress').style.width = Math.round(percentageOfSlider) + "px";
  }
}
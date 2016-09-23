import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { TtsService } from './../tts/tts.service';

@Component({
  selector: 'spotify',
  template: require('./spotify.component.html'),
  styleUrls: ['./apps/spotify/spotify.component.css'],
  providers: [ SpotifyService ],
})

export class SpotifyComponent implements OnInit {
  activeSong: HTMLAudioElement;
  songSrc: string;
  name: string;
  artist: string;
  albumSrc: string;
  album: string;
  progressWidth: number = 0;
  duration: number = 0;
  playing: HTMLAudioElement[] = [ ];
  numSongsPlaying: number = 0;

  constructor(private spotify: SpotifyService, private tts: TtsService) { }

  ngOnInit() {
    let isAuthorized = this.spotify.authorized.subscribe((res) => {  return res;  })
    if (!isAuthorized) {
      this.authorize();
    }
  }

  authorize() {
    this.spotify.getAccessToken();
  }
  getUserProfile() {
    this.spotify.getUserProfile();
  }
  playSong(query: string) {
    this.spotify.searchSong(query)
      .then((res) => {
          let song = res.tracks.items[0];
          this.name = song.name;
          this.artist = song.artists[0].name;
          this.albumSrc = song.album.images[0].url;
          this.album = song.album.name;
          this.songSrc = song.preview_url;
          this.activeSong = new Audio();
          this.activeSong.src = this.songSrc;          
          this.activeSong.addEventListener('timeupdate', () => {
            let percentOfSong = this.activeSong.currentTime / this.activeSong.duration;
            this.progressWidth = document.getElementById('track').offsetWidth * percentOfSong;
            this.duration = Math.floor(this.activeSong.currentTime);
          });

          this.playing[this.numSongsPlaying++] = this.activeSong;

          if (this.numSongsPlaying === 1) {
            this.playing[this.numSongsPlaying-1].play();
          } else {
            this.playing[this.numSongsPlaying-2].pause();
            this.playing[this.numSongsPlaying-1].play();
          }
      });
  }

  resumeSong() {
    this.playing[this.numSongsPlaying-1].play();
  }

  pauseSong() {
    if (this.numSongsPlaying > 0) {
      this.playing[this.numSongsPlaying-1].pause();
    }
  }
}
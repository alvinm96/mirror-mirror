import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { TtsService } from './../tts/tts.service';

@Component({
  'selector': 'spotify',
  'templateUrl': './apps/spotify/spotify.component.html',
  'styleUrls': ['./apps/spotify/spotify.component.css'],
  'providers': [ SpotifyService ],
})

export class SpotifyComponent implements OnInit {
  activeSong: any;
  songSrc: string;
  name: string;
  artist: string;
  albumSrc: string;
  album: string;
  progressWidth: number = 0;
  duration: number = 0;
  @Input() query: string;

  constructor(private spotify: SpotifyService, private tts: TtsService) { }

  ngOnInit() {
    let isAuthorized = this.spotify.authorized.subscribe(res => {  return res;  })

    if (isAuthorized && this.query) {
      this.playSong();
    } else {
      this.authorize();
    }
  }

  authorize() {
    this.spotify.getAccessToken();
  }
  getUserProfile() {
    this.spotify.getUserProfile();
  }
  playSong() {
    this.spotify.searchSong(this.query)
      .then((res) => {
        try {
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
        } catch(err) {
          this.tts.synthesizeSpeech('That song was not found');
        }
      });
  }
}
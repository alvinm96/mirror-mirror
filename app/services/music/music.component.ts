import { Component } from '@angular/core';

@Component({
  'selector': 'music',
  'template': '<iframe width="350" height="175" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/251581561&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'
})

export class MusicComponent {
  constructor() {}
}
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from './youtube.service';

@Component({
  selector: 'youtube',
  template: '<div class="app" *ngIf="video"><iframe width="560" height="315" [src]="video" frameborder="0" allowfullscreen></iframe></div>',
  styleUrls: ['./apps/youtube/youtube.component.css'],
  providers: [ YoutubeService ]
})

export class YoutubeComponent {
  @Input() query: string;
  video: SafeResourceUrl;

  ngOnInit() {
    this.getVideo();
  }

  constructor(private youtube: YoutubeService, private sanitizer: DomSanitizer) { }

  getVideo() {
    this.youtube.searchVideos(this.query)
      .subscribe((res) => {
        let videoId = res.items[0].id.videoId;
        this.video = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId + '?autoplay=1');
      });
  }
}
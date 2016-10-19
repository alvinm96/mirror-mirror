import { Component, OnInit } from '@angular/core';

import { SnowboyService } from './snowboy.service';

@Component({
  selector: 'snowboy',
  template: `<button (click)="record()">RECORD</button>
             <button (click)="train()">TRAIN</button>
            `
})
export class SnowboyComponent implements OnInit {
  constructor(private snowboy: SnowboyService) { }


  ngOnInit() { }

  record(){
    this.snowboy.record();
  }

  train() {
    this.snowboy.train('test');
  }
}
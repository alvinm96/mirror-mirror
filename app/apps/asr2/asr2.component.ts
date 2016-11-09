import { Component, OnInit } from '@angular/core';
import { Asr2Service } from './asr2.service';

@Component({
  selector: 'asr2',
  template: '<button (click)="record()">SEND</button>'
})
export class Asr2Component implements OnInit {
  constructor(private asr: Asr2Service) { }

  ngOnInit() { 
    this.asr.authorize();
  }

  record() {
    this.asr.startRecording();  
  }
}
import { Injectable } from '@angular/core';
import './js/annyang.min.js';

@Injectable()
export class AnnyangService {
  window: any;
  annyang: any;
  commands = {};

  constructor() { 
    this.window = window;
    this.annyang = this.window.annyang;
  }

  addCommands(phrase: string, callback: Function) {
    this.commands[phrase] = callback;
  } 

  start() {
    this.annyang.addCommands(this.commands);
    this.annyang.start();
  }

  trigger(command: string) {
    this.annyang.trigger(command);
  }
}


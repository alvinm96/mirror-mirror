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

  pause() {
    this.annyang.pause();
  }

  resume() {
    this.annyang.resume();
  }

  start() {
    this.annyang.addCommands(this.commands);
    this.annyang.start({continuous: true});
  }

  trigger(command: string) {
    this.annyang.trigger(command);
  }

  isListening() {
    return this.annyang.isListening();
  }

  debug(state: boolean) {
    this.annyang.debug(state);
  }

  addCallback(type:string, callback: Function) {
    this.annyang.addCallback(type, callback);
  }

  getSpeechRecognizer() {
    console.log(this.annyang.getSpeechRecognizer());
  }

}


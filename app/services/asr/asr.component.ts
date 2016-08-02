/**
 * Created by alvinm on 7/19/16.
 */
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'asr',
  template: `<span class="asr">
              <div id="recordDiv">
                <button id="listenButton" type="button" class="btn btn-primary" 
                onclick="setListening()"><i class='fa fa-microphone'></i></button>
              </div>
              <div id="responseDiv">
                <div #asrResponse id="asrResponse"></div>
                <div id="result" #result (compositionend)="onChange(asrResponse.innerHTML)"></div>
                <!--<button (click)="onChange(asrResponse.innerHTML)">Send</button>-->
              </div>  
            </span>
            `
})

export class AsrComponent {
  @Output() gotUtterance = new EventEmitter<string>();

  constructor() { }

  onChange(value: string) {
    this.gotUtterance.emit(value);
    console.log('got it');
  }
}

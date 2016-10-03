/**
 * Created by alvinm on 7/6/16.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'time',
  templateUrl: './time.html'
})

export class TimeComponent {
  date: Date;

  constructor() {
    this.date = new Date();

    setInterval(() => {
      this.date =  new Date();
    }, 1000);
  }
}
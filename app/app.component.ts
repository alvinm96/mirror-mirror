import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
            <weather></weather>
            <time></time>
            <dashboard></dashboard>
            <todoist></todoist>
            <pushbullet></pushbullet>
            `
})
export class AppComponent { }
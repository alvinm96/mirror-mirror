import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
            <weather></weather>
            <time></time>
            <pushbullet></pushbullet>
            <dashboard></dashboard>
            <todoist></todoist>
            <spotify></spotify>
            `
})
export class AppComponent { }
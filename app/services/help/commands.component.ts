import { Component } from '@angular/core';

@Component({
  selector: 'commands',
  template: `
            <div class="app">
              <h3 id="commandsTitle">Available Commands</h3>
              <ul id="commandsList">
                <li>Get the forecast for the day</li>
                <li>Get the forecast for the week</li>
                <li>Get maps</li>
              </ul>
            </div>
            `
})

export class CommandsComponent {
  constructor() { }
}
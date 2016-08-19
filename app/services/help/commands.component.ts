import { Component } from '@angular/core';

@Component({
  selector: 'commands',
  template: `
            <div class="app">
              <h3 id="commandsTitle">What can I do?</h3>
              <ul id="commandsList">
                <li>Ask for the weather</li>
                <li>Ask for directions</li>
                <li>Ask for music</li>
              </ul>
            </div>
            `
})

export class CommandsComponent {
  constructor() { }
}
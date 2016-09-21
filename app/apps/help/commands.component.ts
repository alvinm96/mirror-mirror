import { Component } from '@angular/core';

@Component({
  selector: 'commands',
  template: `
            <div class="app">
              <h3 id="commandsTitle">What can I do?</h3>
              <ul id="commandsList">
                <li>Ask for the weather</li>
                <li>Get directions to a destination</li>
                <li>Play a YouTube video</li>
                <li>Play music from Spotify</li>
                <li>Add a task to your todo list</li>
              </ul>
            </div>
            `
})

export class CommandsComponent {
  constructor() { }
}
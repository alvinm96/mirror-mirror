import { Component } from '@angular/core';

@Component({
  selector: 'commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})

export class CommandsComponent {
  commands: string[] = [
   'Ask for the weather',
   'Get directions to a destination',
   'Play a YouTube video',
   'Play music from Spotify',
   'Add a task to your todo list'
  ];

  constructor() { }
}
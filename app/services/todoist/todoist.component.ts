import { Component, OnInit } from '@angular/core';

import { TodoistService } from './todoist.service.ts';

@Component({
  selector: 'todoist',
  templateUrl: './services/todoist/todoist.component.html',
})

export class TodoistComponent implements OnInit {
  todos: string[] = [];

  constructor(private todo: TodoistService) { }

  ngOnInit() { 
    setInterval(this.getTodos(), 10000);
  }

  getTodos() {
    this.todo.getTodoist().
      then((res) => {
        this.todos = res.items;
      });
  }
}
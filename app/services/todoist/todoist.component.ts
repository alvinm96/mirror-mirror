import { Component, OnInit } from '@angular/core';

import { TodoistService } from './todoist.service.ts';

@Component({
  selector: 'todoist',
  templateUrl: './services/todoist/todoist.component.html',
  providers: [ TodoistService ]
})

export class TodoistComponent implements OnInit {
  todos: string[] = [];

  constructor(private todo: TodoistService) { }

  ngOnInit() { 
    this.getTodos(); 
  }

  getTodos() {
    this.todo.getTodoist().
      then((res) => {
        this.todos = res.items;
      });
  }

  addTodo(text: string) {
    this.todo.addTodo();
  }
}
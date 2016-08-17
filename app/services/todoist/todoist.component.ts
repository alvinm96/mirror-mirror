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
    setInterval(() => {
      this.getTodos();
    }, 1000);    

    this.addTodo();
  }

  getTodos() {
    this.todo.getTodoist().
      then((res) => {
        this.todos = res.items;
      });
  }

  addTodo() {
    this.todo.addTodo('test todo1');
  }
}
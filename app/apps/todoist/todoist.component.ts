import { Component, OnInit } from '@angular/core';
import { TodoistService } from './todoist.service';

@Component({
  selector: 'todoist',
  templateUrl: './todoist.component.html',
  styleUrls: ['./todoist.component.css']
})

export class TodoistComponent implements OnInit {
  todos: string[] = [];

  constructor(private todo: TodoistService) { }

  ngOnInit() { 
    this.authorize();
    setInterval(() => {
      this.getTodos()
    }, 10000);      
  }

  getTodos() {
    this.todo.getTodos()
      .subscribe((res) => {
        this.todos = res.items;
      });
  }

  authorize() {
    this.todo.authorize();
  }
}
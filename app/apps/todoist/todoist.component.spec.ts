/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { ComponentFixture, TestBed, async, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { TodoistComponent } from './todoist.component';
import { TodoistService } from './todoist.service';
import { config } from './../../config';

describe('TodoistComponent', () => {
  let component: TodoistComponent;
  let fixture: ComponentFixture<TodoistComponent>;  
  let el: DebugElement;
  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ TodoistComponent ],
        providers: [
          {
            provide: 
              Http,
              useFactory: (backend, options) => {
                return new Http(backend, options);
              },
              deps: [MockBackend, BaseRequestOptions],
          },
          MockBackend,
          BaseRequestOptions,
          TodoistService
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      });
      
      fixture = TestBed.overrideComponent(TodoistComponent, {
        set: {
          template: `
            <div id="todoist">
              <p id="todoTitle">Todo</p>
              <ul>
                <li *ngFor="let todo of todos">{{todo.content}}</li>
              </ul>
            </div>`
        }
      })
      .createComponent(TodoistComponent);
      component = fixture.componentInstance;       
      el = fixture.debugElement.query(By.css('ul')); 
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should call addTodo and add to list',
    inject([TodoistService, MockBackend], (service: TodoistService, backend: MockBackend) => {
      backend.connections.subscribe((conn: MockConnection) => {
        const options: ResponseOptions = new ResponseOptions({body: {'hello': 'world'}});
        conn.mockRespond(new Response(options));
        service.token = config.todoist.key;
      });
      service.addTodo('test').subscribe((res) => {
        expect(res).toEqual({'hello': 'world'});
      });
    }));
});
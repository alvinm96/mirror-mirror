// /// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
// import { ComponentFixture, TestBed, async, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
// import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
// import { MockBackend, MockConnection } from '@angular/http/testing';

// import { TodoistComponent } from './todoist.component';
// import { TodoistService } from './todoist.service';
// import { config } from './../../config';

// describe('ForecastComponent', () => {
//   let component: TodoistComponent;
//   let fixture: ComponentFixture<TodoistComponent>;  
//   let todoStub = {
//     token: config.todoist.key
//   };  

//   beforeEach(() => {
//       TestBed.configureTestingModule({
//         declarations: [ TodoistComponent ],
//         providers: [
//           {
//             provide: 
//               Http,
//               useFactory: (backend, options) => {
//                 return new Http(backend, options);
//               },
//               deps: [MockBackend, BaseRequestOptions],
//           },
//           MockBackend,
//           BaseRequestOptions,
//           [{provide: TodoistService, useValue: todoStub}]
//         ],
//         schemas: [ NO_ERRORS_SCHEMA ]
//       });
      
//       fixture = TestBed.overrideComponent(TodoistComponent, {
        
//       })
//       .createComponent(TodoistComponent);
//       component = fixture.componentInstance;      
//   });

//   it('should have a defined component', () => {
//     expect(component).toBeDefined();
//   });

//   it('should call getForecast',
//     async(inject([TodoistService, MockBackend], (service: TodoistService, backend: MockBackend) => {
//       backend.connections.subscribe((conn: MockConnection) => {
//         const options: ResponseOptions = new ResponseOptions({body: {'hello': 'world'}});
//         conn.mockRespond(new Response(options));
//       });

//       service.addTodo('test').subscribe((res) => {
//         expect(res['hello']).toEqual('world');
//       });
//     })));
// });
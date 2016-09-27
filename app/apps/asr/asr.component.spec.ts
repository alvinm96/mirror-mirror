// /// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
// import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
// import { MockBackend, MockConnection } from '@angular/http/testing';

// import { AsrComponent } from './asr.component';
// import { AsrService } from './asr.service';

// describe('DashboardComponent', () => {
//   let component: AsrComponent;
//   let fixture: ComponentFixture<AsrComponent>;  
//   beforeEach(() => {
//       TestBed.configureTestingModule({
//         declarations: [ AsrComponent ],
//         providers: [
//           {
//             provide: Http, useFactory: (backend, options) => {
//               return new Http(backend, options);
//             },
//             deps: [MockBackend, BaseRequestOptions]
//           },
//           MockBackend,
//           BaseRequestOptions
//         ]
//       });

//     fixture = TestBed.createComponent(AsrComponent);
//     component = fixture.componentInstance;      
//   });

//   it('should have a defined component', () => {
//     expect(component).toBeDefined();
//   });
// });
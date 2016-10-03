/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { ComponentFixture, TestBed, async, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { PushbulletComponent } from './pushbullet.component';
import { PushbulletService } from './pushbullet.service';
import { config } from './../../config';

describe('PushbulletComponent', () => {
  let component: PushbulletComponent;
  let fixture: ComponentFixture<PushbulletComponent>;  
  let todoStub = {
    token: config.todoist.key
  };  

  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ PushbulletComponent ],
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
          [{provide: PushbulletService, useValue: todoStub}]
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      });
      
      fixture = TestBed.overrideComponent(PushbulletComponent, {
        
      })
      .createComponent(PushbulletComponent);
      component = fixture.componentInstance;      
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
});
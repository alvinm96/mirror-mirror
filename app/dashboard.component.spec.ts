/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { DashboardComponent } from './dashboard.component';
import { TtsService } from './apps/tts/tts.service';
import { TodoistService } from './apps/todoist/todoist.service';
import { PushbulletService } from './apps/pushbullet/pushbullet.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;  
  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ DashboardComponent ],
        providers: [
          {
            provide: Http, useFactory: (backend, options) => {
              return new Http(backend, options);
            },
            deps: [MockBackend, BaseRequestOptions]
          },
          MockBackend,
          BaseRequestOptions,
          TtsService,
          TodoistService,
          PushbulletService
        ]
      });

    fixture = TestBed
      .overrideComponent(DashboardComponent, {
        set: {
          template: ''
        }
      })
      .createComponent(DashboardComponent);
    component = fixture.componentInstance;      
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
});
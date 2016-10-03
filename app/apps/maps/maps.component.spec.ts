/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { ComponentFixture, TestBed, async, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { MapsComponent } from './maps.component';
import { MapsService } from './maps.service';
import { TtsService } from './../tts/tts.service';
import { PushbulletService } from './../pushbullet/pushbullet.service';

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;  

  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ MapsComponent ],
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
          MapsComponent,
          MapsService,
          TtsService,
          PushbulletService
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      });

    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;      
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
});
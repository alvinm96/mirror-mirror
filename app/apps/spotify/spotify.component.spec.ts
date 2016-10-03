/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { ComponentFixture, TestBed, async, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { SpotifyComponent } from './spotify.component';
import { SpotifyService } from './spotify.service';
import { Timer } from './../../pipes/timer.pipe';
import { TtsService } from './../tts/tts.service';

describe('SpotifyComponent', () => {
  let component: SpotifyComponent;
  let fixture: ComponentFixture<SpotifyComponent>;  

  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ SpotifyComponent, Timer ],
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
          SpotifyService,
          TtsService
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      });
      
      fixture = TestBed.overrideComponent(SpotifyComponent, {
        
      })
      .createComponent(SpotifyComponent);
      component = fixture.componentInstance;      
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
});
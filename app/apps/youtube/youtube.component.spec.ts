/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { YoutubeService } from './youtube.service';
import { YoutubeComponent } from './youtube.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

describe('YoutubeComponent', () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;  
  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ ChartsModule ], 
        declarations: [ YoutubeComponent ],
        providers: [
          {
            provide: Http, useFactory: (backend, options) => {
              return new Http(backend, options);
            },
            deps: [MockBackend, BaseRequestOptions]
          },
          MockBackend,
          BaseRequestOptions,
          YoutubeService
        ]
      });

    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;      
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should have a video player', () => {
    let el = fixture.debugElement.query(By.css('iframe'));
    expect(el).toBeDefined();
  });

  it('should call searchVideos',
    async(inject([YoutubeService, MockBackend], (service: YoutubeService, backend: MockBackend) => {
      backend.connections.subscribe((conn: MockConnection) => {
        const options: ResponseOptions = new ResponseOptions({body: {'hello': 'world'}});
        conn.mockRespond(new Response(options));
      });

      service.searchVideos('cats').subscribe((res) => {
        expect(res['hello']).toEqual('world');
      });
    })));
});
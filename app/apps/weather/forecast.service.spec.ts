/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ForecastService } from './forecast.service';

describe('ForecastService', () => {
  let subject: ForecastService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [ 
        ForecastService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(inject([ForecastService, MockBackend], (youtube: ForecastService, mockbackend: MockBackend) => {
    subject = youtube;
    backend = mockbackend;
  }));

  it('should call getForecast and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toContain('https://api.darksky.net/forecast/');
      expect(connection.request.method).toEqual(RequestMethod.Get);

      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getForecast(0, 0)
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });
});

/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { NluService } from './nlu.service';

describe('NluService', () => {
  let subject: NluService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [ 
        NluService,
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

  beforeEach(inject([NluService, MockBackend], (youtube: NluService, mockbackend: MockBackend) => {
    subject = youtube;
    backend = mockbackend;
  }));

  it('should call getIntent return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toContain('https://api.api.ai/v1/');  
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getIntent('test utterance')
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });
});

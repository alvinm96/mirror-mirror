/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { YoutubeService } from './youtube.service';

describe('YoutubeService', () => {
  let subject: YoutubeService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [ 
        YoutubeService,
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

  beforeEach(inject([YoutubeService, MockBackend], (youtube: YoutubeService, mockbackend: MockBackend) => {
    subject = youtube;
    backend = mockbackend;
  }));

  it('should call searchVideos and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toContain('https://www.googleapis.com/youtube/v3/search');  
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .searchVideos('cats')
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });
});

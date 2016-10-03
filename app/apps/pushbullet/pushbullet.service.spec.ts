/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { PushbulletService } from './pushbullet.service';

describe('PushbulletService', () => {
  let subject: PushbulletService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [ 
        PushbulletService,
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

  beforeEach(inject([PushbulletService, MockBackend], (youtube: PushbulletService, mockbackend: MockBackend) => {
    subject = youtube;
    backend = mockbackend;
  }));

  it('should call sendToDevice and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toContain('https://api.pushbullet.com/v2/pushes');  
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .sendToDevice('cats')
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });

  it('should call getPushes and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toContain('https://api.pushbullet.com/v2/pushes');  
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getPushes()
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });
});

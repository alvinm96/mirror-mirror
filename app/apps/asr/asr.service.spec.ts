/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AsrService } from './asr.service';
import { NluService } from './../nlu/nlu.service';
import { Observable } from 'rxjs/Rx';


class MockNluService extends NluService {
  getIntent(utterance: string) { return Observable.throw('err'); }
}

describe('AsrService', () => {
  let subject: AsrService;
  // let nlu: MockNluService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [ 
        {
          provide: Http, useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },   
        AsrService,
        NluService,
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  beforeEach(inject([AsrService, MockBackend], (asr: AsrService, mockbackend: MockBackend) => {
    subject = asr;
    // nlu = mockNlu;
    backend = mockbackend;
    subject.initASR();
  }));

  it('should initialize the ASR and return isReady', () => {
    subject.isReady.subscribe((val) => {
      expect(val).toBe(true);
    });
  });

  it('should call getJWT and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toContain('https://api.voicebox.com/authn/v1/jwt');  
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getJWT()
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });
});

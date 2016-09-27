/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let subject: MapsService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [ 
        MapsService,
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

  beforeEach(inject([MapsService, MockBackend], (youtube: MapsService, mockbackend: MockBackend) => {
    subject = youtube;
    backend = mockbackend;
  }));

  it('should call getDirections and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toContain('https://maps.googleapis.com/maps/api/directions/json');
      expect(connection.request.method).toEqual(RequestMethod.Get);

      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getDirections('','')
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });

  it('should call getPlaces and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toContain('https://maps.googleapis.com/maps/api/place/textsearch/json');
      expect(connection.request.method).toEqual(RequestMethod.Post);

      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getPlaces('','')
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });

  it('should call getMap and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toContain('https://maps.googleapis.com/maps/api/staticmap');
      expect(connection.request.method).toEqual(RequestMethod.Get);

      let options = new ResponseOptions({
        url: 'https://maps.googleapis.com/maps/api/staticmap'
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getMap([''])
      .subscribe((res) => {
        expect(res).toEqual('https://maps.googleapis.com/maps/api/staticmap');
        done();
      });
  });

  it('should call getLatLng and return results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toContain('https://maps.googleapis.com/maps/api/geocode/json');
      expect(connection.request.method).toEqual(RequestMethod.Get);

      let options = new ResponseOptions({
        body: JSON.stringify({ results: [{ success: true }] })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getLatLng('')
      .subscribe((res) => {
        expect(res).toEqual({ success: true });
        done();
      });
  });    

  it('should call geolocation and return a location', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toContain('https://www.googleapis.com/geolocation/v1/geolocate');
      expect(connection.request.method).toEqual(RequestMethod.Post);

      let options = new ResponseOptions({
        body: JSON.stringify({ location: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .geolocation()
      .subscribe((res) => {
        expect(res).toBe(true);
        done();
      });
  });           
});

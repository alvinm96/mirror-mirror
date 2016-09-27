/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { ComponentFixture, TestBed, async, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { WeatherComponent } from './weather.component';
import { ForecastService } from './forecast.service';
import { MapsService } from './../maps/maps.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;  

  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ WeatherComponent ],
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
          ForecastService,
          MapsService
        ]
      });

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;      
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should display the temperature', () => {
    component.temperature = 100;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('span'));
    expect(el.nativeElement.textContent).toContain('100');
  });

  it('should display the condition icon', () => {
    component.icon = 'test';
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('i'));
  });

  it('should call getForecast',
    async(inject([ForecastService, MockBackend], (service: ForecastService, backend: MockBackend) => {
      backend.connections.subscribe((conn: MockConnection) => {
        const options: ResponseOptions = new ResponseOptions({body: {'hello': 'world'}});
        conn.mockRespond(new Response(options));
      });

      service.getForecast(0, 0).subscribe((res) => {
        expect(res['hello']).toEqual('world');
      });
    })));
});
/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { ComponentFixture, TestBed, async, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ForecastComponent } from './forecast.component';
import { ForecastService } from './forecast.service';
import { MapsService } from './../maps/maps.service';
import { TtsService } from './../tts/tts.service';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;  

  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ ForecastComponent ],
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
          MapsService,
          TtsService
        ],
        schemas: [ NO_ERRORS_SCHEMA ]
      });

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;      
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should display data in the table', () => {
    let mockData = [
      {
        'time': 1,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 2,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 3,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 4,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 5,
        'temperatureMin': 50,
        'temperatureMax': 60
      },                        
    ];
    component.weeklyData = mockData;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(el.rows[0].cells.length).toBe(5);
  });

  it('should not have more than 10 columns', () => {
    let mockData = [
      {
        'time': 1,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 2,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 3,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 4,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 5,
        'temperatureMin': 50,
        'temperatureMax': 60
      },    
      {
        'time': 6,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 7,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 8,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 9,
        'temperatureMin': 50,
        'temperatureMax': 60
      },
      {
        'time': 10,
        'temperatureMin': 50,
        'temperatureMax': 60
      },      
      {
        'time': 11,
        'temperatureMin': 50,
        'temperatureMax': 60
      },                               
    ];
    component.weeklyData = mockData;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(el.rows[0].cells.length).not.toBeGreaterThan(10);
  });  

  it('should convert the time to day', () => {
    let mockData = [
    {
        'time': 1475002016
      }
    ];
    component.weeklyData = mockData;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(el.rows[0].cells[0].innerHTML).toEqual('Tue');
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
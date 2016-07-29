import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';

import { TimeComponent } from './services/time/time.component';
import { AsrComponent } from './services/asr/asr.component';
import { WeatherComponent } from './services/weather/weather.component';
import { DashboardComponent } from './dashboard.component';

@Component({
  selector: 'app',
  template: `<time></time>
             <weather></weather><br>
             <dashboard></dashboard>
             <my-maps-project></my-maps-project>
             `,
  directives: [
    TimeComponent,
    AsrComponent,
    DashboardComponent,
    WeatherComponent,
  ]
})

export class App { }

bootstrap(App, [
  HTTP_PROVIDERS,
  GOOGLE_MAPS_PROVIDERS
]);
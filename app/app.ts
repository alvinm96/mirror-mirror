import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';

import { TimeComponent } from './services/time/time.component';
import { WeatherComponent } from './services/weather/weather.component';
import { DashboardComponent } from './dashboard.component';
import { AsrNewComponent } from './services/asr/asr-new.component';

@Component({
  selector: 'app',
  template: `<time></time>
             <weather></weather><br>
             <dashboard [selectedApp]="utterance"></dashboard>
             `,
  directives: [
    TimeComponent,
    DashboardComponent,
    WeatherComponent,
    AsrNewComponent
  ],
})

export class App { }

bootstrap(App, [
  HTTP_PROVIDERS,
  GOOGLE_MAPS_PROVIDERS,
  provide(Window, {useValue: window})
]);
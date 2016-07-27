import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { TimeComponent } from './services/time/time.component';
import { AsrComponent } from './services/asr/asr.component';
import { WeatherComponent } from './services/weather/weather.component';
import { DashboardComponent } from './dashboard.component';

@Component({
  selector: 'app',
  template: `<time></time>
             <weather></weather><br>
             <dashboard></dashboard>
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
  HTTP_PROVIDERS
]);
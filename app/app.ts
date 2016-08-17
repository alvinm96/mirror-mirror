import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';

import { AnnyangService } from './annyang.service.ts';
import { TtsService } from './services/tts/tts.service.ts';
import { AsrService } from './services/asr/asr.service.ts';

import { TimeComponent } from './services/time/time.component';
import { WeatherComponent } from './services/weather/weather.component';
import { DashboardComponent } from './dashboard.component';
import { TodoistComponent } from './services/todoist/todoist.component.ts';
import { SpotifyComponent } from './services/spotify/spotify.component.ts';
import { AsrHttpComponent } from './services/asr-http/asr-http.component.ts';

@Component({
  selector: 'app',
  template: ` 
             <weather></weather>
             <time></time>  
             <dashboard></dashboard>
             <todoist></todoist>
             `,
  directives: [
    TimeComponent,
    DashboardComponent,
    WeatherComponent,
    TodoistComponent,
    AsrHttpComponent,
    SpotifyComponent
  ],
  providers: [ TtsService ]
})

export class App { }

bootstrap(App, [
  HTTP_PROVIDERS,
  GOOGLE_MAPS_PROVIDERS,
  provide(Window, {useValue: window}),
  AnnyangService,
  AsrService
]);
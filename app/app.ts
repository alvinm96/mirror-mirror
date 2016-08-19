import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { TtsService } from './services/tts/tts.service.ts';
import { AsrService } from './services/asr/asr.service.ts'; //delete?
import { NluService } from './services/nlu/nlu.service.ts'

import { TimeComponent } from './services/time/time.component';
import { WeatherComponent } from './services/weather/weather.component';
import { DashboardComponent } from './dashboard.component';
import { TodoistComponent } from './services/todoist/todoist.component.ts';
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
  ],
  providers: [ TtsService, NluService ]
})

export class App { }

bootstrap(App, [
  HTTP_PROVIDERS,
  provide(Window, {useValue: window}),
  AsrService
]);
import { NgModule, provide } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { AsrComponent } from './services/asr/asr.component';
import { CommandsComponent } from './services/help/commands.component';
import { MapsComponent } from './services/maps/maps.component';
import { TimeComponent } from './services/time/time.component';
import { TodoistComponent } from './services/todoist/todoist.component';
import { HourForecastComponent } from './services/weather/hour-forecast.component';
import { WeatherComponent } from './services/weather/weather.component';
import { WeekForecastComponent } from './services/weather/week-forecast.component';
import { DashboardComponent } from './dashboard.component';
import { PushbulletComponent } from './services/pushbullet/pushbullet.component';
import { PlacesComponent } from './services/maps/places.component';
import { YoutubeComponent } from './services/youtube/youtube.component';
import { SpotifyComponent } from './services/spotify/spotify.component';

import { MapsService } from './services/maps/maps.service';
import { TtsService } from './services/tts/tts.service';
import { NluService } from './services/nlu/nlu.service';
import { TodoistService } from './services/todoist/todoist.service';
import { PushbulletService } from './services/pushbullet/pushbullet.service';

import { Timer } from './pipes/timer.pipe';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    AsrComponent,
    CommandsComponent,
    MapsComponent,
    TimeComponent,
    TodoistComponent,
    HourForecastComponent,
    WeatherComponent,
    WeekForecastComponent,
    DashboardComponent,
    PushbulletComponent,
    PlacesComponent,
    YoutubeComponent,
    SpotifyComponent,
    Timer
    ],
  providers: [
    MapsService,
    TtsService, 
    NluService, 
    TodoistService,
    PushbulletService,
    HTTP_PROVIDERS, 
    provide(Window, {useValue: window}) 
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
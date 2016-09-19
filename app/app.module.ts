import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CommandsComponent } from './services/help/commands.component';
import { MapsComponent } from './services/maps/maps.component';
import { TimeComponent } from './services/time/time.component';
import { TodoistComponent } from './services/todoist/todoist.component';
import { WeatherComponent } from './services/weather/weather.component';
import { ForecastComponent } from './services/weather/forecast.component';
import { DashboardComponent } from './dashboard.component';
import { PushbulletComponent } from './services/pushbullet/pushbullet.component';
import { PlacesComponent } from './services/maps/places.component';
import { YoutubeComponent } from './services/youtube/youtube.component';
import { SpotifyComponent } from './services/spotify/spotify.component';
import { AsrComponent } from './services/asr/asr.component';

import { MapsService } from './services/maps/maps.service';
import { TtsService } from './services/tts/tts.service';
import { NluService } from './services/nlu/nlu.service';
import { TodoistService } from './services/todoist/todoist.service';
import { PushbulletService } from './services/pushbullet/pushbullet.service';

import { Timer } from './pipes/timer.pipe';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [ 
    BrowserModule, 
    HttpModule, 
    ChartsModule 
    ],
  declarations: [
    AsrComponent,
    AppComponent,
    CommandsComponent,
    MapsComponent,
    TimeComponent,
    TodoistComponent,
    WeatherComponent,
    DashboardComponent,
    PushbulletComponent,
    PlacesComponent,
    YoutubeComponent,
    SpotifyComponent,
    ForecastComponent,
    Timer
    ],
  providers: [
    MapsService,
    TtsService, 
    NluService, 
    TodoistService,
    PushbulletService    
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
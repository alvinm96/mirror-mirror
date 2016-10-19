import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { CommandsComponent } from './apps/help/commands.component';
import { MapsComponent } from './apps/maps/maps.component';
import { TimeComponent } from './apps/time/time.component';
import { TodoistComponent } from './apps/todoist/todoist.component';
import { WeatherComponent } from './apps/weather/weather.component';
import { ForecastComponent } from './apps/weather/forecast.component';
import { DashboardComponent } from './dashboard.component';
import { PushbulletComponent } from './apps/pushbullet/pushbullet.component';
import { YoutubeComponent } from './apps/youtube/youtube.component';
import { SpotifyComponent } from './apps/spotify/spotify.component';
import { AsrComponent } from './apps/asr/asr.component';
import { SnowboyComponent } from './apps/hotword/snowboy.component';

import { SnowboyService } from './apps/hotword/snowboy.service';
import { AsrService } from './apps/asr/asr.service';
import { MapsService } from './apps/maps/maps.service';
import { TtsService } from './apps/tts/tts.service';
import { NluService } from './apps/nlu/nlu.service';
import { TodoistService } from './apps/todoist/todoist.service';
import { PushbulletService } from './apps/pushbullet/pushbullet.service';

import { Timer } from './pipes/timer.pipe';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [ 
    BrowserModule, 
    HttpModule, 
    ChartsModule,
    FormsModule 
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
    YoutubeComponent,
    SpotifyComponent,
    ForecastComponent,
    SnowboyComponent,
    Timer
    ],
  providers: [
    AsrService,
    MapsService,
    TtsService, 
    NluService, 
    TodoistService,
    PushbulletService,
    SnowboyService  
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
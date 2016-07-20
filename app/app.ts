import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';

import { TimeComponent } from './services/time/time.component';
import { AsrComponent } from './services/asr/asr.component';
@Component({
  selector: 'app',
  template: `<time></time>
             <asr></asr><test-app></test-app>`,
  directives: [TimeComponent, AsrComponent]
})

export class App { }

bootstrap(App);
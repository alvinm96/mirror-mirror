import { Component, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { AsrService } from './asr.service';
import { NluService } from './../nlu/nlu.service';
const PythonShell = require('python-shell');

@Component({
  selector: 'asr',
  template: require('./asr.component.html'),
  styleUrls: [ './apps/asr/asr.component.css' ],
})
export class AsrComponent implements AfterContentInit {
  private options = {
    pythonOptions: ['-u'],
    args: ['./app/hello-mirror.pmdl']
  };
  utterance: string;
  status: string;
  isListening: boolean = false;
  @Output() intent = new EventEmitter<any>();

  constructor(private asr: AsrService, private nlu: NluService) { }

  ngAfterContentInit() {
    this.asr.initASR();

    this.asr.isReady.subscribe((val) => {
      if (val === true) {
        var shell = new PythonShell('./app/snowboy/examples/Python/demo.py', this.options);
        shell.on('message', (message) => {
          if (message === 'keyword detected' && this.isListening === false) {
            this.isListening = true;
            this.asr.setListening();
          }
        });     
      }
    });

    this.asr.asrResult.subscribe((res) => {
      this.utterance = res.results[0].utterance;
      if (res.status === 'finalResult') {
        this.nlu.getIntent(res.results[0].utterance)
          .subscribe(
            (intent) => {
            this.intent.emit(intent);
            this.isListening = false;
            this.utterance = '';          
          },(error) => {
            this.isListening = false;
            this.utterance = '';     
          });
      }
    });
  }

  startRecording() {
    this.asr.setListening();
    this.isListening = true;
  }
}
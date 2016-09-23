import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AsrService } from './asr.service';
import { NluService } from './../nlu/nlu.service';
const PythonShell = require('python-shell');

@Component({
  selector: 'asr',
  template: require('./asr.component.html'),
  providers: [ AsrService ]
})
export class AsrComponent implements OnInit {
  private options = {
    pythonOptions: ['-u'],
    args: ['./app/hello-mirror.pmdl']
  };
  utterance: string;
  status: string;
  isListening: boolean = false;
  @Output() intent = new EventEmitter<any>();

  constructor(private asr: AsrService, private nlu: NluService) { }

  ngOnInit() {
    this.asr.initASR();

    this.asr.isReady.subscribe((val) => {
      if (val === true) {
        var shell = new PythonShell('./app/snowboy/examples/Python/demo.py', this.options);
        shell.on('message', (message) => {
          if (message === 'keyword detected') {
            this.isListening = true;
            this.asr.setListening();
          }
        });     
      }
    });

    this.asr.asrResult.subscribe((res) => {
      this.utterance = res.results[0].utterance;
      if (res.status === 'finalResult') {
        this.nlu.getIntent(res.results[0].utterance).then((intent) => {
          this.intent.emit(intent);
          this.isListening = false;
          this.utterance = '';          
        });
      }
    });  
  }

  startRecording() {
    this.asr.setListening();
  }
}
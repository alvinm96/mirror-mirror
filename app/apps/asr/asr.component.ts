import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AsrService } from './asr.service';
import { NluService } from './../nlu/nlu.service';
const PythonShell = require('python-shell');

// const record = require('node-record-lpcm16');
// const {Detector, Models} = require('snowboy');

@Component({
  selector: 'asr',
  templateUrl: './apps/asr/asr.component.html',
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

    // const models = new Models();
    // models.add({file: './../../hello-mirror.pmdl', sensitivity: '0.5', hotwords: 'hello mirror'});

    // const detector = new Detector({
    //   resource: './../../snowboy/resources/common.res',
    //   models: models,
    //   audioGain: 2.0
    // })

    // detector.on('hotword', (index, hotword) => {
    //   console.log('hotword', index, hotword);
    // });

    // const mic = record.start({
    //   threshold: 0,
    //   verbose: true
    // });

    // mic.pipe(detector);
  }

  startRecording() {
    this.asr.setListening();
  }
}
import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AsrService } from './asr.service';
import { NluService } from './../nlu/nlu.service';
const { Detector, Models } = require('snowboy');
const record = require('node-record-lpcm16');

@Component({
  selector: 'asr',
  templateUrl: './asr.component.html',
  styleUrls: [ './asr.component.css' ],
})
export class AsrComponent implements AfterViewInit {
  utterance: string;
  status: string;
  isListening: boolean = false;
  @Output() intent = new EventEmitter<any>();

  constructor(private asr: AsrService, private nlu: NluService) { }

  ngAfterViewInit() {
    setTimeout(this.asr.initASR());
    
    const models = new Models(); 
    models.add({
      file: './app/hello-mirror.pmdl',
      sensitivity: '0.5',
      hotwords : 'hello mirror'
    });   

    const detector = new Detector({
      resource: "./node_modules/snowboy/resources/common.res",
      models: models,
      audioGain: 2.0
    });

    this.asr.isReady.subscribe((val) => {
      if (val === true) {
        console.log('Listening for hotword...');        

        detector.on('hotword', (index, hotword) => {
          console.log('Hotword detected', index, hotword);        
          this.startRecording();
        }); 
        
        const mic = record.start({
          threshold: 0
        });  

        mic.pipe(detector);
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
/**
 * Created by alvinm on 7/19/16.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asr',
  templateUrl: 'services/asr/asr.html'
})

export class AsrComponent {
  // vbtSpeechRecognizer;
  // isListening = false;
  // audioContext;
  // audioNode;
  // statusPic;
  // constructor() {}
  //
  // ngOnInit() {
  //   navigator.getUserMedia({audio:true}, gotStream, (err) => {
  //     alert('navigator.getUserMedia error: ' + err);
  //   });
  //
  //   this.audioContext = new AudioContext;
  //
  //   function gotStream(stream) {
  //     this.audioNode = this.audioContext.createMediaStreamSource(stream);
  //   }
  // }
  //
  //
  // setListening(): void {
  //   if (this.vbtSpeechRecognizer) {
  //     if (!this.isListening) {
  //       this.vbtSpeechRecognizer.startListening();
  //       this.isListening = true;
  //       this.statusPic = "<i class='fa fa-stop stop'></i>";
  //     } else {
  //       this.vbtSpeechRecognizer.stopListening();
  //       this.isListening = false;
  //       this.statusPic = "<i class='fa fa-microphone'></i>";
  //     }
  //   }
  // }
  //
  // getJWT(): void {
  //   let apiKey = ''; //insert api key
  //   let xhttp = new XMLHttpRequest();
  //
  //   xhttp.onreadystatechange = () => {
  //     if (xhttp.readyState === 4 && xhttp.status === 200) {
  //       let jwt = xhttp.response;
  //       initVbtSpeechRecognition(jwt)
  //     }
  //   }
  // }

}

import { Injectable } from '@angular/core';

@Injectable()
export class AsrService {
  status: string;
  utterance: string;

  sendStatus(val: string) {
    this.status = val;
  }

  sendUtterance(val: string) {
    this.utterance = val;
  }

  getUtterance() {
    return this.utterance;
  }
 }
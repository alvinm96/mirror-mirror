import { Component, OnInit } from '@angular/core';

import { PushbulletService } from './pushbullet.service';
import { config } from './../../config';

@Component({
  'selector': 'pushbullet',
  'templateUrl': './services/pushbullet/pushbullet.component.html'
})

export class PushbulletComponent implements OnInit {
  ws: WebSocket;
  title: string;
  sender: string;
  body: string;
  img: string;

  constructor(private pushbullet: PushbulletService) { }

  ngOnInit() {
    this.ws = new WebSocket('wss://stream.pushbullet.com/websocket/' + config.pushbullet.key);

    this.ws.onopen = (event) => {
      console.log('Pushbullet WebSocket opened');
    };

    this.ws.onmessage = (event) => { this.onMessage(event); };

    this.ws.onerror = (event) => {
      console.log('There was an error');
    };

    this.ws.onclose = (event) => {
      console.log('Pushbullet WebSocket closed');
    }
  }

  onMessage(event) {
    let stream = eval('(' + event.data + ')');
    let type = stream.type;
    if (type === 'tickle') {
      if (stream.subtype === 'push') {
        this.pushbullet.getPushes()
          .then((res) => {
            this.sender = res.pushes[0].sender_name + ':';
            this.title = res.pushes[0].body;
          });
      } else if (stream.subtype === 'device') {
        console.log('this was a tickle device')
      } else if (stream.subtye === 'text') {
        console.log('this was a tickle text');
      }
    } else if (type === 'push') {
      if (stream.push.type === 'mirror') {
        this.sender = stream.push.application_name + ':';
        this.title = stream.push.title;
        this.body = stream.push.body;
        this.img = 'data:image/jpeg;base64,' + stream.push.icon;
      } else if (stream.push.type === 'sms_changed') {
        this.title = stream.push.notifications[0].title;
        this.body = stream.push.notifications[0].body;
      }
    }
    if (this.body) { 
      this.resetNotification();
    }  
  }

  private resetNotification() {
    setTimeout(() => {
      this.sender = '';
      this.title = '';
      this.body = '';
      this.img = '';
    }, 7000);
  }
}
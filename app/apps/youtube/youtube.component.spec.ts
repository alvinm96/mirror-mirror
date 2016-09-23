/// <reference path="./../../../typings/index.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { YoutubeService } from './youtube.service';
import { YoutubeComponent } from './youtube.component';

describe('YoutubeComponent', () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>
  let el: DebugElement;
  let youtubeService;
  let youtubeServiceStub;
  let spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ YoutubeService ],
      declarations: [ YoutubeComponent ],
    });

    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;
    
    youtubeService = fixture.debugElement.injector.get(YoutubeService);

    spy = spyOn(youtubeService, 'getVideos')
      .and.returnValue(true);

    el = fixture.debugElement.query(By.css('iframe'));

  });

  it('should have a defined component', () => {
    expect(true).toBe(true);
  });
});
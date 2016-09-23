/// <reference path="./../../../typings/index.d.ts" />
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TimeComponent } from './time.component';

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeComponent ]
    });

    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('div'));
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should have the current date', () => {
    let currentDate = new Date();
    expect(component.date.getDate).toEqual(currentDate.getDate);
  });
});
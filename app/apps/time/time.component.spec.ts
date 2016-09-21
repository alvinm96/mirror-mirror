/// <reference path="./../../../typings/index.d.ts" />
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeComponent } from './time.component';

// describe('TimeComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ TimeComponent ]
//     });
//   }));    

//   it('should display a time', () => {
//     TestBed.compileComponents().then(() => {
//       let fixture = TestBed.createComponent(TimeComponent);
//       fixture.detectChanges();
//       let compiled = fixture.debugElement.nativeElement;

//       expect(compiled).toBeUndefined();
//     });
//   });
// });
/// <reference path="./../../../typings/index.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommandsComponent } from './commands.component';

let comp: CommandsComponent;
let fixture: ComponentFixture<CommandsComponent>;
let el: DebugElement;

describe('CommandsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandsComponent ]
    });

    fixture = TestBed.createComponent(CommandsComponent);

    comp = fixture.componentInstance;
    
    el = fixture.debugElement.query(By.css('div'));
  });

  it('should display "What can I do?"', () => {
    expect(el.nativeElement.textContent).toContain('What can I do?');
  });
});

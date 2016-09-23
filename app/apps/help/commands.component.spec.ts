/// <reference path="./../../../typings/index.d.ts" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommandsComponent } from './commands.component';

describe('CommandsComponent', () => {
  let component: CommandsComponent;
  let fixture: ComponentFixture<CommandsComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandsComponent ]
    });

    fixture = TestBed.createComponent(CommandsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('div'));
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should display "What can I do?"', () => {
    expect(el.nativeElement.textContent).toContain('What can I do?');
  });
});

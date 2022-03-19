/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DxtextwithlabelComponent } from './dxtextwithlabel.component';

describe('DxtextwithlabelComponent', () => {
  let component: DxtextwithlabelComponent;
  let fixture: ComponentFixture<DxtextwithlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxtextwithlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxtextwithlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

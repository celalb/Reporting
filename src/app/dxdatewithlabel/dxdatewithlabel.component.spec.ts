/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DxdatewithlabelComponent } from './dxdatewithlabel.component';

describe('DxdatewithlabelComponent', () => {
  let component: DxdatewithlabelComponent;
  let fixture: ComponentFixture<DxdatewithlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxdatewithlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxdatewithlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DxdropdownwithlabelComponent } from './dxdropdownwithlabel.component';

describe('DxdropdownwithlabelComponent', () => {
  let component: DxdropdownwithlabelComponent;
  let fixture: ComponentFixture<DxdropdownwithlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxdropdownwithlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxdropdownwithlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

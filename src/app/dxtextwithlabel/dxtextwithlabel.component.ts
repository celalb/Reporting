import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dxtextwithlabel',
  templateUrl: './dxtextwithlabel.component.html',
  styleUrls: ['./dxtextwithlabel.component.css']
})
export class DxtextwithlabelComponent implements OnInit {

  public value:any;
  public placeholder:any;
  public label:any;
  constructor() { }
  @Output() valueChange = new EventEmitter();
  ngOnInit() {
  }
  valueChanged(data) {
    this.valueChange.emit(data.value);
}
}

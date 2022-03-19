import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dxdatewithlabel',
  templateUrl: './dxdatewithlabel.component.html',
  styleUrls: ['./dxdatewithlabel.component.css']
})
export class DxdatewithlabelComponent implements OnInit {

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

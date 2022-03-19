import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dxdropdownwithlabel',
  templateUrl: './dxdropdownwithlabel.component.html',
  styleUrls: ['./dxdropdownwithlabel.component.css']
})
export class DxdropdownwithlabelComponent implements OnInit {

  public value:any;
  public placeholder:any;
  public label:any;
  public paramSource:any;
  constructor() { }

  @Output() valueChange = new EventEmitter();
  ngOnInit() {
  }
  valueChanged(data) {
    this.valueChange.emit(data.value);
}

getSelectedItemsKeys(items) {
  var result = [],
      that = this;

  items.forEach(function(item) {
      if(item.selected) {
          result.push(item.key);
      }
      if(item.items.length) {
          result = result.concat(that.getSelectedItemsKeys(item.items));
      }
  });
  return result;
}

treeView_itemSelectionChanged(e){
  const nodes = e.component.getNodes();
  let val = this.getSelectedItemsKeys(nodes).join("")
  this.value = val;
}

}

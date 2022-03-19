import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { RestService } from '../rest.service';
//import { debug } from 'util';

@Component({
  selector: 'app-card-indicator',
  templateUrl: './card-indicator.component.html',
  styleUrls: ['./card-indicator.component.css']
})
export class CardIndicatorComponent implements OnInit,AfterViewInit {
  @Input() reportid: number=0;
  datasource: Object;
  report: Object;
  reportname: string="";

  constructor(private rest:RestService) { 
    this.report={};
    this.datasource={value:0};
  }


  async ngAfterViewInit(): Promise<void> {
      this.report = await this.rest.getReportName(this.reportid);
      this.getReport(this.reportid);
  }

  async getReport(id){
    this.datasource = await this.rest.getReport(id, 1, []);
    

    this.reportname = Object.keys(this.datasource[0])[0];
  }

  getValue(){
    if(this.datasource && this.datasource[0]){
      return this.formatvalue(this.datasource[0][this.reportname]);
    }
    else{
      return '';
    }
  }
  formatvalue(value){
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
  });
    

  return formatter.format(value);
  }
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  reports: any = [];
  constructor(private rest: RestService) { }

  ngOnInit() {
    this.getreports();
  }

  async getreports(){
    this.reports = await this.rest.getAllReports();
  }
  helloWorld() {
    alert('Hello world!');
  }






}

import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { UserLogin } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from '../services/encr-decr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data!:UserLogin;
  public user!:string;
  public pass!:string;
  public rememberMe:boolean=false;
  constructor(private rest:RestService,private cookieService:CookieService,private EncrDecr: EncrDecrService) { }

  ngOnInit() {
    let encrypted = this.cookieService.get('user');
    if(encrypted){
    let json = JSON.parse(this.EncrDecr.get('123456$#@$^@1ERF', encrypted));
    this.user=json["username"];
    this.pass=json["password"];
    }
  }
  async login(){
    this.data = {password:this.pass,username:this.user};
    await this.rest.login(this.data,this.rememberMe);
  }
}

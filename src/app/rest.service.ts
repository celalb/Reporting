import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserLogin, User, LoginResponse } from './interfaces/user';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Usergroup } from './interfaces/usergroup';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from './services/encr-decr.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

let endpoint = 'https://reportapi.dsquaredrx.com/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {
  loggedInUser!: LoginResponse;
  dummylogin: UserLogin;

  constructor(private http: HttpClient, private router: Router,private cookieService:CookieService,private EncrDecr: EncrDecrService) {
    this.dummylogin = { username: "demo@indydutch.com", password: "letmein" };
    
      this.load();
  }
  async load() {
    
   
   const config$ =  this.http.get('/assets/config.json');
   const appConfig:any = await lastValueFrom(config$);
   endpoint = appConfig?.['/api']?.target;
 
  } 
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getUser(){
    return JSON.parse(localStorage.getItem('user')!) as LoginResponse;
  }

  async getReport(id: string,chartTypeId:any, paramsobj:any) {
    let resp:any;
    if (!this.CheckAuth()) {
      return resp;
    }
    try {
      let paramlist = (paramsobj as Array<any>).map(x => "'" + x.value + "'");
      let parameters:any = [];
      paramsobj.forEach(element => {
        parameters.push({ 'name': element["name"], 'value': element["value"] });
      });
      //let parameters = {'value':paramlist.join()};
      //console.log(params);
      let body = { 'reportId': parseInt(id, 10),'chartTypeId':parseInt(chartTypeId,10), parameters };
      resp = await lastValueFrom( this.http.post(endpoint + 'report/', JSON.stringify(body), {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.loggedInUser.accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      }));
     
    }
    catch (e) {
      if (e.status === 401) {
        this.router.navigate(['/login']);
      }
    }
    return resp;
    //.pipe(
    //map(this.extractData));
  }
  CheckAuth() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!) as LoginResponse;
    let checkval: Boolean = true;
    if (!this.loggedInUser) {
      checkval = false
    }
    else if (!this.loggedInUser.accessToken) {
      checkval = false;
    }

    if (!checkval) {
      this.router.navigate(['/login']);
    }
    return checkval;

  }

  CheckAdmin() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!) as LoginResponse;
    let checkval: Boolean = true;
    if (!this.loggedInUser) {
      checkval = false
    }
    else if (!this.loggedInUser.accessToken) {
      checkval = false;
    }
    else if (this.loggedInUser.user.typeId !== 1){
      checkval = false;
    }

    if (!checkval) {
      this.router.navigate(['/login']);
    }
    return checkval;

  }

  async getUsersByUserGroup(groupid:number){
    let resp:any;
    if (!this.CheckAdmin()) {
      return resp;
    }

    try {
      resp =  await lastValueFrom(
        await this.http.get(endpoint + 'user',
        {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.loggedInUser.accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        }));
        
      return resp;
    }
    catch (e) {
      if (e.status === 401) {
        this.router.navigate(['/login']);
      }
    }

  }

  async getReportsByUserGroup(groupid:number){
    let resp:any;
    if (!this.CheckAdmin()) {
      return resp;
    }

    try {

       resp = await lastValueFrom(await this.http.get(endpoint + 'report?UserGroupId='+groupid,
        {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.loggedInUser.accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        }));

      return resp;
    }
    catch (e) {
      if (e.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  }

  async getUserGroups():Promise<Array<Usergroup>>{
    let resp:any;
    if (!this.CheckAdmin()) {
      return resp;
    }

    try {

       resp = lastValueFrom(await this.http.get(endpoint + 'user/group/',
        {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.loggedInUser.accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        }));

      return resp as Array<Usergroup>;
    }
    catch (e) {
      if (e.status === 401) {
        this.router.navigate(['/login']);
      }
    }
    return resp;
  }


  async getParameters(id) {
   
    return lastValueFrom(this.http.get(endpoint + 'reportParameters/' + id));
  }

  async getReportName(id) {
    let resp ;
    if (!this.CheckAuth()) {
      return resp;
    }


    try {

       resp = lastValueFrom(await this.http.get(endpoint + 'report/' + id,
        {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.loggedInUser.accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        }));
          
     
    }
    catch (e) {
      if (e.status === 401) {
        this.router.navigate(['/login']);
      }
    }
    return resp;
  }

  async getReportColumns(id) {
    return this.http.get(endpoint + 'columns/' + id).toPromise();
  }

  async login(data: UserLogin,rememberMe:boolean) {
    try {
      let params = { username: data.username, password: data.password }
      let headers = new HttpHeaders();
      headers.append("content-type", "application/x-www-form-urlencoded");
      let options = { headers: headers };
      let resp = await this.http.post(endpoint + 'authorization/login', params, options).toPromise();
      this.loggedInUser = (await resp) as LoginResponse;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      if(rememberMe){
        let json = JSON.stringify(data);
        var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', json);
        this.cookieService.set('user',encrypted,14);
      }
      this.router.navigate(['/dashboard']);

    }
    catch (e) {
      console.log(e);
    }
  }

  getReportBands(id): any {
    return this.http.get(endpoint + 'bands/' + id).pipe(
      map(this.extractData));
  }

  async getAllReports() {
    let resp:any;
    if (!this.CheckAuth()) {
      return resp;
    }
    try {
       resp = lastValueFrom(await this.http.get(endpoint + 'report', {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.loggedInUser.accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      }));
      return resp;
    }
    catch (e) {
      if (e.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

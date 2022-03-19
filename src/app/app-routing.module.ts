import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';

import { LandingpageComponent } from './landingpage/landingpage.component';
import { ChartreportsComponent } from './chartreports/chartreports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PiechartreportsComponent } from './piechartreports/piechartreports.component';
import { LoginComponent } from './login/login.component';
import { SitelayoutComponent } from './sitelayout/sitelayout.component';
import { VisualComponent } from './visual/visual.component';
//import { CreateComponent } from './usergroup/create/create.component';
import { ListComponent } from './usergroup/list/list.component';
import { EditComponent } from './usergroup/edit/edit.component';

const routes: Routes = [

  {
    path: '',
        component: SitelayoutComponent, 
        children: [
          { path: '', component: LandingpageComponent, pathMatch: 'full'},
          { 
            path: 'reports',  
            component: ReportsComponent 
          },
          { 
            path: 'chartreports',  
            component: ChartreportsComponent 
          },
          { 
            path: 'piechartreports',  
            component: PiechartreportsComponent 
          },
          { 
            path: 'dashboard',  
            component: DashboardComponent 
          },
          { 
            path: 'salesdashboard',  
            component: DashboardComponent 
          },
          { 
            path: 'visual',  
            component: VisualComponent 
          },
          {
            path:'usergroup',
            component:ListComponent
          },
          {
            path:'usergroup/:id',
            component:EditComponent
          },
        ]
  },
  
  { 
    path: 'login',  
    component: LoginComponent 
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

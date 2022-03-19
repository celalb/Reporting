import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule,DxCheckBoxModule, DxDataGridModule, DxTemplateModule, DxBulletModule, DxSlideOutComponent, DxSlideOutModule, DxSwitchModule, DxToolbarModule, DxDrawerModule, DxListModule, DxTextBoxModule, DxTextBoxComponent, DxButtonComponent, DxDateBoxModule, DxDateBoxComponent, DxLoadIndicatorModule, DxLoadPanelModule, DxChartComponent, DxChartModule, DxResponsiveBoxModule, DxPieChartComponent, DxPieChartModule, DxDropDownBoxModule, DxTreeListModule, DxTreeViewModule, DxPopupModule, DxDropDownButtonModule, DxNumberBoxModule, DxTemplateHost, DxSelectBoxModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DxiSeriesModule } from 'devextreme-angular/ui/nested/series-dxi';
import { DxiRowModule } from 'devextreme-angular/ui/nested/row-dxi';
import { DxiColModule } from 'devextreme-angular/ui/nested/col-dxi';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardIndicatorComponent } from './card-indicator/card-indicator.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { DxtextwithlabelComponent } from './dxtextwithlabel/dxtextwithlabel.component';
import { DxdropdownwithlabelComponent } from './dxdropdownwithlabel/dxdropdownwithlabel.component';
import { DxdatewithlabelComponent } from './dxdatewithlabel/dxdatewithlabel.component';

@NgModule({
  declarations: [						
    AppComponent,
      CardIndicatorComponent,
      LoginComponent,
      ReportsComponent,
      DxtextwithlabelComponent,
      DxdropdownwithlabelComponent,
      DxdatewithlabelComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxSlideOutModule,
    DxToolbarModule,
    DxSwitchModule,
    RouterModule,
    DxDrawerModule,
    DxListModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxLoadIndicatorModule,
    DxLoadPanelModule,
    HttpClientModule,
    DxChartModule,
    DxiSeriesModule,
    DxiRowModule,
    DxiColModule,
    DxResponsiveBoxModule,
    DxPieChartModule,
    FormsModule,
    DxDropDownBoxModule,
    DxTreeViewModule,
    DxPopupModule,
    DxDropDownButtonModule,
    DxNumberBoxModule,
    DxSelectBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,  AfterViewInit, ComponentRef, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DxDataGridComponent, DxButtonComponent, DxDrawerComponent,  DxLoadPanelComponent } from 'devextreme-angular';

import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import config from 'devextreme/core/config';
import { DatePipe } from '@angular/common';

import { DxtextwithlabelComponent } from '../dxtextwithlabel/dxtextwithlabel.component';
import { DxdatewithlabelComponent } from '../dxdatewithlabel/dxdatewithlabel.component';

import { DxdropdownwithlabelComponent } from '../dxdropdownwithlabel/dxdropdownwithlabel.component';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

class Band {
  name: string;
  collapsed: boolean;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @Input() reportid: number;
  @Input() fromdashboard: boolean = false;


  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;
  // @ViewChild('filterContainer', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  @ViewChild(DxLoadPanelComponent, { static: false }) loadpanel: DxLoadPanelComponent;
  @ViewChild(DxButtonComponent, { static: false }) fetchbutton: DxButtonComponent;
  viewContainerRef: any;
  paramDivHeight: any;
  @ViewChild('filterContainer', { read: ViewContainerRef, static: false }) set filterContent(element) {
    if (element) {
      this.viewContainerRef = element;
    }
  }
  @ViewChild('paramdiv', { static: false }) paramdiv: ElementRef;
  @ViewChild('collapsediv', { static: false }) collapsediv: ElementRef;

  @ViewChild('paramitem', { static: false }) paramitem: DxiItemComponent;
  @ViewChild('buttonitem', { static: false }) buttonitem: DxiItemComponent;



  lastClickTime = undefined;
  lastClickKey = undefined;
  hasparams: boolean = true;
  componentRef: any;
  totalCount: number = 0;
  ReportName: any;
  // reportid: number;
  rootViewContainer: any;
  loadingVisible: boolean = false;
  expandFlag: boolean = true;
  parameterValues: any;
  popupVisible: boolean;
  paramsvisible: boolean;
  constructor(public rest: RestService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.reportid = params['reportid'];
      this.parameterValues = params['parameters'];
    });

    this.paramsvisible = true;
    config({
      forceIsoDateParsing: true
      // ...
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      onClick: () => this.drawer.instance.toggle()
    }
  }];
  elementAttr: any;
  currentFilter: any;
  menuVisible: boolean;
  showFilterRow: boolean;
  showHeaderFilter: boolean = true;
  parameters: any = [];
  datasource: any = [];
  columns: any = [];
  bands: [string, boolean][] = [];
  bandlist = new Array<Band>();

  title = 'report';
  collapsed = false;
  async ngAfterViewInit(): Promise<void> {
    this.paramDivHeight = this.paramdiv.nativeElement.offsetHeight;
    await this.getReportName(this.reportid);
    // await this.getParameters(this.reportid);
    if (this.parameters.length === 0) {
      this.hasparams = false;
      // this.fetchbutton.visible = false;
      this.getReport(this.reportid);
    } else {

    }

  }
  ngOnInit() {
    this.showFilterRow = true;
    this.showHeaderFilter = true;

  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }
  addDynamicComponent(element: any) {
    if (element.type === 'date') {
      const factory = this.componentFactoryResolver.resolveComponentFactory(DxdatewithlabelComponent);
      const component = factory.create(this.rootViewContainer.parentInjector);
      component.instance.placeholder = element.name;
      component.instance.label = element.label;
      component.instance.value = element.value;
      component.instance.valueChange.subscribe(val => element.value = this.datePipe.transform(val, 'yyyy-MM-dd'));
      this.rootViewContainer.insert(component.hostView);
    } else if (element.type === 'dropdown') {
      const factory = this.componentFactoryResolver.resolveComponentFactory(DxdropdownwithlabelComponent);
      const component = factory.create(this.rootViewContainer.parentInjector);
      component.instance.placeholder = element.name;
      component.instance.label = element.label;
      component.instance.value = element.value;
      component.instance.paramSource = [{ id: 1, name: 'param1' }, { id: 2, name: 'param2' }]; // element.dataSource;
      component.instance.valueChange.subscribe(val => element.value = val);
      this.rootViewContainer.insert(component.hostView);
    } else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(DxtextwithlabelComponent);
      const component = factory.create(this.rootViewContainer.parentInjector);
      component.instance.placeholder = element.name;
      component.instance.value = element.value;
      component.instance.label = element.label;
      component.instance.valueChange.subscribe(val => element.value = val);
      this.rootViewContainer.insert(component.hostView);
    }
  }

  expandParams() {
    this.paramsvisible = true;
    this.paramdiv.nativeElement.style = 'display:block';
    this.collapsediv.nativeElement.style = 'display:none';
  }

  collapseParams() {
    this.paramsvisible = false;

    this.paramdiv.nativeElement.style = 'display:none';
    this.collapsediv.nativeElement.style = 'display:block';
  }

  getParamSummary() {
    return this.parameters.map(x => x.name + ': ' + x.value).join(', ');
  }

  async buttonClicked() {
    this.loadpanel.visible = true;
    await this.getReport(this.reportid);
    // this.dataGrid.focusedRowEnabled = true;
    // this.dataGrid.focusedRowIndex = 1;
    this.collapseParams();

    this.loadpanel.visible = false;
    // this.dataGrid.instance.columnOption(5,"format","currency");
    // this.dataGrid.instance.refresh(true);
  }
  async getReportName(id) {
    const data: any = await this.rest.getReportName(id);
    this.ReportName = data.name;
    this.parameters = data.parameters;
    if (this.parameters.length > 0) {
      if (this.parameterValues) {
        const parameterArray = this.parameterValues.split('-');
        const count = parameterArray.length;
        for (let i = 0; i < count; i++) {
          this.parameters[i].value = parameterArray[i];
        }
      }
      this.parameters.forEach(param => {
        this.setRootViewContainerRef(this.viewContainerRef);
        this.addDynamicComponent(param);

      });
    } else {
      this.parameters = [];
    }
    this.columns = data.columns;
    if (this.parameterValues) {
      await this.buttonClicked();
    }
  }
  async getParameters(id) {
    this.parameters = await this.rest.getParameters(id);
    if (this.parameters.length > 0) {
      this.parameters.forEach(element => {
        this.setRootViewContainerRef(this.viewContainerRef);
        this.addDynamicComponent(element);

      });
    } else {
      this.parameters = [];
    }
  }
  async getReport(id) {


    // this.columns = [];
    this.bands = [];
    // this.columns=await this.rest.getReportColumns(id);


    this.datasource = [];

    this.dataGrid.columns = [];
    this.datasource = await this.rest.getReport(id, 1, this.parameters);
    this.totalCount = this.datasource.length;
    // .subscribe((data: {}) => {

    // this.datasource = data;//(data as Array<any>);

    const columnsByBands = this.columns.reduce((ubc, u) => ({
      ...ubc,
      [u.OwnerBand]: [...(ubc[u.OwnerBand] || []), u],
    }), {});
    // Object.keys(columnsByBands).forEach(element => {
    //   columnsByBands[element];
    // });

    const fieldsarray = Object.getOwnPropertyNames(this.datasource[0]);
    let count = 0;
    // this.dataGrid.columns=[];

    if (this.dataGrid.instance.columnCount() === 0) {
      fieldsarray.forEach(fldElement => {
        let columnName = '';
        let columnLabel = '';
        if (fldElement.includes('^^')) {
          columnName = fldElement.split('^^')[0];
          columnLabel = fldElement.split('^^')[1];
        } else {
          columnName = fldElement;
          columnLabel = fldElement;
        }
        let done = false;
        const obj: any = { caption: columnLabel };
        if (this.columns.some(x => x.name === columnName)) {
          const colobj = this.columns.filter(x => x.name === columnName)[0];
          Object.keys(columnsByBands).forEach(element2 => {

            let columnName2 = '';
            let columnLabel2 = '';
            if (element2.includes('^^')) {
              columnName2 = element2.split('^^')[0];
              columnLabel2 = element2.split('^^')[1];
            } else {
              columnName2 = element2;
              columnLabel2 = element2;
            }


            if (columnName2 === colobj.OwnerBand) {
              if (!this.bandlist.some(x => x.name === columnName2)) {
                obj.caption = columnLabel2;
                obj.columns = [];
                columnsByBands[element2].forEach(element3 => {
                  let columnName3 = '';
                  let columnLabel3 = '';
                  if (element3.includes('^^')) {
                    columnName3 = element3.split('^^')[0];
                    columnLabel3 = element3.split('^^')[1];
                  } else {
                    columnName3 = element3;
                    columnLabel3 = element3;
                  }
                  let subobj: any;
                  subobj = { dataField: element3, caption: columnLabel3 };
                  subobj.format = { type: element3.formatType, precision: element3.precision, allowFixing: true };
                  if (element3.dataType) {
                    subobj.dataType = element3.DataType;
                    if (element3.DataType === 'numeric') {
                      subobj.alignment = 'right';
                    }
                  }
                  if (element3.ColumnType === 2) {
                    subobj.visible = false;
                    subobj.calculateCellValue = function(e: any) {
                      let ret = '';
                      const formula: string = (element3.formula as string).replace(/\[/gi, 'e["').replace(/\]/gi, '"]');
                      ret = 'return ' + formula + ' ;';
                      const calc = Function('e', ret);
                      return calc(e);
                      // return (element3.Formula as string).replace(/\[/gi,"e[\"").
                      // replace(/\]/gi,"\"]");//e["Q1-qty"]+e["Q2-qty"]+e["Q3-qty"]+e["Q4-qty"]
                    };
                  }
                  subobj.allowFiltering = element3.hasFilter || element3.hasSearch;
                  subobj.allowSearching = element3.hasSearch;
                  obj.columns.push(subobj);
                });
                this.dataGrid.instance.addColumn(obj);

                done = true;
                const currband: Band = new Band();
                currband.collapsed = false;
                currband.name = columnName2;
                this.bandlist.push(currband);
              } else {
                done = true;
              }
            }

          });
          if (!done) {
            obj.dataField = fldElement;
            if (colobj.label) {
              obj.caption = colobj.label;
            } else {
              obj.caption = columnLabel;
            }
            obj.format = { type: colobj.formatType, precision: colobj.precision, allowFixing: true };
            if (colobj.dataType) {
              
              obj.dataType = colobj.dataType;
              if (colobj.dataType === 'numeric') {
                obj.alignment = 'right';
              }
            }
            obj.allowFiltering = colobj.hasFilter || colobj.hasSearch;
            obj.allowSearching = colobj.hasSearch;
          }

        } else {
          obj.allowFiltering = false;
          obj.allowSearching = false;
          obj.dataField = fldElement;
        }

        if (!done) {
          try {
            this.dataGrid.instance.addColumn(obj);
            this.dataGrid.instance.endUpdate();
          } catch (e) {
            console.log(e);
          }
        }
        count++;
      });
    }
    // });


  }

  async onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        visible: !this.fromdashboard,
        options: {
          icon: 'menu',
          onClick: this.showSettings.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        visible: !this.fromdashboard,
        options: {
          icon: 'collapse',
          onClick: this.expandcollapsegrid.bind(this)
        }
      }
    );
  }

  async refreshDataGrid() {
    await this.getReport(this.reportid);
  }

  showSettings() {
    this.popupVisible = true;
  }

  expandcollapsegrid() {
    this.expandFlag = !this.expandFlag;
  }

  onRowClick = (e) => {
    if (e.column.isBand === true) {
      const bandcolumn = this.bandlist.filter(x => x.name === e.column.caption);
      if (bandcolumn.length > 0) {
        e.column.added.columns.forEach(element => {
          const visible = this.dataGrid.instance.columnOption(element.caption, 'visible');
          this.dataGrid.instance.columnOption(element.caption, 'visible', !visible);
          // element.visible = bandcolumn[0].collapsed;
        });
        bandcolumn[0].collapsed = !bandcolumn[0].collapsed;
      }
    }

  }

  contentReady = (e) => {

    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }


    this.dataGrid.summary.groupItems = [];
    this.dataGrid.instance.getVisibleColumns().forEach(col => {

      if (col.dataField) {
        if (this.dataGrid.instance.columnOption(col.dataField).dataType === 'number') {

          // console.log(element.dataField+element.format);


          if (this.columns.some(x => x.name === col.dataField)) {
            const colobj = this.columns.filter(x => x.name === col.dataField)[0];

            if (colobj.summaryType) {

              const obj: any = { column: col.dataField,
                showInGroupFooter: false,
                alignByColumn: true, summaryType:
                colobj.summaryType };
              obj.valueFormat = colobj.formatType; // { type: colobj.FormatType, precision: colobj.Precision };
              this.dataGrid.summary.groupItems.push(obj);
            }
          }
        }
      }
    });

  }
  onShown() {

  }

}

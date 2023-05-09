import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, shareReplay } from 'rxjs';
import { BaseService } from 'src/app/base.service';
import { ChartsService } from 'src/app/charts.service';
import { Employee, EmployeesResponse } from 'src/app/interfaces/employee';
import { EmployeeDetailBottomsheetComponent } from '../employee-detail-bottomsheet/employee-detail-bottomsheet.component';
import { EmployeeDetailDialogComponent } from '../employee-detail-dialog/employee-detail-dialog.component';

declare let google: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  @ViewChild('chart_div') chartDiv: ElementRef | undefined

  employees: EmployeesResponse | undefined

  table: any
  table_data: any
  error: string | undefined;

  constructor(private breakpointObserver: BreakpointObserver, private bottomSheet: MatBottomSheet, private dialog: MatDialog, private charts: ChartsService, private http: HttpClient, private base: BaseService) {
    this.get_employees()
    if (this.charts.loaded) {
      let interval = setInterval(() => {
        if (this.chartDiv) {
          clearInterval(interval)
          this.drawChart()
        }
      }, 500, [this])
    } else {
      this.charts.changed.subscribe(() => {
        let interval = setInterval(() => {
          if (this.chartDiv) {
            clearInterval(interval)
            this.drawChart()
          }
        }, 500, [this])
      })
    }
  }

  drawChart() {
    let interval = setInterval(() => {
      if (this.employees) {
        clearInterval(interval)
        this.table_data = new google.visualization.DataTable();
        this.table_data.addColumn('string', 'Id');
        this.table_data.addColumn('string', 'Name');
        this.table_data.addColumn('date', 'Date of Joining');
        let data_rows = this.employees.data.map((employee: Employee) => {
          return [
            employee.id,
            employee.name.toUpperCase(),
            new Date(employee.created_at),
          ]
        })
        this.table_data.addRows(data_rows);

        this.table = new google.visualization.Table(this.chartDiv?.nativeElement);

        this.table.draw(this.table_data, { showRowNumber: true, width: '100%', height: '100%' });
        google.visualization.events.addListener(this.table, 'select', this.tableSelectionHandler.bind(this));
      }
    }, 500, [this])
  }

  back() {
    history.back()
  }

  tableSelectionHandler() {
    this.table.getSelection().forEach((selection: any) => {
      if (selection.row != null && selection.column != null) {
        this.showEmployeeDetail(this.table_data.getFormattedValue(selection.row, selection.column))
        console.log(this.table_data.getFormattedValue(selection.row, selection.column));
      } else if (selection.row != null) {
        this.showEmployeeDetail(this.table_data.getFormattedValue(selection.row, 0))
        console.log(this.table_data.getFormattedValue(selection.row, 0));
      } else if (selection.column != null) {
        this.showEmployeeDetail(this.table_data.getFormattedValue(0, selection.column))
        console.log(this.table_data.getFormattedValue(0, selection.column));
      }
    });
  }

  dialogRef: MatDialogRef<EmployeeDetailDialogComponent> | undefined
  bottomsheetRef: MatBottomSheetRef<EmployeeDetailBottomsheetComponent> | undefined

  showEmployeeDetail(employee_id: string) {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      this.bottomsheetRef = this.bottomSheet.open(EmployeeDetailBottomsheetComponent, {
        data: employee_id,
      })
    } else {
      this.dialogRef = this.dialog.open(EmployeeDetailDialogComponent, {
        maxWidth: '800px',
        width: '100%',
        data: employee_id,
        minHeight: '200px'
      })
    }
  }

  get_employees() {
    this.http.get(this.base.base_uri_api + 'hr/employees', { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.employees = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}

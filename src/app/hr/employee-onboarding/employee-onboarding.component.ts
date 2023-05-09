import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { ChartsService } from 'src/app/charts.service';
import { EmployeeOnboarbing, EmployeeOnboarbingsResponse } from 'src/app/interfaces/employeeinvite';
import { UiModeService } from 'src/app/ui-mode.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

declare let google: any;

@Component({
  selector: 'app-employee-onboarding',
  templateUrl: './employee-onboarding.component.html',
  styleUrls: ['./employee-onboarding.component.scss']
})
export class EmployeeOnboardingComponent {

  employeeOnboarbing: EmployeeOnboarbingsResponse | undefined

  table: any
  error: string | undefined;

  constructor(public uiMode: UiModeService, private charts: ChartsService, private dialog: MatDialog, private snack: MatSnackBar, private http: HttpClient, private base: BaseService) {
    this.get_employee_onboardings()
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
      if (this.employeeOnboarbing) {
        clearInterval(interval)
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('date', 'Created At');
        data.addColumn('date', 'Date of Joining');
        data.addColumn('boolean', 'Notify');
        data.addColumn('boolean', 'Aborted');
        let data_rows = this.employeeOnboarbing.data.map((employeeOnboarding: EmployeeOnboarbing) => {
          return [
            { v: employeeOnboarding.id, f: employeeOnboarding.name.toUpperCase() },
            new Date(employeeOnboarding.created_at),
            new Date(employeeOnboarding.date_of_joining),
            employeeOnboarding.notify,
            employeeOnboarding.aborted,
          ]
        })
        data.addRows(data_rows);

        this.table = new google.visualization.Table(this.chartDiv?.nativeElement);

        this.table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
        google.visualization.events.addListener(this.table, 'select', this.tableSelectionHandler.bind(this));
      }
    }, 500, [this])
  }

  tableSelectionHandler() {
    // console.log(this.table.getSelection());
  }

  new_employee_onboarding_type() {
    this.dialog.open(AddEmployeeComponent, {
      hasBackdrop: false,
      height: 'fit-content',
      width: '25%',
      position: {
        // top: '0',
        bottom: '16px',
        right: '16px'
      },
      // panelClass: 'mdc-container'
    })
  }

  back() {
    history.back()
  }

  get_employee_onboardings() {
    this.http.get(this.base.base_uri_api + 'hr/employee-onboarding', { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.employeeOnboarbing = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })
  }

  @ViewChild('chart_div') chartDiv: ElementRef | undefined
}

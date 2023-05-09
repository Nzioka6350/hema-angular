import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { EmployeeOnboarbingsResponse } from 'src/app/interfaces/employeeinvite';
import { NewLeaveTypeComponent } from 'src/app/new-leave-type/new-leave-type.component';

@Component({
  selector: 'app-new-employee-onboarding',
  templateUrl: './new-employee-onboarding.component.html',
  styleUrls: ['./new-employee-onboarding.component.scss']
})
export class NewEmployeeOnboardingComponent {

  submit() {
    if (this.leaveTypeAdd.valid) {
      this.leaveTypeAdd.disable()
      this.load = true
      let formData = new FormData()
      formData.append('name', this.leaveTypeAdd.controls.name.value)
      formData.append('description', this.leaveTypeAdd.controls.description.value)
      formData.append('max_allocation', this.leaveTypeAdd.controls.max_allocation.value)
      formData.append('applicable_after', this.leaveTypeAdd.controls.applicable_after.value)
      formData.append('is_without_pay', this.leaveTypeAdd.controls.is_without_pay.value ? '1' : '0')
      formData.append('allow_over_allocation', this.leaveTypeAdd.controls.allow_over_allocation.value ? '1' : '0')
      formData.append('includes_holidays', this.leaveTypeAdd.controls.includes_holidays.value ? '1' : '0')
      this.http.post(this.base.base_uri_api + 'leave-types', formData, { observe: 'response', withCredentials: true }).subscribe(
        {
          next: (response: HttpResponse<any>) => {
            if (response.ok) {
              this.dialogRef.afterClosed().subscribe(() => {
                this.snack.open('Leave Type added', '', { duration: 5000 })
              })
              this.dialogRef.close()
            }
          }, error: (errorResponse: HttpErrorResponse) => {
            this.leaveTypeAdd.enable()
            this.load = false
            switch (errorResponse.status) {
              case 422:
                if (errorResponse.error['errors']) {
                  if (errorResponse.error['errors'].name) {
                    this.leaveTypeAdd.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
                  }
                }
                if (errorResponse.error['errors']) {
                  if (errorResponse.error['errors'].description) {
                    this.leaveTypeAdd.controls.description.setErrors({ backend: errorResponse.error['errors'].description })
                  }
                }
                if (errorResponse.error['errors']) {
                  if (errorResponse.error['errors'].max_allocation) {
                    this.leaveTypeAdd.controls.max_allocation.setErrors({ backend: errorResponse.error['errors'].max_allocation })
                  }
                }
                if (errorResponse.error['errors']) {
                  if (errorResponse.error['errors'].applicable_after) {
                    this.leaveTypeAdd.controls.applicable_after.setErrors({ backend: errorResponse.error['errors'].applicable_after })
                  }
                }
                break;

              default:
                break;
            }

          }, complete: () => {
            this.leaveTypeAdd.enable()
            this.load = false
          }
        }
      )
    }
  }
  load = false

  constructor(private dialogRef: MatDialogRef<NewLeaveTypeComponent>, private snack: MatSnackBar, private http: HttpClient, private base: BaseService) { }

  leaveTypeAdd = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    max_allocation: new FormControl(),
    applicable_after: new FormControl(),
    is_without_pay: new FormControl(false),
    allow_over_allocation: new FormControl(false),
    includes_holidays: new FormControl(false),
  });
}

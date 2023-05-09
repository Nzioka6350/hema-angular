import { HttpParams, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { UsersResponse } from 'src/app/interfaces/user';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  
  users: UsersResponse | undefined

  get_users() {
    this.http.get(this.base.base_uri_api + 'users', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', -1) }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.users = response.body
        }
      }
    })
  }

  submit() {
    if (this.newEmployee.valid) {
      this.newEmployee.disable()
      this.load = true
      let formData = new FormData()
      formData.append('name', `${this.newEmployee.controls.name.value}`)
      formData.append('user_id', `${this.newEmployee.controls.user_id.value}`)
      formData.append('notify', this.newEmployee.controls.notify.value ? '1' : '0')
      formData.append('date_of_joining', `${this.newEmployee.controls.date_of_joining.value ? new Date(this.newEmployee.controls.date_of_joining.value).toISOString() : ''}`)
      this.http.post(this.base.base_uri_api + 'hr/employee-onboarding', formData, { observe: 'response', withCredentials: true }).subscribe(
        {
          next: (response: HttpResponse<any>) => {
            if (response.ok) {
              this.dialogRef.afterClosed().subscribe(() => {
                this.snack.open('Employe Onboarding initiated', '', { duration: 5000 })
              })
              this.dialogRef.close()
            }
          }, error: (errorResponse: HttpErrorResponse) => {
            this.newEmployee.enable()
            this.load = false
            switch (errorResponse.status) {
              case 422:
                if (errorResponse.error['errors']) {
                  if (errorResponse.error['errors'].name) {
                    this.newEmployee.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
                  }
                }
                if (errorResponse.error['errors']) {
                  if (errorResponse.error['errors'].notify) {
                    this.newEmployee.controls.notify.setErrors({ backend: errorResponse.error['errors'].notify })
                  }
                }
                if (errorResponse.error['errors']) {
                  if (errorResponse.error['errors'].date_of_joining) {
                    this.newEmployee.controls.date_of_joining.setErrors({ backend: errorResponse.error['errors'].date_of_joining })
                  }
                }
                if (errorResponse.error['errors']) {
                  if (errorResponse.error['errors'].user_id) {
                    this.newEmployee.controls.user_id.setErrors({ backend: errorResponse.error['errors'].user_id })
                  }
                }
                break;

              default:
                break;
            }

          }, complete: () => {
            this.newEmployee.enable()
            this.load = false
          }
        }
      )
    }
  }

  load = false

  newEmployee = new FormGroup({
    name: new FormControl(''),
    user_id: new FormControl(''),
    notify: new FormControl(true),
    date_of_joining: new FormControl(new Date()),
  })

  constructor(private dialogRef: MatDialogRef<AddEmployeeComponent>, private snack: MatSnackBar, private http: HttpClient, private base: BaseService) {
    this.get_users()
  }
}

import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';

@Component({
  selector: 'app-add-grades',
  templateUrl: './add-grades.component.html',
  styleUrls: ['./add-grades.component.scss']
})
export class AddGradesComponent {


  newGradeFormGroup = new FormGroup({
    name: new FormControl(''),
  })

  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient) { }

  submit() {
    this.newGradeFormGroup.disable()
    this.http.post(this.base.base_uri_api + 'manufacturing/coffee-grades', this.newGradeFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newGradeFormGroup.enable()
          this.snack.open(`Coffee Grade ${this.newGradeFormGroup.controls.name.value} succefully added!`, '', { duration: 3000 })
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newGradeFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].name) {
                this.newGradeFormGroup.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
              }
            }
        }
      }, complete: () => {
        this.newGradeFormGroup.enable()
      }
    })
  }
}

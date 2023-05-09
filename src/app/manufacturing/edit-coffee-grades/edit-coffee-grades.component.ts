import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { CoffeeGrade, CoffeeGradesResponse } from 'src/app/interfaces/coffeegrade';

@Component({
  selector: 'app-edit-coffee-grades',
  templateUrl: './edit-coffee-grades.component.html',
  styleUrls: ['./edit-coffee-grades.component.scss']
})
export class EditCoffeeGradesComponent {

  gradeFormGroup = new FormGroup({
    name: new FormControl(''),
  })
  coffeeGrades: CoffeeGradesResponse | undefined | null;

  constructor(@Inject(MAT_DIALOG_DATA) private coffeeGradePassed: CoffeeGrade, private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.gradeFormGroup.controls.name.setValue(this.coffeeGradePassed.name)
  }

  submit() {
    this.gradeFormGroup.disable()
    this.http.patch(this.base.base_uri_api + `manufacturing/coffee-grades/${this.coffeeGradePassed.id}`, this.gradeFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.gradeFormGroup.enable()
          this.snack.open(`Coffee type ${this.gradeFormGroup.controls.name.value} edited!`, '', { duration: 3000 })
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.gradeFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].name) {
                this.gradeFormGroup.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
              }
            }
        }
      }, complete: () => {
        this.gradeFormGroup.enable()
      }
    })
  }
}


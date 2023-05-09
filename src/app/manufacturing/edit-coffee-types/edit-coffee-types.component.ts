import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { CoffeeGradesResponse } from 'src/app/interfaces/coffeegrade';
import { CoffeeType } from 'src/app/interfaces/coffeetype';

@Component({
  selector: 'app-edit-coffee-types',
  templateUrl: './edit-coffee-types.component.html',
  styleUrls: ['./edit-coffee-types.component.scss']
})
export class EditCoffeeTypesComponent {

  newTypeFormGroup = new FormGroup({
    name: new FormControl(''),
    coffee_grades: new FormControl(),
  })
  coffeeGrades: CoffeeGradesResponse | undefined | null;

  constructor(@Inject(MAT_DIALOG_DATA) private coffeeType: CoffeeType, private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.get_coffee_grades()
    this.newTypeFormGroup.controls.coffee_grades.setValue(this.coffeeType.grades.map(value => value.id))
    this.newTypeFormGroup.controls.name.setValue(this.coffeeType.name)
  }

  submit() {
    this.newTypeFormGroup.disable()
    this.http.patch(this.base.base_uri_api + `manufacturing/coffee-types/${this.coffeeType.id}`, this.newTypeFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newTypeFormGroup.enable()
          this.snack.open(`Coffee type ${this.newTypeFormGroup.controls.name.value} edited!`, '', { duration: 3000 })
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newTypeFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].name) {
                this.newTypeFormGroup.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
              }
            }
        }
      }, complete: () => {
        this.newTypeFormGroup.enable()
      }
    })
  }

  get_coffee_grades() {
    this.http.get(this.base.base_uri_api + 'manufacturing/coffee-grades', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', '-1') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.coffeeGrades = response.body
      }
    })
  }
}

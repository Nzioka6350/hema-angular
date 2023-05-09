import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { CoffeeGradesResponse } from 'src/app/interfaces/coffeegrade';

@Component({
  selector: 'app-add-types',
  templateUrl: './add-types.component.html',
  styleUrls: ['./add-types.component.scss']
})
export class AddTypesComponent {

  newTypeFormGroup = new FormGroup({
    name: new FormControl(''),
    coffee_grades: new FormControl(''),
  })
  
  coffeeGrades: CoffeeGradesResponse | undefined | null;

  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.get_coffee_grades()
  }

  submit() {
    this.newTypeFormGroup.disable()
    this.http.post(this.base.base_uri_api + 'manufacturing/coffee-types', this.newTypeFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newTypeFormGroup.enable()
          this.snack.open(`Coffee type ${this.newTypeFormGroup.controls.name.value} succefully added!`, '', { duration: 3000 })
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

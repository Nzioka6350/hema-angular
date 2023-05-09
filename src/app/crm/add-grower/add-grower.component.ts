import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';

@Component({
  selector: 'app-add-grower',
  templateUrl: './add-grower.component.html',
  styleUrls: ['./add-grower.component.scss']
})
export class AddGrowerComponent {
  
  newGrowerFormGroup = new FormGroup({
    name: new FormControl(''),
    code: new FormControl(''),
  })

  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient) { }

  submit() {
    this.newGrowerFormGroup.disable()
    this.http.post(this.base.base_uri_api + 'crm/growers', this.newGrowerFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newGrowerFormGroup.enable()
          this.snack.open(`Grower ${this.newGrowerFormGroup.controls.name.value} succefully added!`, '', { duration: 3000 })
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newGrowerFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].name) {
                this.newGrowerFormGroup.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
              }
            }
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].code) {
                this.newGrowerFormGroup.controls.code.setErrors({ backend: errorResponse.error['errors'].code })
              }
            }
        }
      }, complete: () => {
        this.newGrowerFormGroup.enable()
      }
    })
  }
}

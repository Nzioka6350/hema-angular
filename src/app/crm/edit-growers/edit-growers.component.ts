import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { Grower } from 'src/app/interfaces/grower';

@Component({
  selector: 'app-edit-growers',
  templateUrl: './edit-growers.component.html',
  styleUrls: ['./edit-growers.component.scss']
})
export class EditGrowersComponent implements OnChanges {

  delete() {
    this.snack.open(`Confirm ${this.grower?.name} deletion?`, 'CONFIRM', { duration: 7000 }).onAction().subscribe(() => {
      this.http.delete(this.base.base_uri_api + `crm/growers/${this.grower?.id}`, { withCredentials: true, observe: 'response' }).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.snack.open(`Grower ${this.grower?.name} deleted!`, '', { duration: 3000 })
          }
        }, error: (errorResponse: HttpErrorResponse) => {
        }
      })
    })
  }

  @Input() grower: Grower | undefined

  newGrowerFormGroup = new FormGroup({
    name: new FormControl(''),
    code: new FormControl(''),
  })

  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.ngOnChanges.bind(this)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grower'].currentValue && this.grower) {
      this.newGrowerFormGroup.controls.name.setValue(this.grower.name)
      this.newGrowerFormGroup.controls.code.setValue(this.grower.code)
    }
  }

  submit() {
    this.newGrowerFormGroup.disable()
    this.http.post(this.base.base_uri_api + `crm/growers/${this.grower?.id}`, this.newGrowerFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newGrowerFormGroup.enable()
          this.snack.open(`Grower ${this.grower?.name} edited successfuly`, '', { duration: 3000 })
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

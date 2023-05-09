import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { CoffeeTypesResponse } from 'src/app/interfaces/coffeetype';
import { GrowersResponse } from 'src/app/interfaces/grower';
import { __values } from 'tslib';

@Component({
  selector: 'app-add-purchase-receipts',
  templateUrl: './add-purchase-receipts.component.html',
  styleUrls: ['./add-purchase-receipts.component.scss']
})
export class AddPurchaseReceiptsComponent {

  newPurchaseReceiptFormGroup = new FormGroup({
    coffee_types: new FormControl(''),
    grower_id: new FormControl(''),
    bags_in_outturn: new FormControl(''),
    bags_in_delivery: new FormControl(''),
    delivery_vehicle_no: new FormControl(''),
    store: new FormControl(''),
    floor: new FormControl(''),
    row: new FormControl(''),
    bay: new FormControl(''),
    bags_in: new FormControl(''),
  })

  coffeeTypes: CoffeeTypesResponse | undefined | null;
  growers: GrowersResponse | undefined | null;

  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.get_coffee_types()
    this.get_coffee_growers()
  }

  submit() {
    this.newPurchaseReceiptFormGroup.disable()
    this.http.post(this.base.base_uri_api + 'manufacturing/purchase-receipts', this.newPurchaseReceiptFormGroup.value, { withCredentials: true, observe: 'response'}).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newPurchaseReceiptFormGroup.enable()
          this.snack.open(`Purchase Receipt created`, '', { duration: 3000 })
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newPurchaseReceiptFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].coffee_types) {
                this.newPurchaseReceiptFormGroup.controls.coffee_types.setErrors({ backend: errorResponse.error['errors'].coffee_types })
              }
              if (errorResponse.error['errors'].grower) {
                this.newPurchaseReceiptFormGroup.controls.grower_id.setErrors({ backend: errorResponse.error['errors'].grower })
              }
              if (errorResponse.error['errors'].bags_in_outturn) {
                this.newPurchaseReceiptFormGroup.controls.bags_in_outturn.setErrors({ backend: errorResponse.error['errors'].bags_in_outturn })
              }
              if (errorResponse.error['errors'].bags_in_delivery) {
                this.newPurchaseReceiptFormGroup.controls.bags_in_delivery.setErrors({ backend: errorResponse.error['errors'].bags_in_delivery })
              }
              if (errorResponse.error['errors'].delivery_vehicle_no) {
                this.newPurchaseReceiptFormGroup.controls.delivery_vehicle_no.setErrors({ backend: errorResponse.error['errors'].delivery_vehicle_no })
              }
            }
        }
      }, complete: () => {
        this.newPurchaseReceiptFormGroup.enable()
      }
    })
  }

  get_coffee_types() {
    this.http.get(this.base.base_uri_api + 'manufacturing/coffee-types', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', '-1') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.coffeeTypes = response.body
      }
    })
  }

  get_coffee_growers() {
    this.http.get(this.base.base_uri_api + 'crm/growers', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', '-1') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.growers = response.body
      }
    })
  }
}

import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { CompanyProfileResponse } from 'src/app/interfaces/company_profile';
import { GrowersResponse } from 'src/app/interfaces/grower';
import { PurchaseRecieptsResponse } from 'src/app/interfaces/purchase_reciept';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  growers: GrowersResponse | undefined | null;
  companyProfile: CompanyProfileResponse | undefined | null;
  purchaseReceipt: PurchaseRecieptsResponse | undefined | null;


  @Output() registrationEmitter = new EventEmitter<any>();

  dataOne: string | undefined;
  dataTwo: number | undefined;

  // Define function to emit data to parent component
  emitData() {
    const data = {
      dataOne: this.dataOne,
      dataTwo: this.dataTwo
    };
    this.registrationEmitter.emit(data);
  }

  newRegistrationFormGroup = new FormGroup({
    name_of_miller: new FormControl(''),
    grower: new FormControl(''),
    license_no: new FormControl(''),
    physical_address: new FormControl(''),
    month: new FormControl(''),
    date_of_delivery: new FormControl(''),
    board_code: new FormControl(''),
    address: new FormControl(''),
    telephone: new FormControl(''),
    milling_date: new FormControl(''),
  })

  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.get_coffee_growers()
    this.get_companyProfile()
    this.get_purchaseReceipt()
   }




  get_purchaseReceipt() {
    this.http.get(this.base.base_uri_api + 'manufacturing/purchase_reciepts', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', '-1') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.purchaseReceipt = response.body
      }
    })
  }


  get_companyProfile() {
    this.http.get(this.base.base_uri_api + 'manufacturing/company_profile', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', '-1') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.companyProfile = response.body
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
  // submit() {
  //   this.newRegistrationFormGroup.disable()
  //   this.http.post(this.base.base_uri_api + 'manufacturing/coffee-grades', this.newRegistrationFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
  //     next: (response: HttpResponse<any>) => {
  //       if (response.ok) {
  //         this.newRegistrationFormGroup.enable()
  //         this.snack.open(`Coffee Grade ${this.newRegistrationFormGroup.controls.name.value} succefully added!`, '', { duration: 3000 })
  //       }
  //     }, error: (errorResponse: HttpErrorResponse) => {
  //       this.newRegistrationFormGroup.enable()
  //       switch (errorResponse.status) {
  //         case 422:
  //           if (errorResponse.error['errors']) {
  //             if (errorResponse.error['errors'].name) {
  //               this.newRegistrationFormGroup.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
  //             }
  //           }
  //       }
  //     }, complete: () => {
  //       this.newRegistrationFormGroup.enable()
  //     }
  //   })
  // }
}

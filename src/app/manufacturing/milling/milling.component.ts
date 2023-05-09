import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/base.service';
import { CompanyProfileResponse } from 'src/app/interfaces/company_profile';
import { GrowersResponse } from 'src/app/interfaces/grower';
import { PurchaseRecieptsResponse } from 'src/app/interfaces/purchase_reciept';

@Component({
  selector: 'app-milling',
  templateUrl: './milling.component.html',
  styleUrls: ['./milling.component.scss']
})
export class MillingComponent {


  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver, private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
      this.get_coffee_growers()
      this.get_companyProfile()
      this.get_purchaseReceipt()
  }

  growers: GrowersResponse | undefined | null;
  companyProfile: CompanyProfileResponse | undefined | null;
  purchaseReceipt: PurchaseRecieptsResponse | undefined | null;


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

  submitRegistration(){
    
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

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturingRoutingModule } from './manufacturing-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CofeeTypesComponent } from './cofee-types/cofee-types.component';
import { CofeeGradesComponent } from './cofee-grades/cofee-grades.component';
import { AddTypesComponent } from './add-types/add-types.component';
import { AddGradesComponent } from './add-grades/add-grades.component';
import { OverviewComponent } from './overview/overview.component';
import { EditCoffeeTypesComponent } from './edit-coffee-types/edit-coffee-types.component';
import { EditCoffeeGradesComponent } from './edit-coffee-grades/edit-coffee-grades.component';
import { MillingComponent } from './milling/milling.component';
import { PurchaseReceiptComponent } from './purchase-receipt/purchase-receipt.component';
import { AddPurchaseReceiptsComponent } from './add-purchase-receipts/add-purchase-receipts.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { ViewRegistrationComponent } from './view-registration/view-registration.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CofeeTypesComponent,
    CofeeGradesComponent,
    AddTypesComponent,
    AddGradesComponent,
    OverviewComponent,
    EditCoffeeTypesComponent,
    EditCoffeeGradesComponent,
    MillingComponent,
    PurchaseReceiptComponent,
    AddPurchaseReceiptsComponent,
    RegistrationComponent,
    AddRegistrationComponent,
    ViewRegistrationComponent
  ],
  imports: [
    CommonModule,
    ManufacturingRoutingModule,
    SharedModule
  ]
})
export class ManufacturingModule { }

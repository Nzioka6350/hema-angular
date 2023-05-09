import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

import { HrRoutingModule } from './hr-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { EmployeeOnboardingComponent } from './employee-onboarding/employee-onboarding.component';
import { NewEmployeeOnboardingComponent } from './new-employee-onboarding/new-employee-onboarding.component';
import { SharedModule } from '../shared/shared.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailDialogComponent } from './employee-detail-dialog/employee-detail-dialog.component';
import { EmployeeDetailBottomsheetComponent } from './employee-detail-bottomsheet/employee-detail-bottomsheet.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { HrContentComponent } from './hr-content/hr-content.component';
import { CasualComponent } from './casual/casual.component';


@NgModule({
  declarations: [
    EmployeeOnboardingComponent,
    NewEmployeeOnboardingComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    EmployeeDetailDialogComponent,
    EmployeeDetailBottomsheetComponent,
    EmployeeDetailComponent,
    HrContentComponent,
    CasualComponent,
  ],
  imports: [
    SharedModule,
    HrRoutingModule,
  ]
})
export class HrModule { }

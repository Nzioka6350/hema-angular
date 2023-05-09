import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { CrmDashboardComponent } from './crm-dashboard/crm-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AddGrowerComponent } from './add-grower/add-grower.component';
import { GrowersComponent } from './growers/growers.component';
import { AddGrowerBottomsheetComponent } from './add-grower-bottomsheet/add-grower-bottomsheet.component';
import { EditGrowersComponent } from './edit-growers/edit-growers.component';
import { AddGrowerDialogComponent } from './add-grower-dialog/add-grower-dialog.component';
import { EditGrowerDialogComponent } from './edit-grower-dialog/edit-grower-dialog.component';
import { OverviewComponent } from './overview/overview.component';
import { GrowerDetailComponent } from './grower-detail/grower-detail.component';


@NgModule({
  declarations: [
    CrmDashboardComponent,
    AddGrowerComponent,
    GrowersComponent,
    AddGrowerBottomsheetComponent,
    EditGrowersComponent,
    AddGrowerDialogComponent,
    EditGrowerDialogComponent,
    OverviewComponent,
    GrowerDetailComponent,
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    SharedModule
  ]
})
export class CrmModule { }

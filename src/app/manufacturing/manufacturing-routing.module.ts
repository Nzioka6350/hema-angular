import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CofeeTypesComponent } from './cofee-types/cofee-types.component';
import { CofeeGradesComponent } from './cofee-grades/cofee-grades.component';
import { OverviewComponent } from './overview/overview.component';
import { MillingComponent } from './milling/milling.component';
import { PurchaseReceiptComponent } from './purchase-receipt/purchase-receipt.component';

const routes: Routes = [
  {
    path: 'manufacturing', component: DashboardComponent, data: { active: 'manufacturing' }, children: [
      { path: '', component: OverviewComponent, data: { active: 'overview' } },
      { path: 'coffee-types', component: CofeeTypesComponent, data: { active: 'types' } },
      { path: 'coffee-grades', component: CofeeGradesComponent, data: { active: 'grades' } },
      { path: 'milling', component: MillingComponent, data: { active: 'milling' } },
      { path: 'purchase-receipt', component: PurchaseReceiptComponent, data: { active: 'purchase-receipt' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturingRoutingModule { }

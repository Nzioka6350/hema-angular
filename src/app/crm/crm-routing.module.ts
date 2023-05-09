import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrmDashboardComponent } from './crm-dashboard/crm-dashboard.component';
import { GrowersComponent } from './growers/growers.component';
import { OverviewComponent } from './overview/overview.component';
import { GrowerDetailComponent } from './grower-detail/grower-detail.component';

const routes: Routes = [
  {
    path: 'crm', component: CrmDashboardComponent, data: { active: 'crm' }, children: [
      { path: 'growers', component: GrowersComponent, data: { active: 'growers' } },
      { path: 'growers/:id', component: GrowerDetailComponent },
      { path: '', component: OverviewComponent, data: { active: 'overview' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }

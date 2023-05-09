import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationsDashboardComponent } from './integrations-dashboard/integrations-dashboard.component';

const routes: Routes = [
  { path: 'integrations', component: IntegrationsDashboardComponent, data: { active: 'integrations' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLifecycleComponent } from '../employee-lifecycle/employee-lifecycle.component';
import { LeaveTypesComponent } from '../leave-types/leave-types.component';
import { EmployeeOnboardingComponent } from './employee-onboarding/employee-onboarding.component';
import { EmployeeComponent } from './employee/employee.component';
import { HrContentComponent } from './hr-content/hr-content.component';
import { CasualComponent } from './casual/casual.component';

const routes: Routes = [
  {
    path: 'hr',
    component: HrContentComponent,
    data: { active: 'hr' },
    children: [
      { path: '', component: EmployeeComponent, data: { active: 'employee' } },
      {
        path: 'casual',
        component: CasualComponent,
        data: { active: 'casual' },
      },
      {
        path: 'onboarding',
        component: EmployeeOnboardingComponent,
        data: { active: 'employee-onboarding' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {}

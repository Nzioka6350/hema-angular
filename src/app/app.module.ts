import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatLineModule, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDividerModule } from '@angular/material/divider'
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XSRFInterceptor } from './xsrf.interceptor';
import { AuthInvalidComponent } from './auth-invalid/auth-invalid.component';
import { IndexComponent } from './index/index.component';
import { OnboardComponent } from './onboard/onboard.component';
import { JoinInvitesComponent } from './join-invites/join-invites.component';
import { AddInviteComponent } from './add-invite/add-invite.component';
import { UsersComponent } from './users/users.component';
import { InviteStatsComponent } from './invite-stats/invite-stats.component';
import { HomeComponent } from './home/home.component';
import { LeaveTypesComponent } from './leave-types/leave-types.component';
import { NewLeaveTypeComponent } from './new-leave-type/new-leave-type.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AccountComponent } from './account/account.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationComponent } from './notification/notification.component';
import { EmployeeLifecycleComponent } from './employee-lifecycle/employee-lifecycle.component';
import { HrModule } from './hr/hr.module';
import { CrmModule } from './crm/crm.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { SharedModule } from './shared/shared.module';
import { LoadingInterceptor, loadingServiceFactory } from './loading.interceptor';
import { LoadingService } from './loading.service';
import { ManufacturingModule } from './manufacturing/manufacturing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthInvalidComponent,
    IndexComponent,
    OnboardComponent,
    JoinInvitesComponent,
    AddInviteComponent,
    UsersComponent,
    InviteStatsComponent,
    HomeComponent,
    LeaveTypesComponent,
    NewLeaveTypeComponent,
    NotificationsComponent,
    AccountComponent,
    NotificationListComponent,
    NotificationComponent,
    EmployeeLifecycleComponent
  ],
  imports: [
    AppRoutingModule,
    HrModule,
    CrmModule,
    IntegrationsModule,
    SharedModule,
    ManufacturingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XSRFInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: LoadingService,
      useFactory: loadingServiceFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

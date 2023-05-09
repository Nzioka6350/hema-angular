import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthInvalidComponent } from './auth-invalid/auth-invalid.component';
import { notificationResolver } from './interfaces/notification';
import { InviteStatsComponent } from './invite-stats/invite-stats.component';
import { JoinInvitesComponent } from './join-invites/join-invites.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OnboardComponent } from './onboard/onboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  // {
  //   path: '', component: IndexComponent, children: [
  //     {
  //       path: '', component: HomeComponent, children: [
  //       ]
  //     },
  //   ]
  // },
  { path: '', redirectTo: '/hr', pathMatch: 'full' },
  { path: 'account', component: AccountComponent, data: { active: 'account' } },
  {
    path: 'notifications', component: NotificationsComponent, children: [
      { path: '', component: NotificationListComponent, data: { active: 'list' } },
      { path: ':notification_id', component: NotificationComponent, data: { active: 'detail' }, resolve: { notification: notificationResolver } },
    ], data: { active: 'notifications' }
  },
  {
    path: 'onboarding', component: OnboardComponent, children: [
      { path: 'invites', component: JoinInvitesComponent, data: { active: 'invites' } },
      { path: 'invite-stats', component: InviteStatsComponent, data: { active: 'invite-stats' } },
      { path: 'users', component: UsersComponent, data: { active: 'users' } },
    ], data: { active: 'onboarding' }
  },
  { path: 'auth-invalid', component: AuthInvalidComponent, data: { active: 'auth-invalid' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

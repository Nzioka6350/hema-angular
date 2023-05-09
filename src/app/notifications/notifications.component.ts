import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';
import { Notification } from '../interfaces/notification';
import { LoadService } from '../load.service';
import { NotificationsService } from '../notifications.service';
import { UiModeService } from '../ui-mode.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService, private router: Router) { }
  navigate(location: string[]) {
    this.router.navigate(location)
  }
}

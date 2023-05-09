import { SelectionModel } from '@angular/cdk/collections';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { BaseService } from '../base.service';
import { Notification } from '../interfaces/notification';
import { LoadService } from '../load.service';
import { NotificationsService } from '../notifications.service';
import { UiModeService } from '../ui-mode.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent {


  notifications: Notification[] | undefined

  statusSelectionModel = new SelectionModel<string>(false, undefined, true)

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private loadService: LoadService, public notificationsService: NotificationsService, public uiMode: UiModeService, private http: HttpClient, private base: BaseService) {
    this.statusSelectionModel.changed.subscribe(value => {
      this.fetch_selected()
    })
    this.statusSelectionModel.select('all')
  }

  fetch_selected() {
    if (this.statusSelectionModel.isSelected('all')) {
      this.get_notifications()
    }
    if (this.statusSelectionModel.isSelected('unread')) {
      this.get_unreadNotifications()
    }
  }

  get_notifications() {
    this.loadService.start()
    this.http.get(this.base.base_uri_api + 'notifications', { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.notificationsService.clear()
          this.notifications = response.body
          this.loadService.stop()
          // console.log(this.notifications);
        }
      }, error: errorResponse => {
        this.loadService.stop()
      }, complete: () => {
        this.loadService.stop()
      }
    })
  }

  get_unreadNotifications() {
    this.loadService.start()
    this.http.get(this.base.base_uri_api + 'notifications/unread', { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.notificationsService.clear()
          this.notifications = response.body
          this.loadService.stop()
        }
      }, error: errorResponse => {
        this.loadService.stop()
      }, complete: () => {
        this.loadService.stop()
      }
    })
  }

  markAsRead() {
    this.loadService.start()
    this.http.post(this.base.base_uri_api + 'notifications/mark-as-read', undefined, { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          if (this.statusSelectionModel.isSelected('new')) {
            this.statusSelectionModel.select('all')
          }
          this.fetch_selected()
          this.loadService.stop()
          // console.log(this.notifications);
        }
      }, error: errorResponse => {
        this.loadService.stop()
      }, complete: () => {
        this.loadService.stop()
      }
    })
  }

  deleteRead() {
    this.loadService.start()
    this.http.post(this.base.base_uri_api + 'notifications/delete-read', undefined, { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.fetch_selected()
          this.loadService.stop()
          // console.log(this.notifications);
        }
      }, error: errorResponse => {
        this.loadService.stop()
      }, complete: () => {
        this.loadService.stop()
      }
    })
  }

  navigate(location: string[]) {
    this.router.navigate(location)
  }
}

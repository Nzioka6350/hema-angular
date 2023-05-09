import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { BaseService } from '../base.service';
import { Notification } from '../interfaces/notification';
import { LoadService } from '../load.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  delete() {
    this.loadService.start()
    this.http.delete(this.base.base_uri_api + `notifications/${this.notification?.id}`, { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.loadService.stop()
          this.router.navigate(['/notifications'])
        }
      }, error: errorResponse => {
        this.snack.open('Notification deleted', '', { duration: 5000 })
        this.loadService.stop()
      }, complete: () => {
        this.loadService.stop()
      }
    })
  }

  notification: Notification | undefined

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private snack: MatSnackBar, private router: Router, private loadService: LoadService, private notificationsService: NotificationsService, private http: HttpClient, private base: BaseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      ({ notification }) => {
        if (notification) {
          this.notification = notification
          if (this.notification?.read_at === null)
            setTimeout(this.markAsRead.bind(this), 3000)
        } else {
          history.back()
        }
      });
  }

  markAsRead() {
    this.http.post(this.base.base_uri_api + `notifications/${this.notification?.id}/mark-as-read`, undefined, { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          // console.log(this.notifications);
          if (this.notification)
            this.notificationsService.deselect(this.notification)
          this.refresh()
        }
      }
    })
  }

  refresh() {
    if (this.notification)
      this.notificationsService.getNotification(this.notification.id).subscribe({
        next: notification => {
          if (notification)
            this.notification = notification
        }
      })
  }
}

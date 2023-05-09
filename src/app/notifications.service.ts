import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { EchoService } from './echo.service';
import { Notification } from './interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationsSelectionModel = new SelectionModel<{
    "title": string,
    "description": string,
    "id": string,
    "type": string
  }>(true, undefined, true)

  constructor(private http: HttpClient, private base: BaseService, private auth: AuthService) {
    if (this.auth.userChannelSelectionModel.hasValue()) {
      this.listenForNotifications()
    } else {
      this.auth.userChannelSelectionModel.changed.subscribe(() => {
        if (this.auth.userChannelSelectionModel.hasValue()) {
          this.listenForNotifications()
        }
      })
    }
  }

  listenForNotifications() {
    this.auth.userChannelSelectionModel.selected[0].notification((notification: any) => {
      // console.log(notification);
      this.notificationsSelectionModel.select(notification)
    });
  }

  clear() {
    this.notificationsSelectionModel.clear()
  }

  deselect(notification: Notification) {
    this.notificationsSelectionModel.selected.forEach(pusherNotification => {
      if (notification.id === pusherNotification.id) {
        this.notificationsSelectionModel.deselect(pusherNotification)
        return
      }
    })
  }

  getNotification(id: string) {
    return this.http.get<Notification>(this.base.base_uri_api + 'notifications/' + id, { withCredentials: true, observe: 'body' })
  }


}



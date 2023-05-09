import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { User } from './interfaces/user';
import { LoadService } from './load.service';
import Echo, { Channel } from 'laravel-echo';
import { EchoService } from './echo.service';
import { OnlineService } from './online.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUserModel = new SelectionModel<User>(false, undefined, true)
  // channel: Channel | undefined
  userChannelSelectionModel = new SelectionModel<Channel>(false, undefined, true)

  constructor(private online: OnlineService, private echo: EchoService, private loadService: LoadService, private base: BaseService, private router: Router, private http: HttpClient) {
    if (this.loggedInUserModel.isEmpty()) {
      this.get()
    }
    if (this.echo.echoSelectionModel.hasValue()) {
      this.listenToChannel()
    } else {
      this.echo.echoSelectionModel.changed.subscribe(() => {
        this.listenToChannel()
      })
    }

  }

  listenToChannel() {
    if (this.loggedInUserModel.hasValue()) {
      this.userChannelSelectionModel.select(this.echo.echoSelectionModel.selected[0].private('App.Models.User.' + this.loggedInUserModel.selected[0].id))
    } else {
      this.loggedInUserModel.changed.subscribe(() => {
        if (this.loggedInUserModel.hasValue()) {
          this.userChannelSelectionModel.select(this.echo.echoSelectionModel.selected[0].private('App.Models.User.' + this.loggedInUserModel.selected[0].id))
        }
      })
    }
  }

  get(redirect?: boolean) {
    this.http.get<any>(this.base.base_uri_api + 'user', { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<User>) => {
        if (response.ok && response.body) {
          this.loggedInUserModel.select(response.body)
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.loggedInUserModel.clear()
        if (errorResponse.status === 401) {
          this.http.get<any>(this.base.base_uri_api + 'auth/redirect', { withCredentials: true, observe: 'response' }).subscribe({
            next: (response: HttpResponse<any>) => {
              if (response.ok && response.body && response.body['url']) {
                if (window.location.pathname !== '/auth-invalid' || redirect === true)
                  window.location.href = response.body['url']
              }
            }
          })
        }
      }
    })
  }

  logout() {
    this.loadService.start()
    this.online.leave()
    this.http.post(this.base.base_uri_api + 'user/logout', {}, { observe: 'response', withCredentials: true }).subscribe(
      {
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.loadService.stop()
            this.get()
          }
        }, error: errorResponse => {
          this.online.init()
          this.loadService.stop()
        }, complete: () => {
          this.loadService.stop()
        }
      }
    )
  }
}
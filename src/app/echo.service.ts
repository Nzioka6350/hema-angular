import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Echo, { Channel } from 'laravel-echo';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EchoService {

  echoSelectionModel = new SelectionModel<Echo>(false, undefined, true)

  constructor(private http: HttpClient, private base: BaseService) {
    let Pusher = require('pusher-js');
    this.connect(Pusher)
  }

  connect(Pusher: any) {
    Pusher.Runtime.createXHR = function () {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      return xhr;
    };
    this.echoSelectionModel.select(
      new Echo({
        broadcaster: 'pusher',
        client: new Pusher('pusher_key', {
          cluster: 'mt1',
          wsHost: 'localhost',
          wssHost: 'localhost',
          enabledTransports: ['ws', 'wss'],
          wsPort: 6001,
          forceTLS: false,
          logToConsole: true,
          disableStats: false,
          channelAuthorization: {
            endpoint: this.base.base_uri + 'broadcasting/auth',
            headers: { 'X-XSRF-TOKEN': `${document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]}` }
          }
        }),
        // client: new Pusher('pusher_key', {
        //   cluster: 'mt1',
        //   wsHost: 'ws.one.wabadesk.com',
        //   wssHost: 'ws.one.wabadesk.com',
        //   enabledTransports: ['ws', 'wss'],
        //   wsPort: 443,
        //   forceTLS: false,
        //   logToConsole: true,
        //   disableStats: true,
        //   channelAuthorization: {
        //     endpoint: this.base.base_uri + 'broadcasting/auth',
        //     headers: { 'X-XSRF-TOKEN': `${document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]}` }
        //   }
        // })
      })
    )
  }
}

import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { EchoService } from './echo.service';
import { NotificationsService } from './notifications.service';
import { OnlineService } from './online.service';
import { UiModeService } from './ui-mode.service';
import { XsrfService } from './xsrf.service';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loading: LoadingService, private online: OnlineService, private xsrf: XsrfService, public auth: AuthService, public echo: EchoService, public notifications: NotificationsService, public uiMode: UiModeService) { }
}

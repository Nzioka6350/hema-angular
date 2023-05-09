import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoadService } from '../load.service';
import { NotificationsService } from '../notifications.service';
import { OnlineService } from '../online.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public online: OnlineService, public notifications: NotificationsService, public router: Router, public auth: AuthService) {
    auth.loggedInUserModel.changed.subscribe({
      next: (value) => {
        if (auth.loggedInUserModel.hasValue()) {
          this.router.navigate(['/'])
        }
      },
    })
  }

}

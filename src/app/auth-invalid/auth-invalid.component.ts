import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-invalid',
  templateUrl: './auth-invalid.component.html',
  styleUrls: ['./auth-invalid.component.scss']
})
export class AuthInvalidComponent {
  constructor(public router: Router, public auth: AuthService) {
    if (auth.loggedInUserModel.hasValue()) {
      this.router.navigate(['/'])
    } else {
      this.auth.loggedInUserModel.changed.subscribe(() => {
        if (auth.loggedInUserModel.hasValue()) {
          this.router.navigate(['/'])
        }
      })
    }
  }
}

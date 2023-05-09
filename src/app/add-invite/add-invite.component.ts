import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-add-invite',
  templateUrl: './add-invite.component.html',
  styleUrls: ['./add-invite.component.scss']
})
export class AddInviteComponent {
  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient) { }
  load = false
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>(true)

  close_fn() {
    this.close.emit(true)
  }

  newInvite = new FormGroup({
    email: new FormControl(''),
    revokes_automaticaly: new FormControl(true),
    revokes_in: new FormControl(7),
  })

  submit() {
    if (this.newInvite.valid) {
      this.newInvite.disable()
      this.load = true
      let formData = new FormData()
      formData.append('email', this.newInvite.controls.email.value ?? '')
      if (this.newInvite.controls.revokes_automaticaly) {
        formData.append('revokes_in', this.newInvite.controls.revokes_in.value?.toString() ?? '0')
      }
      this.load = true
      this.http.post(this.base.base_uri_api + 'invites', formData, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.snack.open('Invite Submitted', '', {duration: 5000})
          }
        }, error: (errorResponse: HttpErrorResponse) => {
          this.newInvite.enable()
          this.load = false
          switch (errorResponse.status) {
            case 422:
              if (errorResponse.error['errors']) {
                if (errorResponse.error['errors'].email) {
                  this.newInvite.controls.email.setErrors({ backend: errorResponse.error['errors'].email })
                }
                if (errorResponse.error['errors'].revokes_in) {
                  this.newInvite.controls.revokes_in.setErrors({ backend: errorResponse.error['errors'].revokes_in })
                }
              }
              break;

            default:
              break;
          }

        }, complete: () => {
          this.newInvite.enable()
          this.load = false
        }
      })
    }
  }
}

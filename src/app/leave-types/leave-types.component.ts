import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from '../base.service';
import { Leave, LeaveTypesResponse } from '../interfaces/leave';
import { LoadService } from '../load.service';
import { NewLeaveTypeComponent } from '../new-leave-type/new-leave-type.component';

@Component({
  selector: 'app-leave-types',
  templateUrl: './leave-types.component.html',
  styleUrls: ['./leave-types.component.scss']
})
export class LeaveTypesComponent {
  delete(_t35: Leave) {
    this.snack.open(`Confirm ${_t35.name} deletion?`, 'Confirm', { duration: 7000 }).onAction().subscribe(() => {
      // delete code here
      this.http.delete(this.base.base_uri_api + `leave-types/${_t35.id}`, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.snack.open(`${_t35.name} deleted.`, '', { duration: 5000 })
          }
        }
      })
    })
  }
  avail(_t35: Leave, available: boolean) {
    this.snack.open(`Confirm marking ${_t35.name} as ${available ? 'available' : 'unavailable'}?`, 'Confirm', { duration: 7000 }).onAction().subscribe(() => {
      // delete code here
      this.http.post(this.base.base_uri_api + `leave-types/${_t35.id}`, { available: available }, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.snack.open(`${_t35.name} marked as ${available ? 'available' : 'unavailable'}.`, '', { duration: 5000 })
          }
        }
      })
    })
  }

  leavesTypes: LeaveTypesResponse | undefined

  constructor(private loadService: LoadService, private snack: MatSnackBar, private dialog: MatDialog, private http: HttpClient, private base: BaseService) {
    this.get_leaves()
  }

  new_leave_type() {
    this.dialog.open(NewLeaveTypeComponent, {
      hasBackdrop: false,
      height: 'fit-content',
      width: '25%',
      position: {
        // top: '0',
        bottom: '16px',
        right: '16px'
      },
      // panelClass: 'mdc-container'
    })
  }

  back() {
    history.back()
  }

  get_leaves() {
    this.loadService.start()
    this.http.get(this.base.base_uri_api + 'leave-types', { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.loadService.stop()
          this.leavesTypes = response.body
        }
      }, error: (errorResposne: HttpErrorResponse) => {
        this.loadService.stop()
      }, complete: () => {
        this.loadService.stop()
      }
    })
  }

  displayedColumns: string[] = ['max_allocation', 'applicable_after', 'is_without_pay', 'allow_over_allocation', 'includes_holidays'];
}

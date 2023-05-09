import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { BaseService } from 'src/app/base.service';
import { Grower, GrowersResponse } from 'src/app/interfaces/grower';
import { AddGrowerDialogComponent } from '../add-grower-dialog/add-grower-dialog.component';
import { EditGrowerDialogComponent } from '../edit-grower-dialog/edit-grower-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-growers',
  templateUrl: './growers.component.html',
  styleUrls: ['./growers.component.scss']
})
export class GrowersComponent implements OnChanges {
  delete(_t67: Grower) {
    this.snackBar.open(`Confirm ${_t67.name} Grower Deletion`, 'CONFIRM', { duration: 7000 }).onAction().subscribe(() => {
      this.http.delete(this.base.base_uri_api + `crm/growers/${_t67.id}`, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          this.snackBar.open(`Grower ${_t67.name} deleted.`, '', { duration: 3000 })
        }
      })
    })
  }
  pageEevent: PageEvent = new PageEvent()
  paginate($event: PageEvent) {
    this.get_growers(this.base.base_uri_api + `crm/growers?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }

  @ViewChild('growersList') growersList: MatSelectionList | undefined

  growers: GrowersResponse | undefined

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private base: BaseService, private http: HttpClient) {
    this.get_growers(this.base.base_uri_api + 'crm/growers')
    this.ngOnChanges.bind(this)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']) {
      if (changes['selected'].currentValue) {
        if (changes['selected'].currentValue !== 'edit-grower') {
          this.growersList?.deselectAll()
        }
      } else {
        this.growersList?.deselectAll()
      }
    }
  }

  displayedColumns: string[] = ['name', 'code', 'updated', 'created'];

  get_growers(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.growers = response.body
          if (pageEvent)
            this.pageEevent = pageEvent
        }
      }, error: (errorResponse: HttpErrorResponse) => {

      }
    })
  }

  addGrower() {
    this.dialog.open(AddGrowerDialogComponent, {
      maxWidth: '700px',
      width: '100%'
    })
  }

  editGrower(grower: Grower) {
    this.dialog.open(EditGrowerDialogComponent, {
      maxWidth: '700px',
      width: '100%',
      data: grower
    })
  }
}

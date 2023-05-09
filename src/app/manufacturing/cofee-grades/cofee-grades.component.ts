import { Component } from '@angular/core';
import { AddGradesComponent } from '../add-grades/add-grades.component';
import { MatDialog } from '@angular/material/dialog';
import { CoffeeGrade, CoffeeGradesResponse } from 'src/app/interfaces/coffeegrade';
import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/base.service';
import { EditCoffeeGradesComponent } from '../edit-coffee-grades/edit-coffee-grades.component';

@Component({
  selector: 'app-cofee-grades',
  templateUrl: './cofee-grades.component.html',
  styleUrls: ['./cofee-grades.component.scss']
})
export class CofeeGradesComponent {

  addType() {
    this.dialog.open(AddGradesComponent, {
      maxWidth: '700px',
      width: '100%'
    })
  }

  edit(_t67: any) {
    this.dialog.open(EditCoffeeGradesComponent, {
      maxWidth: '700px',
      width: '100%',
      data: _t67
    })
  }
  delete(_t67: CoffeeGrade) {
    this.snackBar.open(`Confirm ${_t67.name} Coffee Grade Deletion`, 'CONFIRM', { duration: 7000 }).onAction().subscribe(() => {
      this.http.delete(this.base.base_uri_api + `manufacturing/coffee-grades/${_t67.id}`, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          this.snackBar.open(`Coffee Grade ${_t67.name} deleted.`, '', { duration: 3000 })
        }
      })
    })

  }
  coffeeGrades: CoffeeGradesResponse | undefined | null
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private http: HttpClient, private base: BaseService) {
    this.get_coffee_grades()
  }

  get_coffee_grades() {
    this.http.get(this.base.base_uri_api + 'manufacturing/coffee-grades', { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.coffeeGrades = response.body
      }
    })
  }

  displayedColumns: string[] = ['name', 'created', 'updated'];
}

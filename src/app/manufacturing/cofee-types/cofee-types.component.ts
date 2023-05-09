import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTypesComponent } from '../add-types/add-types.component';
import { BaseService } from 'src/app/base.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { CoffeeTypesResponse, CoffeeType } from 'src/app/interfaces/coffeetype';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditCoffeeTypesComponent } from '../edit-coffee-types/edit-coffee-types.component';
import { EchoService } from 'src/app/echo.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Channel } from 'laravel-echo';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cofee-types',
  templateUrl: './cofee-types.component.html',
  styleUrls: ['./cofee-types.component.scss']
})
export class CofeeTypesComponent {
  edit(_t67: any) {
    this.dialog.open(EditCoffeeTypesComponent, {
      maxWidth: '700px',
      width: '100%',
      data: _t67
    })
  }
  delete(_t67: CoffeeType) {
    this.snackBar.open(`Confirm ${_t67.name} Coffee Beans Deletion`, 'CONFIRM', { duration: 7000 }).onAction().subscribe(() => {
      this.http.delete(this.base.base_uri_api + `manufacturing/coffee-types/${_t67.id}`, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          this.snackBar.open(`Coffee Beans ${_t67.name} deleted.`, '', { duration: 3000 })
        }
      })
    })
  }

  coffeeTypes: CoffeeTypesResponse | undefined | null

  coffeeTyepesDataBehaviorSubject = new BehaviorSubject<CoffeeType[]>([])

  constructor(private echo: EchoService, private snackBar: MatSnackBar, private dialog: MatDialog, private http: HttpClient, private base: BaseService) {
    this.coffeeBeanChannelsSelectionModel.changed.subscribe(value => {
      if (value.added && value.added.length > 0) {
        value.added.forEach(channel => {
          channel.listen('.CoffeeBeanUpdated', (event: any) => {
            if (this.coffeeTypes && this.coffeeTypes.data) {
              // Find the index of the item to update
              let indexToUpdate = this.coffeeTypes.data.findIndex(item => item.id === event.model.id);
              console.log(indexToUpdate);
              console.log(event.model);

              // Update the item at the found index
              if (indexToUpdate !== -1) {
                this.coffeeTypes.data[indexToUpdate] = event.model;
                this.coffeeTyepesDataBehaviorSubject.next(this.coffeeTypes.data)
              }
            }
          })
        })
      }
    })
    this.get_coffee_types()
  }

  addType() {
    this.dialog.open(AddTypesComponent, {
      maxWidth: '700px',
      width: '100%'
    })
  }

  coffeeBeanChannelsSelectionModel = new SelectionModel<Channel>(true, undefined, true)

  subscribeToChannels() {
    if (this.coffeeTypes && this.coffeeTypes.data) {
      this.coffeeTypes.data.forEach(coffeeType => {
        if (this.echo.echoSelectionModel.hasValue()) {
          this.coffeeBeanChannelsSelectionModel.select(this.echo.echoSelectionModel.selected[0].private(`App.Models.CoffeeBean.${coffeeType.id}`))
        } else {
          this.echo.echoSelectionModel.changed.subscribe(value => {
            if (this.echo.echoSelectionModel.hasValue()) {
              this.coffeeBeanChannelsSelectionModel.select(this.echo.echoSelectionModel.selected[0].private(`App.Models.CoffeeBean.${coffeeType.id}`))
            }
          })
        }
      })
    }
  }

  unSubscribeFromChannels() {
    this.coffeeBeanChannelsSelectionModel.selected.forEach(channel => {
      channel.stopListening('.CoffeeBeanUpdated')
      this.coffeeBeanChannelsSelectionModel.toggle(channel)
    })
  }

  get_coffee_types() {
    this.http.get(this.base.base_uri_api + 'manufacturing/coffee-types', { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'grades') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.coffeeTypes = response.body
        if (this.coffeeTypes)
          this.coffeeTyepesDataBehaviorSubject.next(this.coffeeTypes.data)
        this.subscribeToChannels()
      }
    })
  }

  displayedColumns: string[] = ['name', 'created', 'updated', 'grades_count'];

}

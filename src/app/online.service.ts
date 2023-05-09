import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { EchoService } from './echo.service';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  users: User[] | undefined

  onlineUsersSelectionModel = new SelectionModel<User>(true, undefined, true)

  constructor(private echo: EchoService) {
    this.init()
  }

  init() {
    if (this.echo.echoSelectionModel.hasValue()) {
      this.listen_and_join()
    } else {
      this.echo.echoSelectionModel.changed.subscribe(() => {
        this.listen_and_join()
      })
    }
  }

  listen_and_join() {
    this.echo.echoSelectionModel.selected[0].join('online').here(
      (users: User[]) => {
        this.onlineUsersSelectionModel.setSelection(...users)
      }
    ).joining(
      (user: User) => {
        this.onlineUsersSelectionModel.select(user)
      }
    ).leaving(
      (user: User) => {
        // this.onlineUsersSelectionModel.setSelection(...this.onlineUsersSelectionModel.selected.filter(
        //   u => {
        //     u.id !== user.id
        //   }
        // ))
        let u = this.onlineUsersSelectionModel.selected.find((u: User) => {
          return u.id === user.id
        })
        if (u) {
          this.onlineUsersSelectionModel.deselect(u)
        }

      }
    )
  }

  leave() {
    if (this.echo.echoSelectionModel.hasValue())
      this.echo.echoSelectionModel.selected[0].leave('online')
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  load = false;

  constructor() { }

  start() {
    this.load = true
  }

  stop() {
    this.load = false
  }
}

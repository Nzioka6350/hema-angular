import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  changed: Subject<boolean> = new Subject()
  loaded = false

  constructor() {
    this.load_packages()
  }

  load_packages() {

    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart', 'table'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(() => {
      this.loaded = true
      this.changed.next(true)
    });
  }

}
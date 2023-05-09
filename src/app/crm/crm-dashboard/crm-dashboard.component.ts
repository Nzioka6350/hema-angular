import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddGrowerBottomsheetComponent } from '../add-grower-bottomsheet/add-grower-bottomsheet.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { Grower } from 'src/app/interfaces/grower';

@Component({
  selector: 'app-crm-dashboard',
  templateUrl: './crm-dashboard.component.html',
  styleUrls: ['./crm-dashboard.component.scss']
})
export class CrmDashboardComponent {
  sidePanelSelectionModel = new SelectionModel<string>(false, undefined, true)
  constructor(private bottomSheet: MatBottomSheet, private breakpointObserver: BreakpointObserver) {
    this.sidePanelSelectionModel.changed.subscribe(() => {
      if (this.sidePanelSelectionModel.isSelected('add-grower')&&this.isHandset) {
        this.bottomSheet.open(AddGrowerBottomsheetComponent, {
          // panelClass: 'px-3'
        })
      }
    })
    this.isHandset$.subscribe(value => {
      this.isHandset = value
    })
  }
  selectedGrower = new SelectionModel<Grower>(false, undefined, true)
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isHandset: boolean | undefined
}

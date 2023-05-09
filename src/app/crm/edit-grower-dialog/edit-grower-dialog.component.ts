import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grower } from 'src/app/interfaces/grower';

@Component({
  selector: 'app-edit-grower-dialog',
  templateUrl: './edit-grower-dialog.component.html',
  styleUrls: ['./edit-grower-dialog.component.scss']
})
export class EditGrowerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public grower: Grower) { }
}

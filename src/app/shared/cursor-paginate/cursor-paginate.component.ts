import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cursor-paginate',
  templateUrl: './cursor-paginate.component.html',
  styleUrls: ['./cursor-paginate.component.scss']
})
export class CursorPaginateComponent {
  next() {
    throw new Error('Method not implemented.');
  }
  prev() {
    throw new Error('Method not implemented.');
  }

  @Input() perPage: number = 0
  @Input() nextCursor: string | null = null
  @Input() prevCursor: string | null = null

  @Output() paginate = new EventEmitter<string | null>(true)

}

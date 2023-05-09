import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursorPaginateComponent } from './cursor-paginate.component';

describe('CursorPaginateComponent', () => {
  let component: CursorPaginateComponent;
  let fixture: ComponentFixture<CursorPaginateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursorPaginateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursorPaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

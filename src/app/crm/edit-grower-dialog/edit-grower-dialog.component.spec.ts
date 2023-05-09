import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrowerDialogComponent } from './edit-grower-dialog.component';

describe('EditGrowerDialogComponent', () => {
  let component: EditGrowerDialogComponent;
  let fixture: ComponentFixture<EditGrowerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGrowerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGrowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

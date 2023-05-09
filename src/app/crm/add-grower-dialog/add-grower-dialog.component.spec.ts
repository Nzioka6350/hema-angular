import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrowerDialogComponent } from './add-grower-dialog.component';

describe('AddGrowerDialogComponent', () => {
  let component: AddGrowerDialogComponent;
  let fixture: ComponentFixture<AddGrowerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGrowerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGrowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

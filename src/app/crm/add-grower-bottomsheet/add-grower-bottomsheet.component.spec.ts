import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrowerBottomsheetComponent } from './add-grower-bottomsheet.component';

describe('AddGrowerBottomsheetComponent', () => {
  let component: AddGrowerBottomsheetComponent;
  let fixture: ComponentFixture<AddGrowerBottomsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGrowerBottomsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGrowerBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

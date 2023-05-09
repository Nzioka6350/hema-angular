import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailBottomsheetComponent } from './employee-detail-bottomsheet.component';

describe('EmployeeDetailBottomsheetComponent', () => {
  let component: EmployeeDetailBottomsheetComponent;
  let fixture: ComponentFixture<EmployeeDetailBottomsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailBottomsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

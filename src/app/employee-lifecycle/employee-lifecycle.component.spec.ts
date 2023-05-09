import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLifecycleComponent } from './employee-lifecycle.component';

describe('EmployeeLifecycleComponent', () => {
  let component: EmployeeLifecycleComponent;
  let fixture: ComponentFixture<EmployeeLifecycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLifecycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

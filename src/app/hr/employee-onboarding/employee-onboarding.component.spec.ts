import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOnboardingComponent } from './employee-onboarding.component';

describe('EmployeeOnboardingComponent', () => {
  let component: EmployeeOnboardingComponent;
  let fixture: ComponentFixture<EmployeeOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeeOnboardingComponent } from './new-employee-onboarding.component';

describe('NewEmployeeOnboardingComponent', () => {
  let component: NewEmployeeOnboardingComponent;
  let fixture: ComponentFixture<NewEmployeeOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmployeeOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmployeeOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

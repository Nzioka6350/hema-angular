import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeaveTypeComponent } from './new-leave-type.component';

describe('NewLeaveTypeComponent', () => {
  let component: NewLeaveTypeComponent;
  let fixture: ComponentFixture<NewLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLeaveTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

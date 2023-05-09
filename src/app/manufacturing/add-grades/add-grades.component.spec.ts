import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradesComponent } from './add-grades.component';

describe('AddGradesComponent', () => {
  let component: AddGradesComponent;
  let fixture: ComponentFixture<AddGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

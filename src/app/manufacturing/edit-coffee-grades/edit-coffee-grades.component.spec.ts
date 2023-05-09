import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoffeeGradesComponent } from './edit-coffee-grades.component';

describe('EditCoffeeGradesComponent', () => {
  let component: EditCoffeeGradesComponent;
  let fixture: ComponentFixture<EditCoffeeGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCoffeeGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoffeeGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

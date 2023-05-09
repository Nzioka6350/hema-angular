import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoffeeTypesComponent } from './edit-coffee-types.component';

describe('EditCoffeeTypesComponent', () => {
  let component: EditCoffeeTypesComponent;
  let fixture: ComponentFixture<EditCoffeeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCoffeeTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoffeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypesComponent } from './add-types.component';

describe('AddTypesComponent', () => {
  let component: AddTypesComponent;
  let fixture: ComponentFixture<AddTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CofeeTypesComponent } from './cofee-types.component';

describe('CofeeTypesComponent', () => {
  let component: CofeeTypesComponent;
  let fixture: ComponentFixture<CofeeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CofeeTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CofeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

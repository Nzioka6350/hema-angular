import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CofeeGradesComponent } from './cofee-grades.component';

describe('CofeeGradesComponent', () => {
  let component: CofeeGradesComponent;
  let fixture: ComponentFixture<CofeeGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CofeeGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CofeeGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

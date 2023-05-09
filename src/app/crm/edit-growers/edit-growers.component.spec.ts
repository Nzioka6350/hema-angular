import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrowersComponent } from './edit-growers.component';

describe('EditGrowersComponent', () => {
  let component: EditGrowersComponent;
  let fixture: ComponentFixture<EditGrowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGrowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGrowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

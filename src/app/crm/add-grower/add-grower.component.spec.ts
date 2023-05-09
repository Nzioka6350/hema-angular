import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrowerComponent } from './add-grower.component';

describe('AddGrowerComponent', () => {
  let component: AddGrowerComponent;
  let fixture: ComponentFixture<AddGrowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGrowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

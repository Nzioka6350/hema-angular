import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillingComponent } from './milling.component';

describe('MillingComponent', () => {
  let component: MillingComponent;
  let fixture: ComponentFixture<MillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

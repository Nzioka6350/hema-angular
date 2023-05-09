import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrContentComponent } from './hr-content.component';

describe('HrContentComponent', () => {
  let component: HrContentComponent;
  let fixture: ComponentFixture<HrContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowerDetailComponent } from './grower-detail.component';

describe('GrowerDetailComponent', () => {
  let component: GrowerDetailComponent;
  let fixture: ComponentFixture<GrowerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

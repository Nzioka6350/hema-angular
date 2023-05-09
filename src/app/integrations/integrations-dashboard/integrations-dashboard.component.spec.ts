import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsDashboardComponent } from './integrations-dashboard.component';

describe('IntegrationsDashboardComponent', () => {
  let component: IntegrationsDashboardComponent;
  let fixture: ComponentFixture<IntegrationsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrationsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

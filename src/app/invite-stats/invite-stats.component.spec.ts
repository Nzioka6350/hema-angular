import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteStatsComponent } from './invite-stats.component';

describe('InviteStatsComponent', () => {
  let component: InviteStatsComponent;
  let fixture: ComponentFixture<InviteStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

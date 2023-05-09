import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinInvitesComponent } from './join-invites.component';

describe('JoinInvitesComponent', () => {
  let component: JoinInvitesComponent;
  let fixture: ComponentFixture<JoinInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinInvitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

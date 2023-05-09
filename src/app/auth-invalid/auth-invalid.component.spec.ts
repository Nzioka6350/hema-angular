import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInvalidComponent } from './auth-invalid.component';

describe('AuthInvalidComponent', () => {
  let component: AuthInvalidComponent;
  let fixture: ComponentFixture<AuthInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthInvalidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UiModeService } from './ui-mode.service';

describe('UiModeService', () => {
  let service: UiModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VisaHistoryService } from './visa-history.service';

describe('VisaHistoryService', () => {
  let service: VisaHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisaHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

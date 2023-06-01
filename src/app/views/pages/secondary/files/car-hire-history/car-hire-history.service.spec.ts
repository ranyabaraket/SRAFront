import { TestBed } from '@angular/core/testing';

import { CarHireHistoryService } from './car-hire-history.service';

describe('CarHireHistoryService', () => {
  let service: CarHireHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarHireHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

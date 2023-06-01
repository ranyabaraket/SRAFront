import { TestBed } from '@angular/core/testing';

import { CarHireResultServiceService } from './car-hire-result-service.service';

describe('CarHireResultServiceService', () => {
  let service: CarHireResultServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarHireResultServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

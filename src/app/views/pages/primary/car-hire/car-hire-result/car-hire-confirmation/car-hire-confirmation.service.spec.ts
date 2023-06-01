import { TestBed } from '@angular/core/testing';

import { CarHireConfirmationService } from './car-hire-confirmation.service';

describe('CarHireConfirmationService', () => {
  let service: CarHireConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarHireConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

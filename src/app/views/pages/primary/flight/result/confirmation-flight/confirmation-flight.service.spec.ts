import { TestBed } from '@angular/core/testing';

import { ConfirmationFlightService } from './confirmation-flight.service';

describe('ConfirmationFlightService', () => {
  let service: ConfirmationFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

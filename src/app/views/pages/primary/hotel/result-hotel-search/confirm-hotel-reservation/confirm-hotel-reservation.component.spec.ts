import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmHotelReservationComponent } from './confirm-hotel-reservation.component';

describe('ConfirmHotelReservationComponent', () => {
  let component: ConfirmHotelReservationComponent;
  let fixture: ComponentFixture<ConfirmHotelReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmHotelReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmHotelReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

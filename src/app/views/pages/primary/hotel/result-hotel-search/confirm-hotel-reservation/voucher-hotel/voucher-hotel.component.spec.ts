import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherHotelComponent } from './voucher-hotel.component';

describe('VoucherHotelComponent', () => {
  let component: VoucherHotelComponent;
  let fixture: ComponentFixture<VoucherHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

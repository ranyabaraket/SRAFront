import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireHistoryVoucherComponent } from './car-hire-history-voucher.component';

describe('CarHireHistoryVoucherComponent', () => {
  let component: CarHireHistoryVoucherComponent;
  let fixture: ComponentFixture<CarHireHistoryVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireHistoryVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireHistoryVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

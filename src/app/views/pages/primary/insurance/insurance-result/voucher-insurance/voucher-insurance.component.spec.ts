import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherInsuranceComponent } from './voucher-insurance.component';

describe('VoucherInsuranceComponent', () => {
  let component: VoucherInsuranceComponent;
  let fixture: ComponentFixture<VoucherInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

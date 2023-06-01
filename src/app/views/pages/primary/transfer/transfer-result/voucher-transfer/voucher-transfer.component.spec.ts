import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherTransferComponent } from './voucher-transfer.component';

describe('VoucherTransferComponent', () => {
  let component: VoucherTransferComponent;
  let fixture: ComponentFixture<VoucherTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

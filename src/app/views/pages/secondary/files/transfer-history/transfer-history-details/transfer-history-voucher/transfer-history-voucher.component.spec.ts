import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHistoryVoucherComponent } from './transfer-history-voucher.component';

describe('TransferHistoryVoucherComponent', () => {
  let component: TransferHistoryVoucherComponent;
  let fixture: ComponentFixture<TransferHistoryVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferHistoryVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferHistoryVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

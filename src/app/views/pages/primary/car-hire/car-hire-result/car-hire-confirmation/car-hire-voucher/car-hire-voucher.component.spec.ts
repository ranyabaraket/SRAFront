import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireVoucherComponent } from './car-hire-voucher.component';

describe('CarHireVoucherComponent', () => {
  let component: CarHireVoucherComponent;
  let fixture: ComponentFixture<CarHireVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

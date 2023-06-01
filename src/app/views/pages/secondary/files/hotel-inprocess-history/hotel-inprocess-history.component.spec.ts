import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelInprocessHistoryComponent } from './hotel-inprocess-history.component';

describe('HotelInprocessHistoryComponent', () => {
  let component: HotelInprocessHistoryComponent;
  let fixture: ComponentFixture<HotelInprocessHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelInprocessHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelInprocessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

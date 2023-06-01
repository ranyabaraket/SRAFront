import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelGuestsDetailsComponent } from './hotel-guests-details.component';

describe('HotelGuestsDetailsComponent', () => {
  let component: HotelGuestsDetailsComponent;
  let fixture: ComponentFixture<HotelGuestsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelGuestsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelGuestsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

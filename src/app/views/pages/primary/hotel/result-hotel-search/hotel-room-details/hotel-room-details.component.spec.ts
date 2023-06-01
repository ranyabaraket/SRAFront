import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRoomDetailsComponent } from './hotel-room-details.component';

describe('HotelRoomDetailsComponent', () => {
  let component: HotelRoomDetailsComponent;
  let fixture: ComponentFixture<HotelRoomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelRoomDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelRoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

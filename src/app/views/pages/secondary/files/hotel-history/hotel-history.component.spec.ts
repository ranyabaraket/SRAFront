import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotelHistoryComponent } from './hotel-history.component';

describe('HotelHistoryComponent', () => {
  let component: HotelHistoryComponent;
  let fixture: ComponentFixture<HotelHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

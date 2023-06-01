import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultHotelSearchComponent } from './result-hotel-search.component';

describe('ResultHotelSearchComponent', () => {
  let component: ResultHotelSearchComponent;
  let fixture: ComponentFixture<ResultHotelSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultHotelSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultHotelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

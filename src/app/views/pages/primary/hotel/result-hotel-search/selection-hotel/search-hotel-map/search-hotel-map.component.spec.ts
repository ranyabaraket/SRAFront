import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHotelMapComponent } from './search-hotel-map.component';

describe('SearchHotelMapComponent', () => {
  let component: SearchHotelMapComponent;
  let fixture: ComponentFixture<SearchHotelMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHotelMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHotelMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

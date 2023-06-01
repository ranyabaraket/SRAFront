import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLoadingHotelSearchComponent } from './custom-loading-hotel-search.component';

describe('CustomLoadingHotelSearchComponent', () => {
  let component: CustomLoadingHotelSearchComponent;
  let fixture: ComponentFixture<CustomLoadingHotelSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLoadingHotelSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLoadingHotelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

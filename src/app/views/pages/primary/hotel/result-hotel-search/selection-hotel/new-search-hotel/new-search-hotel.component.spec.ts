import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchHotelComponent } from './new-search-hotel.component';

describe('NewSearchHotelComponent', () => {
  let component: NewSearchHotelComponent;
  let fixture: ComponentFixture<NewSearchHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSearchHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSearchHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

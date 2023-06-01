import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLoadingFlightSearchComponent } from './custom-loading-flight-search.component';

describe('CustomLoadingFlightSearchComponent', () => {
  let component: CustomLoadingFlightSearchComponent;
  let fixture: ComponentFixture<CustomLoadingFlightSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLoadingFlightSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLoadingFlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

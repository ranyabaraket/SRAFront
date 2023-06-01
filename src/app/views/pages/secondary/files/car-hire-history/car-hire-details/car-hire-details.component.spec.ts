import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireDetailsComponent } from './car-hire-details.component';

describe('CarHireDetailsComponent', () => {
  let component: CarHireDetailsComponent;
  let fixture: ComponentFixture<CarHireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

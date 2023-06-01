import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireReviewComponent } from './car-hire-review.component';

describe('CarHireReviewComponent', () => {
  let component: CarHireReviewComponent;
  let fixture: ComponentFixture<CarHireReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

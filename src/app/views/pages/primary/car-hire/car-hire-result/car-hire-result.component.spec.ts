import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireResultComponent } from './car-hire-result.component';

describe('CarHireResultComponent', () => {
  let component: CarHireResultComponent;
  let fixture: ComponentFixture<CarHireResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

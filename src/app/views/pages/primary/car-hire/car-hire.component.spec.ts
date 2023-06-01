import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireComponent } from './car-hire.component';

describe('CarHireComponent', () => {
  let component: CarHireComponent;
  let fixture: ComponentFixture<CarHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

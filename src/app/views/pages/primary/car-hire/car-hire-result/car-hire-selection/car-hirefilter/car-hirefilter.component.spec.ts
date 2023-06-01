import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHirefilterComponent } from './car-hirefilter.component';

describe('CarHirefilterComponent', () => {
  let component: CarHirefilterComponent;
  let fixture: ComponentFixture<CarHirefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHirefilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHirefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

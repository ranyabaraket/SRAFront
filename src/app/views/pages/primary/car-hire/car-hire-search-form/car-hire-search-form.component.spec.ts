import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireSearchFormComponent } from './car-hire-search-form.component';

describe('CarHireSearchFormComponent', () => {
  let component: CarHireSearchFormComponent;
  let fixture: ComponentFixture<CarHireSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

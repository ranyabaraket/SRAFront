import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireSelectionComponent } from './car-hire-selection.component';

describe('CarHireSelectionComponent', () => {
  let component: CarHireSelectionComponent;
  let fixture: ComponentFixture<CarHireSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

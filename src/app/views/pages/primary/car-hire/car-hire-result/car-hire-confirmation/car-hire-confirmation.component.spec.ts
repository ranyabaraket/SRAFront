import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireConfirmationComponent } from './car-hire-confirmation.component';

describe('CarHireConfirmationComponent', () => {
  let component: CarHireConfirmationComponent;
  let fixture: ComponentFixture<CarHireConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

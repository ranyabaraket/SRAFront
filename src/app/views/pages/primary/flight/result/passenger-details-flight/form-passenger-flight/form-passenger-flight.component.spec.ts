import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPassengerFlightComponent } from './form-passenger-flight.component';

describe('FormPassengerFlightComponent', () => {
  let component: FormPassengerFlightComponent;
  let fixture: ComponentFixture<FormPassengerFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPassengerFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPassengerFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationFlightComponent } from './confirmation-flight.component';

describe('ConfirmationFlightComponent', () => {
  let component: ConfirmationFlightComponent;
  let fixture: ComponentFixture<ConfirmationFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

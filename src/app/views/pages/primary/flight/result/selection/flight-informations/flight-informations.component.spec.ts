import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInformationsComponent } from './flight-informations.component';

describe('FlightInformationsComponent', () => {
  let component: FlightInformationsComponent;
  let fixture: ComponentFixture<FlightInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

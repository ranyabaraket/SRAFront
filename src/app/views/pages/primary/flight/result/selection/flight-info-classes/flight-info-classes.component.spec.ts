import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInfoClassesComponent } from './flight-info-classes.component';

describe('FlightInfoClassesComponent', () => {
  let component: FlightInfoClassesComponent;
  let fixture: ComponentFixture<FlightInfoClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightInfoClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInfoClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

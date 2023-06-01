import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireInformationComponent } from './car-hire-information.component';

describe('CarHireInformationComponent', () => {
  let component: CarHireInformationComponent;
  let fixture: ComponentFixture<CarHireInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

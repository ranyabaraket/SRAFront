import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHireHistoryComponent } from './car-hire-history.component';

describe('CarHireHistoryComponent', () => {
  let component: CarHireHistoryComponent;
  let fixture: ComponentFixture<CarHireHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarHireHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHireHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

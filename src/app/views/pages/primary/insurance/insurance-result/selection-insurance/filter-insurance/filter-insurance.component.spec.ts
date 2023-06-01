import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterInsuranceComponent } from './filter-insurance.component';

describe('FilterInsuranceComponent', () => {
  let component: FilterInsuranceComponent;
  let fixture: ComponentFixture<FilterInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

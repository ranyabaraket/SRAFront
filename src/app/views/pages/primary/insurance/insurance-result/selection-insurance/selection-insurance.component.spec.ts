import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionInsuranceComponent } from './selection-insurance.component';

describe('SelectionInsuranceComponent', () => {
  let component: SelectionInsuranceComponent;
  let fixture: ComponentFixture<SelectionInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceSearchFormComponent } from './insurance-search-form.component';

describe('InsuranceSearchFormComponent', () => {
  let component: InsuranceSearchFormComponent;
  let fixture: ComponentFixture<InsuranceSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

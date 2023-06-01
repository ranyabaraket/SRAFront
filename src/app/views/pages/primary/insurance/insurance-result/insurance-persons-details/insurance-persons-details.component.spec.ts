import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePersonsDetailsComponent } from './insurance-persons-details.component';

describe('InsurancePersonsDetailsComponent', () => {
  let component: InsurancePersonsDetailsComponent;
  let fixture: ComponentFixture<InsurancePersonsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurancePersonsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePersonsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaApplyComponent } from './visa-apply.component';

describe('VisaApplyComponent', () => {
  let component: VisaApplyComponent;
  let fixture: ComponentFixture<VisaApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

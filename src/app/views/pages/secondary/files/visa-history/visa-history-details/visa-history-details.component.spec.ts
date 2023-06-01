import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaHistoryDetailsComponent } from './visa-history-details.component';

describe('VisaHistoryDetailsComponent', () => {
  let component: VisaHistoryDetailsComponent;
  let fixture: ComponentFixture<VisaHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaHistoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

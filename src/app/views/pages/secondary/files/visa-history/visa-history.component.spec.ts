import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaHistoryComponent } from './visa-history.component';

describe('VisaHistoryComponent', () => {
  let component: VisaHistoryComponent;
  let fixture: ComponentFixture<VisaHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

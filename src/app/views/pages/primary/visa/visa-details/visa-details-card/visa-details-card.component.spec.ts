import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaDetailsCardComponent } from './visa-details-card.component';

describe('VisaDetailsCardComponent', () => {
  let component: VisaDetailsCardComponent;
  let fixture: ComponentFixture<VisaDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

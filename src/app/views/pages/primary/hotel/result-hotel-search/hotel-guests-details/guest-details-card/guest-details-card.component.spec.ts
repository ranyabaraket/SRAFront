import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDetailsCardComponent } from './guest-details-card.component';

describe('GuestDetailsCardComponent', () => {
  let component: GuestDetailsCardComponent;
  let fixture: ComponentFixture<GuestDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

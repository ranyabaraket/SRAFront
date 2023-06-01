import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaInstructionComponent } from './visa-instruction.component';

describe('VisaInstructionComponent', () => {
  let component: VisaInstructionComponent;
  let fixture: ComponentFixture<VisaInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

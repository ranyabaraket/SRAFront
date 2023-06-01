import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommissionAgentComponent } from './add-commission-agent.component';

describe('AddCommissionComponent', () => {
  let component: AddCommissionAgentComponent;
  let fixture: ComponentFixture<AddCommissionAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommissionAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommissionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

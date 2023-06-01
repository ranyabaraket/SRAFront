import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommissionAgentComponent } from './edit-commission-agent.component';

describe('EditCommissionComponent', () => {
  let component: EditCommissionAgentComponent;
  let fixture: ComponentFixture<EditCommissionAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommissionAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommissionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

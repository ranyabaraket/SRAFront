import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionAgentListComponent } from './commission-agent-list.component';

describe('CommissionAgentListComponent', () => {
  let component: CommissionAgentListComponent;
  let fixture: ComponentFixture<CommissionAgentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionAgentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

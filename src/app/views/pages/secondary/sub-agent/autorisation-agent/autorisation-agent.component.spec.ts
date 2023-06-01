import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationAgentComponent } from './autorisation-agent.component';

describe('AutorisationAgentComponent', () => {
  let component: AutorisationAgentComponent;
  let fixture: ComponentFixture<AutorisationAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorisationAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiggerMapComponent } from './bigger-map.component';

describe('BiggerMapComponent', () => {
  let component: BiggerMapComponent;
  let fixture: ComponentFixture<BiggerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiggerMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiggerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

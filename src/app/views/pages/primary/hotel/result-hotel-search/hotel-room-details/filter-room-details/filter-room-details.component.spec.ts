import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRoomDetailsComponent } from './filter-room-details.component';

describe('FilterRoomDetailsComponent', () => {
  let component: FilterRoomDetailsComponent;
  let fixture: ComponentFixture<FilterRoomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRoomDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

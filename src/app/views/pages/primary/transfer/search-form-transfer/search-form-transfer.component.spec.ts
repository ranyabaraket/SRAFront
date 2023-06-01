import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormTransferComponent } from './search-form-transfer.component';

describe('SearchFormTransferComponent', () => {
  let component: SearchFormTransferComponent;
  let fixture: ComponentFixture<SearchFormTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFormTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

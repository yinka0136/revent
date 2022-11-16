import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySearchHistoryComponent } from './empty-search-history.component';

describe('EmptySearchHistoryComponent', () => {
  let component: EmptySearchHistoryComponent;
  let fixture: ComponentFixture<EmptySearchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptySearchHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptySearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

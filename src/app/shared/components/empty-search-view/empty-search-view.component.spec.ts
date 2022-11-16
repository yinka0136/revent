import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySearchViewComponent } from './empty-search-view.component';

describe('EmptySearchViewComponent', () => {
  let component: EmptySearchViewComponent;
  let fixture: ComponentFixture<EmptySearchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptySearchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptySearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

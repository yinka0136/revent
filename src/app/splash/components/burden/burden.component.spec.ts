import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurdenComponent } from './burden.component';

describe('BurdenComponent', () => {
  let component: BurdenComponent;
  let fixture: ComponentFixture<BurdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

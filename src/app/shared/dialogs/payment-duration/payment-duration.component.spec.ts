import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDurationComponent } from './payment-duration.component';

describe('PaymentDurationComponent', () => {
  let component: PaymentDurationComponent;
  let fixture: ComponentFixture<PaymentDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

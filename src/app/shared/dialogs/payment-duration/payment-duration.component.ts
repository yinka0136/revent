import { FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-payment-duration',
  templateUrl: './payment-duration.component.html',
  styleUrls: ['./payment-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDurationComponent implements OnInit {
  public durationForm = new FormControl('', Validators.required);
  @Output() duration: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  public continue(): void {
    if (this.durationForm.invalid) {
      this.durationForm.markAsTouched();
      return;
    }
    this.duration.emit(parseInt(this.durationForm.value as string));
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseDialogComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; type: string }
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }
}

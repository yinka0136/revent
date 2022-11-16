import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountComponent implements OnInit {
  @Input() name!: string;
  @Input() count!: number;
  @Input() loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

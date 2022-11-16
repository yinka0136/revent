import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnInit {
  @Input('count') count!: number | undefined;
  @Input('color') color!: string;
  @Input('name') name!: string;
  // @Input('route') route!: string;
  @Input('loading') loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

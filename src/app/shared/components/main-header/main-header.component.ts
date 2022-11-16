import { Base } from '@core/base/base-component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() paragraph!: string;
  @Input() hasBack: boolean = false;

  constructor(private _base: Base) {}

  ngOnInit(): void {}

  public goBack(): void {
    this._base.goBack();
  }
}

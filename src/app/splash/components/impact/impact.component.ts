import { InitialLandingCount, LandingCount } from './../../../shared/models/shared.model';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImpactComponent implements OnInit {
  @Input()landingCount: LandingCount = InitialLandingCount

  constructor() { }

  ngOnInit(): void {
  }

}

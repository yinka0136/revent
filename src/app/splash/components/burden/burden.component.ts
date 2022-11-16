import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-burden',
  templateUrl: './burden.component.html',
  styleUrls: ['./burden.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurdenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

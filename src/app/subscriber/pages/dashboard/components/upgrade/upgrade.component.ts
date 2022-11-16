import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpgradeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public upgrade(): void {
    this.router.navigate(['s/dashboard/upgrade']);
  }
}

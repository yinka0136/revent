import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

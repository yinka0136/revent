import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-search-history',
  templateUrl: './empty-search-history.component.html',
  styleUrls: ['./empty-search-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptySearchHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

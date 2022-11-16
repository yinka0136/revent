import { Component, Input, OnInit } from '@angular/core';
import { SearchCategory } from '@auth/models/search.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() length: number = 0;
  @Input() searchResults: SearchCategory[] = [];
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-search-view',
  templateUrl: './empty-search-view.component.html',
  styleUrls: ['./empty-search-view.component.scss']
})
export class EmptySearchViewComponent implements OnInit {
  @Input('mainTitle') mainTitle = 'No Search Result'
  @Input('subTitle') subTitle = `Your search was unfortunately not found or doesn’t exist`
  constructor() { }

  ngOnInit(): void {
  }

}

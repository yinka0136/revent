import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchCategory } from '@auth/models/search.model';
import {
  filter,
  map,
  tap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  @Input() gridView: boolean = false;
  @ViewChild('searchQuery') searchQueryElement!: ElementRef;
  @Input() btnName: string = '';
  @Input() btnIcon: string = '';
  @Output() btnAction = new EventEmitter();
  @Output() searchAction = new EventEmitter();
  @Output() searchModeEvent = new EventEmitter();
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();

  public searchMode: boolean = false;
  public searchForm = new FormControl('');
  public searchResults: SearchCategory[] = [];
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(this.searchQueryElement.nativeElement, 'keyup')
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(async (event: any) => {
          this.searchAction.emit(true);

        })
      )
      .subscribe();
  }
  public btnPressed(): void {
    this.btnAction.emit();
  }

  public searchPressed(): void {
    this.searchAction.emit(true);
  }

  public getSearchQuery(
    searchQuery: string,
    event: KeyboardEvent | any,
    clear?: boolean
  ): void {
    clear
      ? ((this.searchQueryElement.nativeElement.value = ''),
        (this.searchMode = false),
        (this.searchResults = []),
        this.searchModeEvent.emit(false))
      : null;
    this.searchQuery.emit(searchQuery);
    // var key = event.key || event.keyCode;
    // if (key == 'Enter' || key == 8 || searchQuery == '') {
    // }
  }
}

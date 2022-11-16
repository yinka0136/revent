import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '@shared/services/settings.service';
import { Base } from '@core/base/base-component';
import { CurrentUserService } from '@core/services/current-user.service';
import { SearchHistoryServiceService } from './../../services/search-history-service.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
  filter,
  map,
  tap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, fromEvent, of } from 'rxjs';
import { ResponseModel } from '@core/models/response.model';
import { SearchCategory } from '@auth/models/search.model';
import { Fragments } from '@auth/models/fragment.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
// import { environment } from "@env/environment";
// import { CurrentUserService } from "@services/current-user/current-user.service";

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  public screen!: string;
  @ViewChild('searchQuery', { static: false }) searchQueryElement!: ElementRef;
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  public searchForm = new FormControl('');
  public searchTerms: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  public searchMode: boolean = false;
  public searchResults: SearchCategory[] = [];
  public isLoading: boolean = false;
  public searchHistory: any[] = [];

  @Input() scrolled!: boolean;
  @ViewChild('header') header!: ElementRef<HTMLDivElement>;
  public guest!: boolean;
  public showSideNav = false;
  public fragments = Fragments;
  public activeFragment: string = 'Home';
  constructor(
    private _search: SearchHistoryServiceService,
    private _current: CurrentUserService,
    private _base: Base,
    public mediaObserver: MediaObserver,
    private _setting: SettingsService,
    private route: ActivatedRoute
  ) {
    this._base.addSubscription(
      this.mediaObserver
        .asObservable()
        .pipe(
          filter((changes: MediaChange[]) => changes.length > 0),
          map((changes: MediaChange[]) => changes[0])
        )
        .subscribe((change: MediaChange) => {
          this.screen = change.mqAlias;
        })
    );
    this.guest = !_current.getCurrentUser();
  }
  ngAfterViewInit() {
    fromEvent(this.searchQueryElement.nativeElement, 'keyup')
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(async (event: any) => {
          this.handleSubmit();
        })
      )
      .subscribe();
  }
  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: any) => {
      if (fragment) {
        this.activeFragment = fragment;
      }
    });
  }

  /**
   * Toggle the visibility of the side-nav.
   */
  public toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  public setSearchMode(): void {
    this.searchMode = !this.searchMode;
  }

  public getsearchHistory(): void {
    this._search.updateSearchHistory.subscribe(() => {
      this.searchHistory = this._search
        .getAllSearchHistoriesByEmail(this._current.getUser().email)
        .reverse();
    });
  }

  public clearAllSearchList(): void {
    this._search.clearAll(this._current.getUser().email);
    this.getsearchHistory();
  }

  public getSearchQuery(
    searchQuery: string,
    event: KeyboardEvent | any,
    clear?: boolean
  ): void {
    clear
      ? ((this.searchQueryElement.nativeElement.value = ''),
        (this.searchMode = false),
        (this.searchResults = []))
      : null;
    this.searchQuery.emit(searchQuery);
    var key = event.key || event.keyCode;
    // if (key == 'Enter' || key == 8 || searchQuery == '') {
    //   this.handleSubmit();
    // }
  }

  public stopBubbling(event: any): void {
    event.stopPropagation();
  }

  public registerAutoSuggest(): void {
    // this.searchForm.valueChanges
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     filter((term: string) => {
    //       return term.trim().length > 2;
    //     }),
    //     tap((_) => {
    //       this._base.loading$.next(true);
    //       this.searchTerms.next([]);
    //     }),
    //     switchMap((search_phrase: string) => {
    //       return this._search.autoSuggest({ search_phrase }).pipe(
    //         catchError((err) => {
    //           this.searchTerms.next([]);
    //           this._base.loading$.next(false);
    //           return of(err);
    //         })
    //       );
    //     })
    //   )
    //   .subscribe(
    //     (data: any) => {
    //       if (!data.error) {
    //         const autoSuggestTerms: string[] = Object.values(
    //           data['auto-suggest-terms'][0]
    //         );
    //         this._base.loading$.next(false);
    //         this.searchTerms.next(autoSuggestTerms);
    //       }
    //     },
    //     (error) => {
    //       this.searchTerms.next([]);
    //       this._base.loading$.next(false);
    //     }
    //   );
  }

  public optionSelected({ option: { value } }: any) {
    this.searchForm.patchValue(value, { emitEvent: false });
    // this.handleSubmit();
  }

  public handleSubmit(): void {
    this.isLoading = true;
    this._base.addSubscription(
      this._setting
        .getGeneralSearch(this.searchQueryElement.nativeElement.value)
        .subscribe(
          (res: ResponseModel<SearchCategory[]>) => {
            this.isLoading = false;
            this.searchResults = res.data;
          },
          (error) => {
            this.isLoading = false;
          }
        )
    );
  }
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}

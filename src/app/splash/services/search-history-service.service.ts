import { Injectable } from '@angular/core';
import { selectFields } from '@shared/helpers';
import { HttpService } from '@shared/services/http.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryServiceService {
  constructor(private _localStorageAs: LocalStorageService,private http: HttpService) {}
  public updateSearchHistory: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public setSearchHistoryStore() {
    const searchHistory = this._localStorageAs.get('searchHistory');
    if (!searchHistory) {
      this._localStorageAs.set('searchHistory', JSON.stringify({}));
    }
  }

  getAllSearchHistories() {
    return JSON.parse(this._localStorageAs.get('searchHistory'));
  }

  getAllSearchHistoriesByEmail(email: string): any[] {
    let result = JSON.parse(this._localStorageAs.get('searchHistory'))[
      `${email}`
    ];
    if (!result) {
      this.instantiateUser(email);
    }
    return JSON.parse(this._localStorageAs.get('searchHistory'))[`${email}`];
  }

  public setSearchHistory(email: string, activity: any) {
    let searchHistories = this.getAllSearchHistories();
    let searchHistory: any[] = searchHistories[`${email}`] || [];
    if (this.isUnique(searchHistory, activity)) {
      searchHistory.push(activity);
      searchHistory =
        searchHistory.length > 4 ? searchHistory.slice(1) : searchHistory;
    }
    let newSearchHistories = {
      ...searchHistories,
      [email]: searchHistory,
    };
    this._localStorageAs.set(
      'searchHistory',
      JSON.stringify(newSearchHistories)
    );
  }

  isUnique(arr: any[], value: any): boolean {
    for (const obj of arr) {
      if (obj.link === value.link) {
        return false;
      }
    }
    return true;
  }

  clearAll(email: string) {
    this.instantiateUser(email);
  }

  instantiateUser(email: string) {
    let searchHistories = this.getAllSearchHistories();
    let newSearchHistories = { ...searchHistories, [email]: [] };
    this._localStorageAs.set(
      'searchHistory',
      JSON.stringify(newSearchHistories)
    );
  }


  public search(params: any): Observable<any> {
    
    const endpoint = `search/global/searchblox`;
    const { search_phrase, ...rest } = params;
    const fields = selectFields({ search_phrase }, Object.keys(rest), rest);
    return this.http.getRequestWithParams(endpoint, fields);
  }

  public autoSuggest(params: any): Observable<any> {
    const endpoint = `search/global/searchblox/auto-suggest`;
    const { search_phrase, ...rest } = params;
    const fields = selectFields({ search_phrase }, Object.keys(rest), rest);
    return this.http.getRequestWithParams(endpoint, fields);
  }
}

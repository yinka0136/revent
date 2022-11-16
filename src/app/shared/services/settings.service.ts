import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchCategory } from '@auth/models/search.model';
import { ResponseModel } from '@core/models/response.model';
import { LandingCount } from '@shared/models/shared.model';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpService) {}

  public getCountries(): Observable<ResponseModel<any>> {
    const endpoint = 'Settings/countries';
    return this.http.getRequest(endpoint);
  }

  public getLandingCount(): Observable<ResponseModel<LandingCount>> {
    const endpoint = 'Settings/dashboard-count';
    return this.http.getRequest(endpoint);
  }

  public getGeneralSearch(
    searchQuery: string
  ): Observable<ResponseModel<SearchCategory[]>> {
    const params = new HttpParams().set('searchQuery', searchQuery);
    const endpoint = 'Settings/general-search';
    return this.http.getRequestWithParams(endpoint, params);
  }
}

import { Router } from '@angular/router';
import { SettingsService } from './../../services/settings.service';
import { LoginResponseDTO } from '@auth/models/auth.model';
import { Component, OnInit } from '@angular/core';
import {
  InitialSearchDTO,
  ResponseModel,
  SearchDTO,
} from '@core/models/response.model';
import { CurrentUserService } from '@core/services/current-user.service';
// import {
//   Notification,
//   NotificationStatusEnum,
// } from '@shared/models/notification.model';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { UtilityService } from '@shared/services/utility.service';
import { SearchCategory } from '@auth/models/search.model';
import { Base } from '@core/base/base-component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user!: LoginResponseDTO | any;
  public notifications: Notification[] = [];
  // public notificationStatusEnum = NotificationStatusEnum;
  public isFetchingNotification: boolean = false;
  public fetchedNotifications: any;
  public searchQuery: SearchDTO = { ...InitialSearchDTO, search: '' };
  public initial!: string;
  public searchResults: SearchCategory[] = [];
  public isLoading: boolean = false;
  public searchMode = false;
  constructor(
    private _loacalStorageAS: LocalStorageService,
    public _utils: UtilityService,
    private _currentUser: CurrentUserService,
    private _setting: SettingsService,
    private _base: Base,
    private router: Router
  ) {
    this._loacalStorageAS.watch('klinicly_user').subscribe((_res: any) => {
      if (_res) {
        this.user = _res;
        this.initial = this._utils.getInitial(this.user.userName);
      }
    });
  }

  ngOnInit(): void {
    // this.getNotifications();
  }

  public goToLanding(): void {
    this.router.navigate(['']);
  }

  // public getNotifications(): void {
  //   this.isFetchingNotification= true;
  //   this._utils.getNotifications().subscribe({
  //     next: (res: ResponseModel<any>) => {
  //       this.isFetchingNotification = false;
  //       this.fetchedNotifications = res.response.notifications;
  //       // console.log(this.fetchedNotifications.notifications);
  //     },
  //     error: (error: ResponseModel<any>) => {
  //       this.isFetchingNotification = false;
  //     },
  //   });
  // }

  public logout(): void {
    this._currentUser.logOut();
  }

  public searchQueryAction(searchQuery: string): void {
    this.searchMode = true;
    this.searchQuery.search = searchQuery.toLocaleLowerCase().trim();
  }
  public getSearchMode(mode: boolean): void {
    this.searchMode = mode;
  }
  public search(): void {
    this.searchMode = true;

    this.isLoading = true;
    this._base.addSubscription(
      this._setting.getGeneralSearch(this.searchQuery.search).subscribe(
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
}

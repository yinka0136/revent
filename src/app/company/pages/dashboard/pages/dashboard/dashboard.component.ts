import { Base } from '@core/base/base-component';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthService } from '@auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from '@core/models/response.model';
import { LoginResponseDTO } from '@auth/models/auth.model';
import { timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { DasboardCount } from '../../models/dashboard.model';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public isLoadingDashboardCount: boolean = false;
  public isLoadingAccessKey: boolean = false;
  public key: string = '';
  public error_message: string = '';
  public dashboardCount: DasboardCount | undefined;
  public userName!: string;

  public hour!: number;
  constructor(
    private _auth: AuthService,
    private _localStorageAs: LocalStorageService,
    private _base: Base
  ) {
    this._base.addSubscription(
      timer(0, 1000)
        .pipe(
          map(() => new Date().getHours()),
          share()
        )
        .subscribe((time) => {
          this.hour = time;
        })
    );
    this._localStorageAs
      .watch('klinicly_user')
      .subscribe((res: LoginResponseDTO) => {
        if (res) {
          this.userName = res?.userName;
        }
      });
  }

  ngOnInit(): void {
    this.getDashboard();
    this.getAccessKey();
  }

  public getDashboard(): void {
    this.isLoadingDashboardCount = true;
    this._auth.getDashboard().subscribe({
      next: (res: ResponseModel<DasboardCount>) => {
        this.isLoadingDashboardCount = false;
        this.dashboardCount = res.data;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoadingDashboardCount = false;
      },
    });
  }

  public getAccessKey(): void {
    this.error_message = '';
    this.isLoadingAccessKey = true;
    this._auth.getAccessKey().subscribe({
      next: (res: ResponseModel<any>) => {
        this.isLoadingAccessKey = false;
        this._localStorageAs.set('accessToken', JSON.stringify(res.data));
      },
      error: (error: HttpErrorResponse) => {
        this.isLoadingAccessKey = false;
        this.error_message = error.error?.Message;
      },
    });
  }
}

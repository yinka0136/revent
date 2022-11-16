import { CurrentUserService } from '@core/services/current-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Base } from '@core/base/base-component';
import { AuthService } from '@auth/services/auth.service';
import { ResponseModel } from '@core/models/response.model';

@Component({
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  public error_message: string = '';
  public isLoading: boolean = false;
  public code!: string;
  public userId!: string;
  constructor(
    private route: ActivatedRoute,
    private _base: Base,
    private _auth: AuthService,
    private router: Router,
    private _current: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      if (res?.code) {
        this.code = res?.code;
        this.userId = res?.userId;
        this.confirm();
      }
    });
  }

  public confirm(): void {
    this.isLoading = true;
    this._base.addSubscription(
      this._auth
        .confirmEmail({ userId: this.userId, code: this.code })
        .subscribe(
          (res: ResponseModel<any>) => {
            this.isLoading = false;
            this._base.openSnackBar(res?.message);
            this._current.storeUserDetails(res.data);
            const redirectTo = 'pay';
            this.router.navigateByUrl(redirectTo);
          },
          (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.error_message = error?.error?.message;
          }
        )
    );
  }
}

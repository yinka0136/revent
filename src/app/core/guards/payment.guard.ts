import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { CurrentUserService } from '@core/services/current-user.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private router: Router,
    private _current: CurrentUserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.confirmPayment();
  }

  public confirmPayment(): any {
    const isLoggedIn = this._current.isLoggedIn();
    this._auth.getAccessKey().subscribe({
      next: (res: any) => {
        return true;
      },
      error: (error: HttpErrorResponse) => {
        if (isLoggedIn) {
          this.router.navigate(['pay']);
        } else {
          this.router.navigate(['login']);
        }

        return false;
      },
    });
  }
}

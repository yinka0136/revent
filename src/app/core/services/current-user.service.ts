import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { currentPlan, ICurrentUser } from '@core/models/user.model';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private currentUser: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(
    private _localStorageAS: LocalStorageService,
    private router: Router
  ) {}

  public logOut(): void {
    localStorage.clear();
    this._localStorageAS.clear();
    this.router.navigate(['login']);
  }

  public isLoggedIn(): boolean {
    const klinicly_user = JSON.parse(
      localStorage.getItem('klinicly_user') || 'null'
    );

    if (klinicly_user !== null && klinicly_user !== undefined) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param docstream_token
   * @returns
   * TODO:
   * -Setup when you see the structure
   */

  public storeUserCredentials(
    // responseData: UserDetailsResponseDTO,
    token: string
  ): void {
    // localStorage.setItem(
    //   Helpers.STORAGE_TAG,
    //   JSON.stringify({ ...responseData, token })
    // );
  }

  public storeUserDetails(userDetails: any) {
    this._localStorageAS.remove('klinicly_user');
    this._localStorageAS.set('klinicly_user', userDetails);
    this.setUser();
  }

  public updateToken(token: string): void {
    const { jwToken, ...user } = this.getCurrentUser();
    const newUserDetails = { jwToken: token, ...user };
    this.storeUserDetails(newUserDetails);
  }

  public updatePlanObject(planObj: currentPlan): void {
    const { currentSubscription, ...user } = this.getCurrentUser();
    const newUserDetails = { currentSubscription: planObj, ...user };
    this.storeUserDetails(newUserDetails);
  }
  public setUser() {
    this.currentUser.next(this.getUser());
  }

  public getUser() {
    const { jwToken, ...user } = this.getCurrentUser();
    return user;
  }


  public getUserRole(): string[] {
    return this.getCurrentUser()?.roles ?? null;
  }

  public getCurrentUser(): ICurrentUser {
    const user = JSON.parse(this._localStorageAS.get('klinicly_user')) || false;
    return user;
  }

  // private decrypt_jwt(docstream_token: string): any {
  //   if (docstream_token) {
  //     const decoded = this._jwt.decodeToken(docstream_token);
  //     return decoded;
  //   }
  //   return null;
  // }

  public getAuthToken(): string | void {
    const user = this.getCurrentUser();
    if (user) {
      return user.jwToken;
    } else {
      this.logout();
    }
  }

  logout(authExpired = false) {
    this.clearStorage();
    this.router.navigate(['/']);
  }

  public getCurrentUserObservable() {
    return this.currentUser.asObservable();
  }
  public clearStorage() {
    this._localStorageAS.clear();
  }
}

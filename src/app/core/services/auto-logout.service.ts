import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from '@core/base/base-component';

@Injectable({
  providedIn: 'root',
})
export class AutoLogoutService {
  //log off details
  private isLogin = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private _base: Base
  ) {}
  public run() {
    if ((localStorage.getItem('docstream_token') || 'null') != null) {
      this.isLogin = true;
    }
    this.lastAction(Date.now());
    this.check();
    this.initListener();
    this.initInterval();
  }

  /**
   * last action
   */
  private getLastAction() {
    return localStorage.getItem('lastAction');
  }

  /**
   * set last action
   * @param value
   */
  private lastAction(value: number) {
    localStorage.setItem('lastAction', JSON.stringify(value));
  }

  /**
   * start event listener
   */
  private initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  /**
   * time interval
   */
  private initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    });
  }

  /**
   * reset timer
   */
  private reset() {
    this.lastAction(Date.now());
  }

  /**
   * check timer
   */
  private check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction() as string) + 5 * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    this.ngZone.run(() => {
      if (isTimeout && this.isLogin) {
        localStorage.clear();
        setTimeout(() => {
          // this._base.pushMessage(
          //   'Your Session Expired due to longer Inactivity, Login Again To Continue'
          // );
        }, 1000);
        // this._base.closAllDialogs();
        this.router.navigate(['authentication/login']);
      }
    });
  }
}

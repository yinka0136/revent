import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CurrentUserService } from '@core/services/current-user.service';

@Directive({
  selector: '[rbacAllow]',
})
export class RbacDirective {
  public allowedRoles: string[] = [];
  public userRoles: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private _current: CurrentUserService
  ) {
    this.userRoles = this._current.getUserRole();
  }
  @Input()
  set rbacAllow(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
    this.showIfUserAllowed();
  }

  public showIfUserAllowed(): void {
    if (
      this.userRoles == null ||
      this.userRoles == undefined ||
      !this.allowedRoles ||
      this.allowedRoles.length == 0
    ) {
      this.viewContainer.clear();
      return;
    }
    // this.allowedRoles.includes(this.userRoles);
    const allowed = this.userRoles.some((role) =>
      this.allowedRoles.includes(role)
    );

    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
    return;
  }
}

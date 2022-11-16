import { RoleEnum } from './../../../shared/models/role.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponseDTO } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { ResponseModel } from '@core/models/response.model';
import { Base } from '@core/base/base-component';
import { CurrentUserService } from '@core/services/current-user.service';
import { CustomValidator } from '@shared/helpers';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  public loginForm!: FormGroup;
  public isLoading: boolean = false;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _base: Base,
    private _auth: AuthService,
    private _current: CurrentUserService,
    private router: Router
  ) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          CustomValidator.patternValidator(/\d/, {
            hasNumber: true,
          }),
          CustomValidator.patternValidator(/[A-Z]/, {
            hasCapitalCase: true,
          }),
          CustomValidator.patternValidator(/[a-z]/, {
            hasSmallCase: true,
          }),
          CustomValidator.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
          Validators.minLength(8),
        ],
      ],
    });
  }
  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.login();
    }
  }

  public login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this._base.addSubscription(
      this._auth.login(this.loginForm.value).subscribe(
        (res: ResponseModel<LoginResponseDTO>) => {
          if (res?.data?.jwToken) {
            this.isLoading = false;
            this._current.storeUserDetails(res.data);
            const redirectTo = res.data.roles.includes(RoleEnum.User)
              ? 's'
              : 'c';
            this.router.navigateByUrl(redirectTo);
          } else {
            this.router.navigateByUrl('verify');
          }
        },
        (error: HttpErrorResponse) => {
          if (error?.status == 406) {
            this.isLoading = false;
            this.router.navigate(['sent', this.loginForm.value.email]);
          }
          this.isLoading = false;
        }
      )
    );
  }
}

import { ICurrentUser } from '@core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Base } from '@core/base/base-component';
import { ResponseModel } from '@core/models/response.model';
import { CustomValidator } from '@shared/helpers';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  public passwordForm!: FormGroup;
  public isLoading: boolean = false;
  public showPassword: boolean = false;
  public showNewPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public email!: string;
  constructor(
    private fb: FormBuilder,
    private _base: Base,
    private _auth: AuthService,
    private _loacalStorageAS: LocalStorageService
  ) {
    _loacalStorageAS.watch('klinicly_user').subscribe((_res: ICurrentUser) => {
      if (_res) {
        this.email = _res.email;
      }
    });
  }

  ngOnInit(): void {
    this.initializePasswordForm();
  }

  public initializePasswordForm(): void {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
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
        confirmPassword: ['', [Validators.required]],
      },
      { validator: CustomValidator.passwordMatchValidator }
    );
  }

  public change(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const payload = this.passwordForm.value;
    payload.newPassword = this.passwordForm.value.password;
    payload.email = this.email;
    delete payload.password;
    delete payload.confirmPassword;
    this._base.addSubscription(
      this._auth.changePassword(payload).subscribe(
        (res: ResponseModel<any>) => {
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      )
    );
  }
}

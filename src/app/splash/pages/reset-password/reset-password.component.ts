import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Base } from '@core/base/base-component';
import { CustomValidator } from '@shared/helpers';
import { ResponseModel } from '@core/models/response.model';

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public resetForm!: FormGroup;
  public isLoading: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public email!: string;
  public token!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _base: Base,
    private _auth: AuthService,
    private router: Router
  ) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      if (res?.code) {
        this.email = res?.code;
        this.token = res?.code;
      }
    });
  }

  public initializeLoginForm(): void {
    this.resetForm = this.fb.group(
      {
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

  public reset(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this._base.addSubscription(
      this._auth.resetPassword(this.resetForm.value).subscribe(
        (res: ResponseModel<any>) => {
          this.isLoading = false;
          this.router.navigate(['authentication/login']);
        },
        (error) => {
          this.isLoading = false;
        }
      )
    );
  }
  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      // this.login();
    }
  }
}

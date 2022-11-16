import { CurrentUserService } from '@core/services/current-user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginResponseDTO } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { Base } from '@core/base/base-component';
import { Roles } from '@core/models/core.model';
import { ResponseModel } from '@core/models/response.model';
import { CustomValidator } from '@shared/helpers';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registrationForm!: FormGroup;
  public isLoading: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public roles = Roles;
  public planId!: string | undefined;
  constructor(
    private fb: FormBuilder,
    private _base: Base,
    private _auth: AuthService,
    private router: Router,
    private _current: CurrentUserService,
    private route: ActivatedRoute
  ) {
    this.initializeRegistrationForm();
  }

  ngOnInit(): void {
    this.planId =
      (this.route.snapshot.queryParamMap.get('planId') as string) || undefined;
  }

  public initializeRegistrationForm(): void {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        otherName: ['', [Validators.required]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(14),
            Validators.pattern('[+]?[0-9]*'),
          ],
        ],
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
        roleId: [3],
      },
      { validator: CustomValidator.passwordMatchValidator }
    );
  }
  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.register();
    }
  }

  public register(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this._base.addSubscription(
      this._auth.register(this.registrationForm.value).subscribe(
        (res: ResponseModel<string>) => {
          this.isLoading = false;
          this.router.navigate(['sent', this.registrationForm.value.email]);
        },
        (error) => {
          this.isLoading = false;
        }
      )
    );
  }
}

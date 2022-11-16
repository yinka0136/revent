import { ResponseDialogComponent } from './../../../shared/dialogs/response-dialog/response-dialog.component';
import { Base } from '@core/base/base-component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginResponseDTO } from '@auth/models/auth.model';
import { ResponseModel } from '@core/models/response.model';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { CurrentUserService } from '@core/services/current-user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  public timeLeft: number = 0;
  public today = new Date();
  public forgotForm!: FormGroup;
  public isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _base: Base,
    private _auth: AuthService,
    private _current: CurrentUserService,
    private router: Router,
    private _dialog: MatDialog
  ) {
    this.initializeForgotForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  get email() {
    return this.forgotForm.get('email');
  }

  public initializeForgotForm(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      // this.login();
    }
  }

  public startTimer() {
    let interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  public forgot(): void {
    this.openSuccesssModal('Successful', 'success');
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.timeLeft = 60;
    this.startTimer();
    this._base.addSubscription(
      this._auth.forgotPassword(this.forgotForm.value).subscribe(
        (res: ResponseModel<LoginResponseDTO>) => {
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      )
    );
  }

  public openSuccesssModal(message: string, type: string): void {
    this._dialog.open(ResponseDialogComponent, {
      panelClass: 'modal-width',
      data: { message, type },
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginResponseDTO } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';
import { Base } from '@core/base/base-component';
import { ResponseModel } from '@core/models/response.model';

@Component({
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss'],
})
export class EmailSentComponent implements OnInit {
  public timeLeft: number = 0;
  public isLoading: boolean = false;
  public email!: string;

  constructor(
    private _base: Base,
    private _auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      if (res.email) {
        this.email = res.email;
      }
    });
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
    this.isLoading = true;
    this.timeLeft = 60;
    this.startTimer();
    this._base.addSubscription(
      this._auth.resendVerificationLink(this.email).subscribe(
        (res: ResponseModel<string>) => {
          this.isLoading = false;
          this._base.openSnackBar(res?.data);
        },
        (error) => {
          this.isLoading = false;
        }
      )
    );
  }
}

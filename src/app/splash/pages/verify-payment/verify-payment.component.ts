import { CurrentUserService } from '@core/services/current-user.service';
import { PaymentService } from '@core/services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base } from '@core/base/base-component';
import { PaystackResponseDTO } from '@core/models/payment.model';
import { ResponseModel } from '@core/models/response.model';

@Component({
  templateUrl: './verify-payment.component.html',
  styleUrls: ['./verify-payment.component.scss'],
})
export class VerifyPaymentComponent implements OnInit {
  public error_message: string = '';
  public isLoading: boolean = false;
  public paymentResponse!: PaystackResponseDTO;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _base: Base,
    private _pay: PaymentService,
    private _current: CurrentUserService
  ) {
    this.route.queryParams.subscribe((res: any) => {
      if (res) {
        this.paymentResponse = res;
        this.confirm();
      }
    });
  }

  ngOnInit(): void {}

  public confirm(): void {
    this.isLoading = true;
    this._base.addSubscription(
      this._pay.verify(this.paymentResponse.trxref).subscribe(
        (res: ResponseModel<any>) => {
          this.isLoading = false;
          this._base.openSnackBar(res?.message);
          this._current.updatePlanObject(res.data);
          const redirectTo = 'dashboard';
          this.router.navigateByUrl(redirectTo);
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.error_message = error?.error?.message;
        }
      )
    );
  }
}

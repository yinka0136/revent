import { CurrentUserService } from '@core/services/current-user.service';
import { Router } from '@angular/router';
import { PaymentDurationComponent } from './../../../shared/dialogs/payment-duration/payment-duration.component';
import { PlanRequestDTO } from '@shared/models/shared.model';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '@core/services/payment.service';
import { ResponseModel } from '@core/models/response.model';
import { Base } from '@core/base/base-component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { currentPlan, ICurrentUser } from '@core/models/user.model';

@Component({
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  public selectedPlanId: string = '';
  public currentPlan!: currentPlan;

  public plans: PlanRequestDTO[] = [
    {
      amountPerMonth: 0,
      apiCallCount: 100,
      discountPerYear: 0,
      features: [
        { name: 'Free chat support' },
        { name: 'No call support' },
        { name: 'Free 100 API calls' },
      ],
      id: 'd1c6ab91-96f1-4871-820b-4bf6e7f269c8',
      name: 'Free Trial',
    },
    {
      amountPerMonth: 10000,
      apiCallCount: 500000,
      discountPerYear: 2,
      features: [
        { name: '1000000 API calls' },
        { name: 'Free call support' },
        { name: 'Free chat support' },
      ],
      id: '751cd2a9-8321-43ec-9961-80d6c954be88',
      name: 'Basic',
    },
    {
      amountPerMonth: 100000,
      apiCallCount: 50000000,
      discountPerYear: 3,
      features: [
        { name: 'Free call support' },
        { name: 'Free chat support' },
        { name: '100000000 API calls' },

        { name: 'Free technical support' },
      ],
      id: '8bda847f-9c49-4063-ad6a-3bebfddfb5b5',
      name: 'Premium',
    },
  ];
  public isIntializingPayment: boolean = false;
  constructor(
    private _payment: PaymentService,
    private _base: Base,
    public dialog: MatDialog,
    private router: Router,
    private _current: CurrentUserService,
    private _localStorageAs: LocalStorageService
  ) {
    _localStorageAs.watch('klinicly_user').subscribe((res: ICurrentUser) => {
      if (res) {
        this.currentPlan = res.currentSubscription;
      }
    });
  }

  ngOnInit(): void {}

  public setSelected(planId: string): void {
    this.selectedPlanId = planId;
  }

  public initializePayment(duration: number): void {
    this.isIntializingPayment = true;
    this._base.addSubscription(
      this._payment
        .Initialize({
          planId: this.selectedPlanId,
          durationInMonths: duration,
        })
        .subscribe(
          (res: ResponseModel<string>) => {
            this.isIntializingPayment = false;
            if (res.data.includes('http')) {
              window.open(res.data, '_self');
              return;
            }
            this._current.updateToken(res?.data);
            this.router.navigate(['dashboard']);
          },
          (error) => {
            this.isIntializingPayment = false;
          }
        )
    );
  }

  public openMonthsModal(): void {
    if (
      this.selectedPlanId === null ||
      this.selectedPlanId === undefined ||
      this.selectedPlanId === ''
    ) {
      this._base.openSnackBar('Select a plan', 'error');
      return;
    }
    const dialogRef = this.dialog.open(PaymentDurationComponent, {
      panelClass: 'modal-width',
    });
    dialogRef.componentInstance.duration.subscribe((duration: number) => {
      dialogRef.close();
      this.initializePayment(duration);
    });
  }
}

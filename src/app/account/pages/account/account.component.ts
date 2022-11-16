import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICurrentUser } from '@core/models/user.model';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public accountForm!: FormGroup;
  public user!: ICurrentUser;
  constructor(
    private fb: FormBuilder,
    private _loacalStorageAS: LocalStorageService
  ) {
    _loacalStorageAS.watch('klinicly_user').subscribe((_res: ICurrentUser) => {
      if (_res) {
        this.user = _res;
      }
    });
  }

  ngOnInit(): void {
    this.initializeAccountForm();
  }

  public initializeAccountForm(): void {
    this.accountForm = this.fb.group({
      firstName: [
        this.user ? this.user.userName.split(' ')[0] : '',
        [Validators.required],
      ],
      lastName: [
        this.user ? this.user.userName.split(' ')[1] : '',
        [Validators.required],
      ],
      email: [
        this.user ? this.user.email : '',
        [Validators.required, Validators.email],
      ],

      country: [['Nigeria'], [Validators.required]],
    });
    this.accountForm.disable();
  }
}

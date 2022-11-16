import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { LayoutComponent } from './layout/layout.component';
import { PasswordComponent } from './pages/password/password.component';

@NgModule({
  declarations: [AccountComponent, LayoutComponent, PasswordComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}

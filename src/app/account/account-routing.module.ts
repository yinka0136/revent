import { AccountComponent } from './pages/account/account.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PasswordComponent } from './pages/password/password.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'i', component: AccountComponent },
      { path: 'p', component: PasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'i' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

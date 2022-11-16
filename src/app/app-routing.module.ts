import { PaymentGuard } from './core/guards/payment.guard';
import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { RouteGuard } from '@core/guards/route.guard';
import { LayoutComponent } from '@shared/components/layout/layout.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  preloadingStrategy: PreloadAllModules,
};
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [RouteGuard, PaymentGuard],
    children: [
      {
        path: 'c',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 's',
        loadChildren: () =>
          import('./subscriber/subscriber.module').then(
            (m) => m.SubscriberModule
          ),
      },

      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      // },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'ticket',
        loadChildren: () =>
          import('./ticket/ticket.module').then((m) => m.TicketModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

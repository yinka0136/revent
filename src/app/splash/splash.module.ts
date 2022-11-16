import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashRoutingModule } from './splash-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ImpactComponent } from './components/impact/impact.component';
import { BurdenComponent } from './components/burden/burden.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { SocialsComponent } from './components/socials/socials.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EmailSentComponent } from './pages/email-sent/email-sent.component';
import { PayComponent } from './pages/pay/pay.component';
import { VerifyPaymentComponent } from './pages/verify-payment/verify-payment.component';
import { CountComponent } from './components/count/count.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    AboutComponent,
    ImpactComponent,
    BurdenComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AuthLayoutComponent,
    SocialsComponent,
    EmailSentComponent,
    PayComponent,
    VerifyPaymentComponent,
    CountComponent,
  ],
  imports: [
    CommonModule,
    SplashRoutingModule,
    SharedModule,
    MatAutocompleteModule,
  ],
  exports: [
    CountComponent
  ],
})
export class SplashModule {}

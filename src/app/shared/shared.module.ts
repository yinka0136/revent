import { PreloaderComponent } from './components/preloader/preloader.component';
import { EmptySearchViewComponent } from './components/empty-search-view/empty-search-view.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { MaterialModule } from './../material/material.module';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ReusableSideDrawerDirective } from './directives/reusable-side-drawer.directive';
import { ReusableSideDrawerComponent } from './components/reusable-side-drawer/reusable-side-drawer.component';
import { ReportCardComponent } from './components/report-card/report-card.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { PlansComponent } from './components/plans/plans.component';
import { EmptySearchHistoryComponent } from './components/empty-search-history/empty-search-history.component';
import { PaymentDurationComponent } from './dialogs/payment-duration/payment-duration.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { RbacDirective } from './directives/rbac.directive';
import { ResponseDialogComponent } from './dialogs/response-dialog/response-dialog.component';

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    NoDataComponent,
    ReusableSideDrawerDirective,
    ReusableSideDrawerComponent,
    SearchbarComponent,
    ReportCardComponent,
    MainHeaderComponent,
    PlansComponent,
    EmptySearchHistoryComponent,
    EmptySearchViewComponent,
    PaymentDurationComponent,
    SearchResultsComponent,
    RbacDirective,
    ResponseDialogComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    GlobalLoaderComponent,
    MaterialModule,
    ReusableSideDrawerDirective,
    ReportCardComponent,
    MainHeaderComponent,
    PlansComponent,
    EmptySearchHistoryComponent,
    EmptySearchViewComponent,
    PaymentDurationComponent,
    SearchResultsComponent,
    RbacDirective,
    ResponseDialogComponent,PreloaderComponent
  ],
})
export class SharedModule {}

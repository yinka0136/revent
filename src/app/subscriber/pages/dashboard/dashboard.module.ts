import { UpgradePlanComponent } from './pages/upgrade-plan/upgrade-plan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { KeyComponent } from './components/key/key.component';
import { GraphComponent } from './components/graph/graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { UpdatesComponent } from './components/updates/updates.component';

@NgModule({
  declarations: [
    DashboardComponent,
    KeyComponent,
    GraphComponent,
    UpgradeComponent,
    UpdatesComponent,
    UpgradePlanComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxChartsModule,
  ],
})
export class DashboardModule {}

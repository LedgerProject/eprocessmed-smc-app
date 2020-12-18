import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Modules */
import { SharedModule } from './components/shared/shared.module';

/* Components */
import { DrDashboardComponent } from './components/dr-dashboard/dr-dashboard.component';
import { GenDashboardComponent } from './components/gen-dashboard/gen-dashboard.component';
import { GeneralComponent } from './general/general.component';
import { CreateConsentsComponent } from '../process-mngmt/components/consents/create-consents/create-consents.component';
import { ViewConsentsComponent } from '../process-mngmt/components/consents/view-consents/view-consents.component';
import { ViewpatientsComponent } from '../process-mngmt/components/consents/view-patients/view-patients.component';
import { ViewProcessComponent } from '../process-mngmt/components/consents/view-process/view-process.component';
import { ViewStablishmentComponent } from '../process-mngmt/components/consents/view-stablishment/view-stablishment.component';
import { ModalInfoBlockchaindComponent } from './components/shared/_presenters/modal-info-blockchaind/modal-info-blockchaind.component';

@NgModule({
  declarations: [
    GenDashboardComponent,
    DrDashboardComponent,
    GeneralComponent,
    CreateConsentsComponent,
    ViewConsentsComponent,
    ViewpatientsComponent,
    ViewProcessComponent,
    ViewStablishmentComponent,
    ModalInfoBlockchaindComponent
  ],
  exports: [
    GenDashboardComponent,
    DrDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class GeneralModule { }

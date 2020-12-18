import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/* Modules */
import { GeneralModule } from '../general/general.module';

/* Components */
import { AdmDashboardComponent } from "./adm-dashboard/adm-dashboard.component";

@NgModule({
  declarations: [
    AdmDashboardComponent
  ],
  exports: [
    AdmDashboardComponent
  ],
  imports: [
    CommonModule,
    GeneralModule,
    RouterModule
  ],
})
export class AdminModule { }

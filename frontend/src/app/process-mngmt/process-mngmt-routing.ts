import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { formatCurrency } from '@angular/common';

/* Routes */
import { FeatureRoutingModule } from './components/consents/consents-routing';

const routes: Routes = [

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FeatureRoutingModule
  ],
  exports: [
    RouterModule,
    FeatureRoutingModule
  ]
})
export class ProcessRoutingModule {}

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { AdmDashboardComponent } from './adm-dashboard/adm-dashboard.component';

/* Guards */
import { AdminGuard } from './../security/guard/admin.guard';

const routes: Routes = [
  { path: 'adm-dashboard', component: AdmDashboardComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

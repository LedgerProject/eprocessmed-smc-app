import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { GeneralComponent } from './general/general.component';
import { GenDashboardComponent } from './components/gen-dashboard/gen-dashboard.component';
import { DrDashboardComponent } from './components/dr-dashboard/dr-dashboard.component';
import { CreateConsentsComponent } from "../process-mngmt/components/consents/create-consents/create-consents.component";
import { ViewConsentsComponent } from "../process-mngmt/components/consents/view-consents/view-consents.component";
import { ViewpatientsComponent } from '../process-mngmt/components/consents/view-patients/view-patients.component';

/* Guards */
import { AuthGuard } from '../security/guard/auth.guard';
import { DoctorGuard } from '../security/guard/doctor.guard';
import { ViewProcessComponent } from '../process-mngmt/components/consents/view-process/view-process.component';
import { ViewStablishmentComponent } from '../process-mngmt/components/consents/view-stablishment/view-stablishment.component';

const routes: Routes = [
  { path: '',
    component: GeneralComponent,
    children: [
      { path: 'gen-dashboard', component: GenDashboardComponent, canActivate: [AuthGuard] },
      { path: 'dr-dashboard',
        component: DrDashboardComponent,
        children: [
          { path: 'create-consents', component: CreateConsentsComponent, canActivate: [AuthGuard, DoctorGuard] },
          { path: 'view-consents', component: ViewConsentsComponent, canActivate: [AuthGuard, DoctorGuard] },
          { path: 'view-patients', component: ViewpatientsComponent, canActivate: [AuthGuard, DoctorGuard] },
          { path: 'view-process', component: ViewProcessComponent, canActivate: [AuthGuard, DoctorGuard] },
          { path: 'view-stablishment', component: ViewStablishmentComponent, canActivate: [AuthGuard, DoctorGuard] },
          { path: '', redirectTo: '/dr-dashboard', pathMatch: 'full' }
        ],
        canActivate: [AuthGuard, DoctorGuard]
      }
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule {}

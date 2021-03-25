import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { DashboardComponent } from './components/dashboard/dashboard.component';

// import { CatalogsComponent } from '../admin/components/country/country.component';
// import { UsersComponent } from '../admin/components/province/province.component';
// import { ParametersComponent } from '../admin/components/city/city.component';

// import { CreateConsentsComponent } from "../process-mngmt/components/consents/create-consents/create-consents.component";

/* Guards */
import { AuthGuard } from '../security/guard/auth.guard';
import { DoctorGuard } from '../security/guard/doctor.guard';

/*  */
import { ProcessRoutingModule } from './../process-mngmt/process-mngmt-routing';

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/statistics', pathMatch: 'full' }
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ProcessRoutingModule
  ],
  exports: [RouterModule]
})
export class GeneralRoutingModule {}

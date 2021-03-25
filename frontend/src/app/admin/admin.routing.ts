import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { DashboardComponent } from '../general/components/dashboard/dashboard.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';
import { UsersComponent } from './components/users/users.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { StablishmentComponent } from './components/stablishment/stablishment.component';
import { PatientsComponent } from './components/patients/patients.component';

// import { GeneralModule } from '../general/general.module';

/* Guards */
import { AuthGuard } from './../security/guard/auth.guard';
import { AdminGuard } from './../security/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'statistics',
        component: StatisticsComponent,
        data: {
          title: 'Starter Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Starter Page', url: '/statistics' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/catalogs',
        component: CatalogsComponent,
        data: {
          title: 'Catalogs Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Catalogs Page', url: '/coucatalogsntry' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/users',
        component: UsersComponent,
        data: {
          title: 'Users Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Users Page', url: '/users' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/parameters',
        component: ParametersComponent,
        data: {
          title: 'Parameters Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Parameters Page', url: '/parameters' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/establishment',
        component: StablishmentComponent,
        data: {
          title: 'Establishment Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Establishment Page', url: '/establishment' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      }      ,
      {
        path: 'admin/patients',
        component: PatientsComponent,
        data: {
          title: 'Patients Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Patients Page', url: '/patients' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },      
      { path: '', redirectTo: '/statistics', pathMatch: 'full' }
    ],
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

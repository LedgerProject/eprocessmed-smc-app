import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { DashboardComponent } from '../general/components/dashboard/dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { StablishmentComponent } from './components/stablishment/stablishment.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ProcEstabComponent } from './components/proc-estab/proc-estab.component';

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
        path: 'welcome',
        component: WelcomeComponent,
        data: {
          title: 'Welcome',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Welcome', url: '/welcome' }
          ]
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/statistics',
        component: StatisticsComponent,
        data: {
          title: 'Starter',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Starter', url: '/statistics' }
          ]
        },
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/catalogs',
        component: CatalogsComponent,
        data: {
          title: 'Catalogs',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Catalogs', url: '/catalogs' }
          ]
        },
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/parameters',
        component: ParametersComponent,
        data: {
          title: 'Parameters',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Parameters', url: '/parameters' }
          ]
        },
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/establishment',
        component: StablishmentComponent,
        data: {
          title: 'Establishment',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Establishment', url: '/establishment' }
          ]
        },
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/patients',
        component: PatientsComponent,
        data: {
          title: 'Patients',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Patients', url: '/patients' }
          ]
        },
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'admin/proc-estab',
        component: ProcEstabComponent,
        data: {
          title: 'Procedures Establishments',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Procedures Establishments', url: '/proc-estab' }
          ]
        },
        canActivate: [AuthGuard, AdminGuard]
      },           
      { path: '', redirectTo: '/welcome', pathMatch: 'full' }
    ],
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { DashboardComponent } from '../general/components/dashboard/dashboard.component';
import { StatisticsComponent } from '../admin/components/statistics/statistics.component';


import { LngSwitchComponent } from './components/logins/lng-switch/lng-switch.component';


import { RolesEstabComponent } from './components/roles-estab/roles-estab.component';
import { UsersComponent } from './components/users/users.component';

/* Guards */
import { NotAuthGuard } from './guard/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'statistics',
        component: StatisticsComponent,
        data: {
          title: 'Starter',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Starter', url: '/statistics' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'security/users',
        component: UsersComponent,
        data: {
          title: 'Users',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Users', url: '/users' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'security/roles-estab',
        component: RolesEstabComponent,
        data: {
          title: 'Roles Establishments',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Roles Establishments', url: '/roles-estab' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      { path: '', redirectTo: '/statistics', pathMatch: 'full' }
    ],
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LngSwitchComponent
  },
  {
    path: 'consent',
    component: LngSwitchComponent
  },
  // { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}

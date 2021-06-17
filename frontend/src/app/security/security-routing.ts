import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { DashboardComponent } from '../general/components/dashboard/dashboard.component';
import { WelcomeComponent } from '../admin/components/welcome/welcome.component';


import { LngSwitchComponent } from './components/logins/lng-switch/lng-switch.component';


import { RolesEstabComponent } from './components/roles-estab/roles-estab.component';
import { UsersComponent } from './components/users/users.component';

/* Guards */
import { NotAuthGuard } from './guard/not-auth.guard';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

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
        path: 'security/users',
        component: UsersComponent,
        data: {
          title: 'Users',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Users', url: '/users' }
          ]
        },
        canActivate: [AuthGuard, AdminGuard]
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
        canActivate: [AuthGuard, AdminGuard]
      },
      { path: '', redirectTo: '/welcome', pathMatch: 'full' }
    ],
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LngSwitchComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'consent',
    component: LngSwitchComponent,
    canActivate: [NotAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}

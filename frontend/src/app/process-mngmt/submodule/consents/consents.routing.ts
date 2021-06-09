import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { DashboardComponent } from '../../../general/components/dashboard/dashboard.component';
import { SwitchDefaultDformsComponent } from '../../components/switch-default-dforms/switch-default-dforms.component';
import { SignatureHouseComponent } from './components/signature-house/signature-house.component';

// import { GeneralModule } from '../general/general.module';

/* Guards */
// import { AuthGuard } from './../security/guard/auth.guard';
// import { AdminGuard } from './../security/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'switch-default-dforms',
        component: SwitchDefaultDformsComponent,
        data: {
          title: 'Switch Default Dforms',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Switch Default Dforms', url: '/switch-default-dforms' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'consents/signature-house',
        component: SignatureHouseComponent,
        data: {
          title: 'Signature at home',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Signature at home', url: '/signature-house' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },     
      { path: '', redirectTo: '/switch-default-dforms', pathMatch: 'full' }
    ],
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsentsRoutingModule {}

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { DashboardComponent } from '../../../general/components/dashboard/dashboard.component';
import { SwitchDefaultDformsComponent } from '../../components/switch-default-dforms/switch-default-dforms.component';
import { LstRespFormsComponent } from './components/lst-resp-forms/lst-resp-forms.component';
import { EdtRespFormComponent } from './components/edt-resp-form/edt-resp-form.component';

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
        path: 'dynamic-forms/lst-resp-forms',
        component: LstRespFormsComponent,
        data: {
          title: 'List Respondent Forms',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'List Respondent Forms', url: '/lst-resp-forms' }
          ]
        },
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'dynamic-forms/edt-resp-form/:id',//edit-respondent-form/:id
        component: EdtRespFormComponent,
        data: {
          title: 'Edit Respondent Forms',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Edit Respondent Forms', url: '/edt-resp-form' }
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
export class DynamicFormsRoutingModule {}

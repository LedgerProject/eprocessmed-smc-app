import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { LoginComponent } from './components/login/login.component';

/* Guards */
import { NotAuthGuard } from './guard/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  // { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] }
  // { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}

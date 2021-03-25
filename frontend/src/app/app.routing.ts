import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Modules */
import { SecurityRoutingModule } from './security/security-routing';
import { AdminRoutingModule } from './admin/admin.routing';
// import { GeneralRoutingModule } from './general/general.routing';

/* Components */


/* Guards */
import { CustomerGuard } from "./security/guard/customer.guard";

const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SecurityRoutingModule,
    AdminRoutingModule,
    // GeneralRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

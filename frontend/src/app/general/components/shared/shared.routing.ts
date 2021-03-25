import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { fromEvent } from 'rxjs';

import { CrtEdtCatalogDialogComponent } from './dialog/crt-edt-catalog-dialog/app-crt-edt-catalog-dialog.component';


/* Modules */

const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CrtEdtCatalogDialogComponent
  ],
  exports: [
    RouterModule
  ]
})
export class SharedRoutes { }

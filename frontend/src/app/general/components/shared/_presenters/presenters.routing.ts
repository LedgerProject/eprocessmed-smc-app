import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Modules */

const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PresentersRoutes { }

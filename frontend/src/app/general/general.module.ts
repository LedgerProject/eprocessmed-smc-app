import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';


/* Modules */
import { SharedModule } from './components/shared/shared.module';

/* Components */


@NgModule({
  declarations: [

  ],
  exports: [
    RouterModule,
    SharedModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule,
    BrowserModule
  ]
})
export class GeneralModule { }

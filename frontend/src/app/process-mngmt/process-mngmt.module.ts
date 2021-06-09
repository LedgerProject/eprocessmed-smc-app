import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { DynamicFormsModule } from './submodule/dynamic-forms/dynamic-forms.module';
import { ConsentsModule } from './submodule/consents/consents.module';

@NgModule({
  declarations: [],
  exports: [
    RouterModule,
    DynamicFormsModule,
    ConsentsModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    BrowserModule,
    DynamicFormsModule,
    ConsentsModule

  ]
})
export class ProcessMngmtModule { }

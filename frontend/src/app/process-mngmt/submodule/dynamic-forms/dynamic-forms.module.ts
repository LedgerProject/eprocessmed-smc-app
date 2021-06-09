import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// npm install --save @angular/cdk @angular/material

import { MaterialModule } from '../../../material-module';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GeneralModule } from 'src/app/general/general.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SwitchDefaultDformsComponent } from '../../components/switch-default-dforms/switch-default-dforms.component';
import { LstRespFormsComponent } from './components/lst-resp-forms/lst-resp-forms.component';
import { EdtRespFormComponent } from './components/edt-resp-form/edt-resp-form.component';

@NgModule({
  declarations: [
    // SwitchDefaultDformsComponent,
    LstRespFormsComponent,
    EdtRespFormComponent
  ],
  exports: [
    RouterModule,
    // SwitchDefaultDformsComponent,
    LstRespFormsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    FlexLayoutModule,
    GeneralModule,
    RouterModule,
    BrowserModule,
    FormsModule
  ]
})
export class DynamicFormsModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material-module';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GeneralModule } from 'src/app/general/general.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';

import { SignatureHouseComponent } from './components/signature-house/signature-house.component';
import { SwitchDefaultDformsComponent } from '../../components/switch-default-dforms/switch-default-dforms.component';
import { ViewConsentComponent } from './components/view-consent/view-consent.component';

@NgModule({
  declarations: [
    // SwitchDefaultDformsComponent,
    SignatureHouseComponent,
    ViewConsentComponent
  ],
  exports: [
    RouterModule,
    SignatureHouseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    FlexLayoutModule,
    GeneralModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    NgOtpInputModule
  ]
})
export class ConsentsModule { }

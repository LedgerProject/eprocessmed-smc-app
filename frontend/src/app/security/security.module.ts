import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../material-module';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GeneralModule } from '../general/general.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

/* Modules */
import { PresentersModule } from '../general/components/shared/_presenters/presenters.module';

/* Guards */
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/not-auth.guard';

/* Components */
import { RolesEstabComponent } from './components/roles-estab/roles-estab.component';
import { UsersComponent } from './components/users/users.component';

import { LngSwitchComponent } from './components/logins/lng-switch/lng-switch.component';
import { LoginComponent } from './components/logins/lgn-dynamic-forms/lgn-dynamic-forms.component';
import { AppLgnSmartPassportComponent } from './components/logins/lgn-smart-passport/lgn-smart-passport.component';
import { LgnConsentComponent } from './components/logins/lgn-consent/lgn-consent.component';

@NgModule({
  declarations: [
    RolesEstabComponent,
    UsersComponent,
    LngSwitchComponent,
    LoginComponent,
    AppLgnSmartPassportComponent,
    LgnConsentComponent
  ],
  exports: [
    RolesEstabComponent,
    UsersComponent,
    LngSwitchComponent,
    LoginComponent,
    AppLgnSmartPassportComponent,
    LgnConsentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SocialLoginModule,
    PresentersModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    FlexLayoutModule,
    GeneralModule,
    BrowserModule
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '893259873011-vaq7t9t1p57luknresgjssj9oidfvu82.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    },
    DatePipe
  ],
})
export class SecurityModule { }

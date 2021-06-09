
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';

import { MatNativeDateModule } from '@angular/material/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { NgOtpInputModule } from  'ng-otp-input';

/* Modules (MaterialModule) */
import { SharedModule } from './general/components/shared/shared.module';
import { DashboardComponent } from './general/components/dashboard/dashboard.component';
import { HeaderComponent } from './general/components/shared/header/header.component';
import { NavbarComponent } from './general/components/shared/navbar/navbar.component';
import { SidebarComponent } from './general/components/shared/sidebar/sidebar.component';
import { AppBreadcrumbComponent } from './general/components/shared/breadcrumb/breadcrumb.component';

import { SpinnerComponent } from './general/components/shared/spinner.component';

/* Modules */
import { AppRoutingModule } from './app.routing';
import { SecurityModule } from './security/security.module';
import { AdminModule } from './admin/admin.module';
import { GeneralModule } from './general/general.module';
import { ProcessMngmtModule } from './process-mngmt/process-mngmt.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    SecurityModule,
    AdminModule,
    GeneralModule,
    ProcessMngmtModule,
    MatNativeDateModule,
    NgOtpInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SocialLoginModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1040022410495-7c59esbo5c7ag6q88vhkmedbnhhpcf27.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    SpinnerComponent,
    SidebarComponent,
    AppBreadcrumbComponent
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
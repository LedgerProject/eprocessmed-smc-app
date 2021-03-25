import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SocialLoginModule,
    PresentersModule
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

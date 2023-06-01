import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpFormComponent } from './sign-up-form.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { MaterialModule } from 'src/app/material';

@NgModule({
  declarations: [SignUpFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MaterialModule
  ],
  exports: [SignUpFormComponent],
  providers: [  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('911990476013459')
        }
      ]
    } as SocialAuthServiceConfig,
  } ]
})
export class SignUpFormModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthpageComponent } from './authpage.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginFormModule } from './login-form/login-form.module';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { AuthFooterModule } from './auth-footer/auth-footer.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignUpFormModule } from './sign-up-form/sign-up-form.module';
import { RequestDemoFormComponent } from './request-demo-form/request-demo-form.component';
import { RequestDemoFormModule } from './request-demo-form/request-demo-form.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
const routes = [
  {
    path: '**',
    component: AuthpageComponent
  } 
];
@NgModule({
  declarations: [AuthpageComponent , AuthNavbarComponent],
  imports: [CommonModule,
    RecaptchaModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),

    LoginFormModule,
    AuthFooterModule, 
    SignUpFormModule,
    ForgotPasswordModule,
    RequestDemoFormModule,
    IvyCarouselModule
  ]
})
export class AuthpageModule { }

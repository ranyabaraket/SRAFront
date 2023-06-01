import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ng2-cookies';
import { LoginStateService } from './views/authpage/login-form/login-state.service';
import { Routes, RouterModule } from '@angular/router';
import { HeaderInterceptor } from './views/pages/shared/services/header.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


// Import NgxHideOnScrollModule
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule),

  },
  { path: '**', component: ErrorComponent }

];
@NgModule({
  declarations: [
    AppComponent, ErrorComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }),
    RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]}),
    BrowserModule,
    HttpClientModule,
    NgxHideOnScrollModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 36 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:36000'
    }),
    //  MaterialModule,
  ],
  providers: [
    HttpClient,
    CookieService,
    LoginStateService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

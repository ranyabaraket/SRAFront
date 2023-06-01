import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './pages/shared/authGuard';
import { LoginStateService } from './authpage/login-form/login-state.service';

import { PrimaryModulesResolverService } from './primary-modules-resolver.service';
import { AboutPageComponent } from './authpage/about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./authpage/authpage.module').then(m => m.AuthpageModule)
  },

  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'pages',
    canActivate: [AuthguardGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    resolve: {
      //secondaryModules: SecondaryModulesResolverService,
      // primaryModules: PrimaryModulesResolverService,
    },
  },
];

@NgModule({
  declarations: [AboutPageComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // SharedModule
    // PagesModule,
    //    TranslateModule.forChild()
  ], providers: [LoginStateService]
})
export class ViewsModule { }

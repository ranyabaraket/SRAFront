import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyProfileComponent } from './agency-profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';


const routes = [
  {
    path: '**', component: AgencyProfileComponent,

  }];

@NgModule({
  declarations: [AgencyProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class AgencyProfileModule { }

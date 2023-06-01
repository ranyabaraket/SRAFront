import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from './flight.component';
import { RouterModule } from '@angular/router';

import { SearchFormModule } from './search-form/search-form.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

const routes = [
  {
    path: '', component: FlightComponent,
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then(m => m.ResultModule),
  },
  { path: '**', component: FlightComponent }
];

@NgModule({
  declarations: [
    FlightComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SearchFormModule,
  ],


})
export class FlightModule { }

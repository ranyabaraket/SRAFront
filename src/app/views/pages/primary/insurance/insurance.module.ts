import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceComponent } from './insurance.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { InsuranceSearchFormModule } from './insurance-search-form/insurance-search-form.module';

const routes = [
  {
    path: '', component: InsuranceComponent },

    {
      path: 'result',
      loadChildren: () => import('./insurance-result/insurance-result.module').then(m => m.InsuranceResultModule),
    },
 { path: '**', component: InsuranceComponent },

];

@NgModule({
  declarations: [InsuranceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InsuranceSearchFormModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
 // exports: [HotelSearchFormComponent],
  entryComponents: [],
  providers: []
})
export class InsuranceModule { }

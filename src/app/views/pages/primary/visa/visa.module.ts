import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisaComponent } from './visa.component';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { VisaApplyModule } from './visa-apply/visa-apply.module';

const routes = [
  {
    path: '', component: VisaComponent },
    {
      path: 'details',
      loadChildren: () => import('./visa-details/visa-details.module').then(m => m.VisaDetailsModule),
    },
    { path: '**', component: VisaComponent }
];

@NgModule({
  declarations: [VisaComponent],
  imports: [
    CommonModule,
    VisaApplyModule,
    RouterModule.forChild(routes),
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
export class VisaModule { }

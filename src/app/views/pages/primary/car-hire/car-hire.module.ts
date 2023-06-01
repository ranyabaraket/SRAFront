import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarHireResultComponent } from './car-hire-result/car-hire-result.component';
import { CarHireComponent } from './car-hire.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { CarHireSearchFormModule } from './car-hire-search-form/car-hire-search-form.module';
import { CarHireSelectionComponent } from './car-hire-result/car-hire-selection/car-hire-selection.component';

const routes = [
  {
    path: '', component: CarHireComponent,
  },
  {
    path: 'result',
    loadChildren: () => import('./car-hire-result/car-hire-result.module')
    .then(m => m.CarHireResultModule),
  },
  { path: '**', component: CarHireComponent }
];


@NgModule({
  declarations: [
    CarHireComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarHireSearchFormModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class CarHireModule { }

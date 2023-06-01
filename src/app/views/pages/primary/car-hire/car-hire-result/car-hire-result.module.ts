import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarHireResultComponent } from './car-hire-result.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes = [
  {
    path: '', component: CarHireResultComponent,
    children: [
      {
        path: 'selection',
        loadChildren: () => import('./car-hire-selection/car-hire-selection.module')
        .then(m => m.CarHireSelectionModule)
      },
      {
        path: 'confirmation',
        loadChildren: () => import('./car-hire-confirmation/car-hire-confirmation.module')
        .then(m => m.CarHireConfirmationModule)
      },
      {
        path: '**',
        redirectTo: 'selection'
      }
    ]
  }];
@NgModule({
  declarations: [
    CarHireResultComponent],
  imports: [
    CommonModule,
     TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(routes),
    NgbModule,

  ]
})
export class CarHireResultModule { }

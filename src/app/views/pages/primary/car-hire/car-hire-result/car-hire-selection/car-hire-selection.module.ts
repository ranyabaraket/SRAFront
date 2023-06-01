import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarHireSelectionComponent } from './car-hire-selection.component';
import { RouterModule } from '@angular/router';
import { CarHireSearchFormComponent } from '../../car-hire-search-form/car-hire-search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { CarHireSearchFormModule } from '../../car-hire-search-form/car-hire-search-form.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { CarHirefilterComponent } from './car-hirefilter/car-hirefilter.component';
import { CarHireInformationComponent } from './car-hire-information/car-hire-information.component';
const routes = [
  {  path: '**', component : CarHireSelectionComponent}
];


@NgModule({
  declarations: [
    CarHireSelectionComponent,
    CarHirefilterComponent,
    CarHireInformationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarHireSearchFormModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatPaginatorModule,
    Ng5SliderModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class CarHireSelectionModule { }

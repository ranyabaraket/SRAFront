import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { SelectionInsuranceComponent } from './selection-insurance.component';
import { InsuranceSearchFormModule } from '../../insurance-search-form/insurance-search-form.module';
import { FilterInsuranceComponent } from './filter-insurance/filter-insurance.component';
import { Ng5SliderModule } from 'ng5-slider';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
const routes = [
  {
    path: '**', component: SelectionInsuranceComponent,

  }];
@NgModule({
  declarations: [SelectionInsuranceComponent, FilterInsuranceComponent, InsuranceDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatDialogModule,
    SharedModule,
    Ng5SliderModule,
    InsuranceSearchFormModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class SelectionInsuranceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Ng5SliderModule } from 'ng5-slider';
import { httpTranslateLoader } from 'src/app/app.module';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { InsuranceSearchFormModule } from '../../insurance-search-form/insurance-search-form.module';
import { VoucherInsuranceComponent } from './voucher-insurance.component';
import { NgxPrintModule } from 'ngx-print';

const routes = [
  {
    path: '**', component: VoucherInsuranceComponent,

  }];
@NgModule({
  declarations: [VoucherInsuranceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    SharedModule,
    Ng5SliderModule,
    NgxPrintModule,
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
export class VoucherInsuranceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarHireHistoryComponent } from './car-hire-history.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { httpTranslateLoader } from 'src/app/app.module';
import { SharedModule } from '../../../shared/shared.module';
import { CarHireDetailsComponent } from './car-hire-details/car-hire-details.component';
import { CarHireHistoryVoucherComponent } from './car-hire-details/car-hire-history-voucher/car-hire-history-voucher.component';
import { NgxPrintModule } from 'ngx-print';

const routes = [
  {
    path: '**', component: CarHireHistoryComponent

  }];

@NgModule({
  declarations: [CarHireHistoryComponent, CarHireDetailsComponent, CarHireHistoryVoucherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgxPrintModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class CarHireHistoryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationFlightComponent } from './confirmation-flight.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { ReviewFlightModule } from '../passenger-details-flight/review-flight/review-flight.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { FlightVoucherComponent } from './flight-voucher/flight-voucher.component';
import { NgxPrintModule } from 'ngx-print';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
  {
    path: '**',
    component: ConfirmationFlightComponent,

  }];

@NgModule({
  declarations: [FlightVoucherComponent,
     ConfirmationFlightComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    SharedModule,
    ReviewFlightModule,
    FormsModule,
    ReactiveFormsModule,
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
export class ConfirmationFlightModule { }

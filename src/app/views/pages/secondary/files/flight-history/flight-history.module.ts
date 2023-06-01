import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightHistoryComponent } from './flight-history.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { VendorRemarksComponent } from './vendor-remarks/vendor-remarks.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlightHistoryDetailsComponent } from './flight-history-details/flight-history-details.component';
import { FlightHistoryDetailsModule } from './flight-history-details/flight-history-details.module';
import { SharedModule } from '../../../shared/shared.module';
import { RefundRequestComponent } from './flight-history-details/refund-request/refund-request.component';
import { ReissueRequestComponent } from './flight-history-details/reissue-request/reissue-request.component';
import { RequestInformationsComponent } from './flight-history-details/request-informations/request-informations.component';
import { VoidRequestComponent } from './flight-history-details/void-request/void-request.component';
import { FlightHistoryDetailsVoucherComponent } from './flight-history-details/flight-history-details-voucher/flight-history-details-voucher.component';
import { NgxPrintModule } from 'ngx-print';
const routes = [
  {
    path: '**', component: FlightHistoryComponent,

  }];

@NgModule({
  declarations: [FlightHistoryComponent,
    FlightHistoryDetailsComponent,
    VendorRemarksComponent,
    VoidRequestComponent,
    RefundRequestComponent,
    ReissueRequestComponent,
    RequestInformationsComponent,
    FlightHistoryDetailsVoucherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    NgxPrintModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    //  FlightHistoryDetailsModule
  ],
  //  exports:[FlightDetailsModule]
})
export class BookingHistoryModule { }

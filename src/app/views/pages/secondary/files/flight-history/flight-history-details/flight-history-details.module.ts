import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoidRequestComponent } from './void-request/void-request.component';
import { RefundRequestComponent } from './refund-request/refund-request.component';
import { ReissueRequestComponent } from './reissue-request/reissue-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { RequestInformationsComponent } from './request-informations/request-informations.component';
import { ExportAsModule } from 'ngx-export-as';
import { NgxPrintModule } from 'ngx-print';
import { MatDialogModule } from '@angular/material/dialog';
// const routes = [
  // {
  //   path: '**', component: FlightHistoryDetailsComponent,

  // }];

@NgModule({
  declarations: [
    //  VoidRequestComponent,
    //   RefundRequestComponent,
    //    ReissueRequestComponent,
    //    RequestInformationsComponent,
    //    FlightHistoryDetailsVoucherComponent
      ],
  imports: [
    CommonModule,
  //  RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ExportAsModule,
    NgxPrintModule,
    MatDialogModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class FlightHistoryDetailsModule { }

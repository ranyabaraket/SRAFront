import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHistoryComponent } from './transfer-history.component';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TransferHistoryDetailsComponent } from './transfer-history-details/transfer-history-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { TransferHistoryVoucherComponent } from './transfer-history-details/transfer-history-voucher/transfer-history-voucher.component';
import { NgxPrintModule } from 'ngx-print';

const routes = [
  {
    path: '**', component: TransferHistoryComponent,

  }];
@NgModule({
  declarations: [TransferHistoryComponent,
    TransferHistoryDetailsComponent,
    TransferHistoryVoucherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPrintModule,
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
export class TransferHistoryModule { }

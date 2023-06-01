import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransferResultComponent } from './transfer-result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
const routes = [
  {
    path: '', component: TransferResultComponent,
    children: [
      {
        path: 'selection',
        loadChildren: () => import('./transfer-selection/transfer-selection.module')
          .then(m => m.TransferSelectionModule)
      }
      ,
      {
        path: 'confirmation',
        loadChildren: () => import('./confirmation-transfer/confirmation-transfer.module')
          .then(m => m.ConfirmationTransferModule)
      }
      ,
      {
        path: 'voucher',
        loadChildren: () => import('./voucher-transfer/voucher-transfer.module')
          .then(m => m.VoucherTransferModule)
      }
    ]
  }
  ,
  {
    path: '**',
    redirectTo: 'selection'
  }
];
@NgModule({
  declarations: [TransferResultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgbModule,

  ]
})
export class TransferResultModule { }

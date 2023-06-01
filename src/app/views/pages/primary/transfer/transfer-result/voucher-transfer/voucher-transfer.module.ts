import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherTransferComponent } from './voucher-transfer.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPrintModule } from 'ngx-print';
import { httpTranslateLoader } from 'src/app/app.module';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
const routes = [
  {
    path: '', component: VoucherTransferComponent,

  }];


@NgModule({
  declarations: [VoucherTransferComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    NgxPrintModule,
    MatTooltipModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class VoucherTransferModule { }

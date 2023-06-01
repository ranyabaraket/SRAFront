import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherHotelComponent } from './voucher-hotel.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { NgxPrintModule } from 'ngx-print';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
  {
    path: '**', component: VoucherHotelComponent,

  }];
@NgModule({
  declarations: [VoucherHotelComponent],
  imports: [
    CommonModule,
    NgbModule,
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
export class VoucherHotelModule { }

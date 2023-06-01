import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmHotelReservationComponent } from './confirm-hotel-reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';

const routes = [
  {
    path: '**',  loadChildren: () => import('./voucher-hotel/voucher-hotel.module')
    .then((m) => m.VoucherHotelModule),
  }];

@NgModule({
  declarations: [ConfirmHotelReservationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class ConfirmHotelReservationModule { }

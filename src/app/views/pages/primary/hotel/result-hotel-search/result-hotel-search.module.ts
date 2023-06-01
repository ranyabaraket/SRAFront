import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultHotelSearchComponent } from './result-hotel-search.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { NewSearchHotelComponent } from './selection-hotel/new-search-hotel/new-search-hotel.component';
import { SelectionHotelModule } from './selection-hotel/selection-hotel.module';
import { HotelRoomDetailsModule } from './hotel-room-details/hotel-room-details.module';



const routes = [
  {
    path: '', component: ResultHotelSearchComponent,
    children: [
      {
        path: 'selection',
        loadChildren: () => import('./selection-hotel/selection-hotel.module').then(m => m.SelectionHotelModule)
      },
      {
        path: 'room-details',
        loadChildren: () => import('./hotel-room-details/hotel-room-details.module').then(m => m.HotelRoomDetailsModule)
      },
      {
        path: 'guests-details',
        loadChildren: () => import('./hotel-guests-details/hotel-guests-details.module').then(m => m.HotelGuestsDetailsModule)
      },
      {
        path: 'confirm-reservation',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('./confirm-hotel-reservation/confirm-hotel-reservation.module').then(m => m.ConfirmHotelReservationModule)
      },
      {
        path: 'voucher-details',
        loadChildren: () => import('./confirm-hotel-reservation/voucher-hotel/voucher-hotel.module').then(m => m.VoucherHotelModule)
      },
      {
        path: '',
        redirectTo: 'selection'
      }
    ]
  }];

@NgModule({
  declarations: [ResultHotelSearchComponent],
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
export class ResultHotelSearchModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { CarHireHistoryComponent } from './car-hire-history/car-hire-history.component';
import { HotelInprocessHistoryComponent } from './hotel-inprocess-history/hotel-inprocess-history.component';


const routes = [
  {
    path: '', component: FilesComponent,
    children: [
      // {
      //   path: 'flight-history/flight-details',
      //   loadChildren: () => import('./flight-history/flight-history-details/flight-history-details.module')
      //     .then(m => m.FlightHistoryDetailsModule),
      // },
      // {
      //   path: 'hotel-history/hotel-details',
      //   loadChildren: () => import('./hotel-history/hotel-history-details/hotel-history-details.module')
      //     .then(m => m.HotelHistoryDetailsModule),
      // },
      {
        path: 'transfer-history/transfer-details',
        loadChildren: () => import('./transfer-history/transfer-history-details/transfer-history-details.module')
          .then(m => m.TransferHistoryDetailsModule),
      },
      // {
      //   path: 'insurance-history/insurance-details',
      //   loadChildren: () => import('./insurance-history/insurance-history-details/insurance-history-details.module')
      //     .then(m => m.InsuranceHistoryDetailsModule),
      // },
      {
        path: 'flight-history',
        loadChildren: () => import('./flight-history/flight-history.module')
          .then(m => m.BookingHistoryModule),
      }
      ,
      {
        path: 'hotel-history',
        loadChildren: () => import('./hotel-history/hotel-history.module')
          .then(m => m.HotelHistoryModule),
      }
      ,
      {
        path: 'transfer-history',
        loadChildren: () => import('./transfer-history/transfer-history.module')
          .then(m => m.TransferHistoryModule),
      }
      ,
      {
        path: 'insurance-history',
        loadChildren: () => import('./insurance-history/insurance-history.module')
          .then(m => m.InsuranceHistoryModule),
      },
      {
        path: 'visa-history',
        loadChildren: () => import('./visa-history/visa-history.module')
          .then(m => m.VisaHistoryModule),
      },
      {
        path: 'car-hire-history',
        loadChildren: () => import('./car-hire-history/car-hire-history.module')
          .then(m => m.CarHireHistoryModule),
      },
      {
        path: 'hotel-inprocess-history',
        loadChildren: () => import('./hotel-inprocess-history/hotel-inprocess-history.module')
          .then(m => m.HotelInprocessHistoryModule),
      },
      {
        path: '',
        redirectTo: 'hotel-history'
      }
    ]

  }];


@NgModule({
  declarations: [FilesComponent],
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

  ]
})
export class FilesModule { }

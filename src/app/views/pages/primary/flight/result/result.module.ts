import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { RouterModule } from '@angular/router';
import { NgbTooltip, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationFlightComponent } from './confirmation-flight/confirmation-flight.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { FlightVoucherComponent } from './confirmation-flight/flight-voucher/flight-voucher.component';

const routes = [
  {
    path: '', component: ResultComponent,
    children: [
      {
        path: 'selection',
        loadChildren: () => import('./selection/selection.module').then(m => m.SelectionModule)
      },
      {
        path: 'passenger-details',
        loadChildren: () => import('./passenger-details-flight/passenger-details-flight.module').then(m => m.PassengerDetailsFlightModule)
      },
      {
        path: 'confirmation',
        loadChildren: () => import('./confirmation-flight/confirmation-flight.module').then(m => m.ConfirmationFlightModule)
      }
      ,
      {
        path: '**',
        redirectTo: 'selection'
      }
    ]
  }];

@NgModule({
  declarations: [ResultComponent
  ],
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
export class ResultModule { }

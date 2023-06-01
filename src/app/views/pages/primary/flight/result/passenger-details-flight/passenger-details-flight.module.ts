import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFlightComponent } from './review-flight/review-flight.component';
import { RouterModule } from '@angular/router';
import { PassengerDetailsFlightComponent } from './passenger-details-flight.component';
import { FormPassengerFlightComponent } from './form-passenger-flight/form-passenger-flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedFlightModule } from '../shared-flight/shared-flight.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { ReviewFlightModule } from './review-flight/review-flight.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';

const routes = [
  {
    path: '**', component: PassengerDetailsFlightComponent,

  }];

@NgModule({
  declarations: [PassengerDetailsFlightComponent,
    FormPassengerFlightComponent,
    ClientDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),

    SharedFlightModule,
    SharedModule,
    ReviewFlightModule
  ],
  exports: [ReviewFlightComponent],
  entryComponents: []
})
export class PassengerDetailsFlightModule { }

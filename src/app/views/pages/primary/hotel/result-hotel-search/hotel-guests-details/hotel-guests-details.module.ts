import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { HotelGuestsDetailsComponent } from './hotel-guests-details.component';
import { GuestDetailsCardComponent } from './guest-details-card/guest-details-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GuestDetailsComponent } from './guest-details/guest-details.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { MaterialModule } from 'src/app/material';

const routes = [
  {
    path: '**', component: HotelGuestsDetailsComponent,

  }];

@NgModule({
  declarations: [GuestDetailsCardComponent, HotelGuestsDetailsComponent, GuestDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    MatAutocompleteModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class HotelGuestsDetailsModule { }

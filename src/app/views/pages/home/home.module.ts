import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { SearchFormModule } from '../primary/flight/search-form/search-form.module';
import { HotelSearchFormModule } from '../primary/hotel/hotel-search-form/hotel-search-form.module';
import { SearchFormTransferModule } from '../primary/transfer/search-form-transfer/search-form-transfer.module';
import { MaterialModule } from 'src/app/material';
import { HotelSearchFormComponent } from '../primary/hotel/hotel-search-form/hotel-search-form.component';

const routes = [
  {
    path: '**', component: HomeComponent,

  }];

@NgModule({
   declarations: [HomeComponent],
  imports: [
    CommonModule,
    HotelSearchFormModule,
    SearchFormModule,
    SearchFormTransferModule,
    RouterModule.forChild(routes),
    FormsModule,
    Ng2SearchPipeModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MaterialModule
  ]
})
export class HomeModule { }

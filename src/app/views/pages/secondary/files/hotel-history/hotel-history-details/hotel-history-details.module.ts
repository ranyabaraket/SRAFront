import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelHistoryDetailsComponent } from './hotel-history-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from '../../../../../../app.module';
import { HttpClient } from '@angular/common/http';
import { NgxPrintModule } from 'ngx-print';
const routes = [
  {
    path: '**', component: HotelHistoryDetailsComponent,
  }];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  //  RouterModule.forChild(routes),
    FormsModule,
    NgxPrintModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class HotelHistoryDetailsModule {}

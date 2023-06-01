import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { TransferHistoryDetailsComponent } from './transfer-history-details.component';
import { NgxPrintModule } from 'ngx-print';

const routes = [{
  path: '**', component: TransferHistoryDetailsComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   // RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class TransferHistoryDetailsModule { }

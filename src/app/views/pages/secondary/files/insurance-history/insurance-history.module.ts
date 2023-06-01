import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxLoadingModule } from 'ngx-loading';
import { httpTranslateLoader } from 'src/app/app.module';
import { InsuranceHistoryComponent } from './insurance-history.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InsuranceHistoryDetailsComponent } from './insurance-history-details/insurance-history-details.component';
import { NgxPrintModule } from 'ngx-print';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
  {
    path: '**', component: InsuranceHistoryComponent
  }];
@NgModule({
  declarations: [InsuranceHistoryComponent, InsuranceHistoryDetailsComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgxPrintModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class InsuranceHistoryModule {}

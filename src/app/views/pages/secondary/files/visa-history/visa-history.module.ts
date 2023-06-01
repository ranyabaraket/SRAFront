import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { httpTranslateLoader } from 'src/app/app.module';
import { SharedModule } from '../../../shared/shared.module';
import { VisaHistoryComponent } from './visa-history.component';
import { VisaHistoryDetailsComponent } from './visa-history-details/visa-history-details.component';
const routes = [
  {
    path: '**', component: VisaHistoryComponent,

  }];
@NgModule({
  declarations: [VisaHistoryComponent, VisaHistoryDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class VisaHistoryModule { }

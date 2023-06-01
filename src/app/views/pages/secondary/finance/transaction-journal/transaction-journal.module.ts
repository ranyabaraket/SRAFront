import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionJournalComponent } from './transaction-journal.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';



const routes = [
  {
    path: '**', component: TransactionJournalComponent,

  }];

@NgModule({
  declarations: [TransactionJournalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MatTabsModule,
    MatStepperModule,
    MatInputModule,
    HttpClientModule,
    MatTooltipModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [CustomCurrencyPipe]
})
export class TransactionJournalModule { }

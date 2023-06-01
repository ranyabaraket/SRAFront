import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
const routes = [
  {
    path: '', component: FinanceComponent,
    children: [
      {
        path: 'transaction-journal',
        loadChildren: () => import('./transaction-journal/transaction-journal.module').then(m => m.TransactionJournalModule),
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
      }
      ,
      {
        path: '',
        redirectTo: 'transaction-journal'
      }
    ]

  }];

@NgModule({
  declarations: [FinanceComponent],
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
export class FinanceModule { }

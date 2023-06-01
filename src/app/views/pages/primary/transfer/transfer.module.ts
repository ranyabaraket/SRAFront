import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer.component';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { SearchFormTransferModule } from './search-form-transfer/search-form-transfer.module';
import { TransferResultComponent } from './transfer-result/transfer-result.component';

const routes = [
  // {
  //   path: '',
  //   component: TransferComponent
  // },
  {
    path: 'result',
    loadChildren: () => import('./transfer-result/transfer-result.module').then(m => m.TransferResultModule),
  },
  // {
  //   path: '**',
  //   component: TransferComponent
  // },
];

@NgModule({
  declarations: [TransferComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchFormTransferModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class TransferModule {
}

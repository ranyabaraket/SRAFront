import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceResultComponent } from './insurance-result.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { VoucherInsuranceComponent } from './voucher-insurance/voucher-insurance.component';

const routes = [
  {
    path: '', component: InsuranceResultComponent,
    children: [
      {
        path: 'selection',
        loadChildren: () => import('./selection-insurance/selection-insurance.module').then(m => m.SelectionInsuranceModule)
      },
      {
        path: 'confirmation',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('./insurance-persons-details/insurance-persons-details.module').then(m => m.InsurancePersonsDetailsModule)
      },
        {
          path: 'voucher',
          loadChildren: () => import('./voucher-insurance/voucher-insurance.module').then(m => m.VoucherInsuranceModule)
        },
      {
        path: '**',
        redirectTo: 'selection'
      }
    ]
  }];

@NgModule({
  declarations: [InsuranceResultComponent],
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

    NgbModule,
  ]
})

export class InsuranceResultModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarHireConfirmationComponent } from './car-hire-confirmation.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { CarHireReviewComponent } from './car-hire-review/car-hire-review.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPrintModule } from 'ngx-print';
import { CarHireVoucherComponent } from './car-hire-voucher/car-hire-voucher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes = [
  {  path: '**', component : CarHireConfirmationComponent}
];


@NgModule({
  declarations: [CarHireConfirmationComponent,
    CarHireVoucherComponent,
     CarHireReviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
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
export class CarHireConfirmationModule { }

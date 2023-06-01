import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationTransferComponent } from './confirmation-transfer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { ReviewTransferComponent } from './review-transfer/review-transfer.component';
import { FormPassengerTransferComponent } from './form-passenger-transfer/form-passenger-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormInformationsTransferComponent } from './form-informations-transfer/form-informations-transfer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes = [{
  path: '',
  component: ConfirmationTransferComponent
}];

@NgModule({

  declarations: [ConfirmationTransferComponent,
    ReviewTransferComponent,
    FormPassengerTransferComponent,
    FormInformationsTransferComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ]
})
export class ConfirmationTransferModule { }

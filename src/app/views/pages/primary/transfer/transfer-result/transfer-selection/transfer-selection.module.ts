import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferSelectionComponent } from './transfer-selection.component';
import { RouterModule } from '@angular/router';
import { SearchFormTransferModule } from '../../search-form-transfer/search-form-transfer.module';
import { TransferFilterComponent } from './transfer-filter/transfer-filter.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { TransferInformationsComponent } from './transfer-informations/transfer-informations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

const routes = [
  {
    path: '',
    component: TransferSelectionComponent
  }
];

@NgModule({
  declarations: [TransferSelectionComponent,
    TransferFilterComponent,
    TransferInformationsComponent],
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
    FormsModule,
    ReactiveFormsModule,
    SearchFormTransferModule,
    MatProgressBarModule,
    MatPaginatorModule,
    Ng5SliderModule,
    SharedModule,
  ]
})
export class TransferSelectionModule { }

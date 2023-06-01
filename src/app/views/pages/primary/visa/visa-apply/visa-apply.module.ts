import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { VisaApplyComponent } from './visa-apply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisaInstructionComponent } from './visa-instruction/visa-instruction.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [VisaApplyComponent, VisaInstructionComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatNativeDateModule,
    MatDatepickerModule,
    NgbModule,
    MatDialogModule,
  ],
  entryComponents: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  exports: [VisaApplyComponent]
})
export class VisaApplyModule { }

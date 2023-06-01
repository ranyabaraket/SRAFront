import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { HelpFlightComponent } from './help-flight/help-flight.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { SearchFormComponent } from './search-form.component';

@NgModule({
  declarations: [HelpFlightComponent, SearchFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatAutocompleteModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    NgbModule,
    MatDialogModule,

  ],
  exports: [SearchFormComponent],
  entryComponents: [HelpFlightComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class SearchFormModule { }

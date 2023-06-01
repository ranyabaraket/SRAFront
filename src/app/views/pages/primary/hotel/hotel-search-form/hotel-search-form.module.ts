import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelSearchFormComponent } from './hotel-search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import {MatRadioModule} from '@angular/material/radio';
import { MaterialModule } from 'src/app/material';



@NgModule({
  declarations: [HotelSearchFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    NgbModule,
    MatDialogModule,
    MatRadioModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MaterialModule
  ],
   providers:[{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
  exports: [HotelSearchFormComponent]
})
export class HotelSearchFormModule { }

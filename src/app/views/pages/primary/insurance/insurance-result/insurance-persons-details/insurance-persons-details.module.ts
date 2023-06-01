import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { InsurancePersonsDetailsComponent } from './insurance-persons-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


const routes = [
  {
    path: '**', component: InsurancePersonsDetailsComponent,

  }];
@NgModule({
  declarations: [InsurancePersonsDetailsComponent, PersonDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
})
export class InsurancePersonsDetailsModule { }

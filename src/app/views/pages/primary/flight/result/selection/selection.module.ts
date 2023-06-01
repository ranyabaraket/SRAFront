import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './selection.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Ng5SliderModule } from 'ng5-slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { RestrictionsComponent } from './restrictions/restrictions.component';
import { SearchFormModule } from '../../search-form/search-form.module';
import { FlightInformationsComponent } from './flight-informations/flight-informations.component';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { SharedFlightModule } from '../shared-flight/shared-flight.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { FlightInfoClassesComponent } from './flight-info-classes/flight-info-classes.component';
import {MatExpansionModule} from '@angular/material/expansion';


const routes = [
  {
    path: '**',
    // canActivate: [FlighSelectiontGuard],
    component: SelectionComponent,

  }];

@NgModule({
  declarations: [SelectionComponent,
    FilterComponent,
    StatisticsTableComponent,
    RestrictionsComponent,
    FlightInformationsComponent,
    FlightInfoClassesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    MatProgressBarModule,
    Ng5SliderModule,
    MatPaginatorModule,

    SharedModule,
    SharedFlightModule,
    MatExpansionModule,
    // sharedmod
    // MatAutocompleteModule,
    // MatNativeDateModule,
    // MatInputModule,
    // MatDatepickerModule,
    // // NgbModule,
    MatDialogModule,
    SearchFormModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [],
  entryComponents: [
    RestrictionsComponent],
  //   exports:[FareRulesDetailsComponent]
})
export class SelectionModule { }

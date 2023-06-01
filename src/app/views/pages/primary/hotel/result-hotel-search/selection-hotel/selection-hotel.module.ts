import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterHotelComponent } from './filter-hotel/filter-hotel.component';
import { NewSearchHotelComponent } from './new-search-hotel/new-search-hotel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { SelectionHotelComponent } from './selection-hotel.component';
import { AgmCoreModule } from '@agm/core';
import { SearchHotelMapComponent } from './search-hotel-map/search-hotel-map.component';
import { HotelSearchFormModule } from '../../hotel-search-form/hotel-search-form.module';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { BiggerMapComponent } from './bigger-map/bigger-map.component';
import { ResultHotelSearchModule } from '../result-hotel-search.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes = [
  {
    path: '**', component: SelectionHotelComponent,

  }];
@NgModule({
  declarations: [SelectionHotelComponent, FilterHotelComponent, SearchHotelMapComponent, BiggerMapComponent,NewSearchHotelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatDialogModule,
    HotelSearchFormModule,
    Ng5SliderModule,
    SharedModule,
    NgbTypeaheadModule,
    MatAutocompleteModule,
 

    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDAiiMcNidY5YSDsj2qwZ4lD-MdVGqzWk4'

    })  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      }
    ]
   
})
export class SelectionHotelModule { }

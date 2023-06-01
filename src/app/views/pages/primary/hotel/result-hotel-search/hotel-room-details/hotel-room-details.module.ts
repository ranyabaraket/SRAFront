import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HotelRoomDetailsComponent } from './hotel-room-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RoomDetailsCardComponent } from './room-details-card/room-details-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/views/pages/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { httpTranslateLoader } from 'src/app/app.module';
import { FilterRoomDetailsComponent } from './filter-room-details/filter-room-details.component';
import { NewSearchHotelComponent } from '../selection-hotel/new-search-hotel/new-search-hotel.component';
import { HotelSearchFormModule } from '../../hotel-search-form/hotel-search-form.module';
import { SelectionHotelModule } from '../selection-hotel/selection-hotel.module';
import { ResultHotelSearchModule } from '../result-hotel-search.module';
import { DatePipe } from '@angular/common';


const routes = [
  {
    path: '**', component: HotelRoomDetailsComponent,

  }];

@NgModule({
  declarations: [HotelRoomDetailsComponent,
     RoomDetailsCardComponent,
     FilterRoomDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatDialogModule,
    SharedModule

    
  ],
  providers: [
    DatePipe,
  ]
})
export class HotelRoomDetailsModule {}

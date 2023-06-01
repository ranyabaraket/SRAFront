import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HotelComponent } from './hotel.component';
import { HotelSearchFormModule } from './hotel-search-form/hotel-search-form.module';
import { TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { TransferModule } from '../transfer/transfer.module';
import { TransferComponent } from '../transfer/transfer.component';



const routes = [
  {
    path: '', component: HotelComponent },

    {
      path: 'result',
      loadChildren: () => import('./result-hotel-search/result-hotel-search.module').then(m => m.ResultHotelSearchModule),
    },
 { path: '**', component: HotelComponent },

  // { path: 'result', component: ResultHotelSearchComponent }
];

@NgModule({
  declarations: [HotelComponent  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    HotelSearchFormModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
 // exports: [HotelSearchFormComponent],
  entryComponents: [],
  providers: []
})
export class HotelModule { }

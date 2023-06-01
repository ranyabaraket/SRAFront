import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpDeskComponent } from './help-desk.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InProcessComponent } from './in-process/in-process.component';
import { CompletedComponent } from './completed/completed.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { BookingDetailsHdComponent } from './booking-details/booking-details-hd.component';
import { NgxLoadingModule } from 'ngx-loading';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes = [
  {
    path: '', component: HelpDeskComponent,
    children: [
      {
        path: 'in-process',
        component: InProcessComponent
      },
      {
        path: 'completed',
        component: CompletedComponent,
      },
      {
        path: 'request-details/:uniqueId',
        component: RequestDetailsComponent,
      },
      {
        path: 'booking-details/:uniqueId',
        component: BookingDetailsHdComponent,
      },
      {
        path: '',
        redirectTo: 'in-process'
      }
    ]
  }];

@NgModule({
  declarations: [HelpDeskComponent,
    CompletedComponent,
    InProcessComponent,
    RequestDetailsComponent,
    BookingDetailsHdComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgxLoadingModule.forRoot({}),
    MatTabsModule,
    MatStepperModule,
    MatInputModule,
    HttpClientModule,
    MatTooltipModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class HelpDeskModule { }

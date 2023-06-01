import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisaDetailsComponent } from './visa-details.component';
import { RouterModule } from '@angular/router';
import { VisaDetailsCardComponent } from './visa-details-card/visa-details-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { SharedModule } from '../../../shared/shared.module';



const routes = [
  {
    path: '**', component: VisaDetailsComponent,
   }
  ];


@NgModule({
  declarations: [VisaDetailsComponent, VisaDetailsCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class VisaDetailsModule { }

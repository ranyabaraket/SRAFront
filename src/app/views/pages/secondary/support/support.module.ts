import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SupportDetailsComponent } from './support-details/support-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ResponseSupportComponent } from './response-support/response-support.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

const routes = [
  {
    path: '**', component: SupportComponent,

  }];

@NgModule({
  declarations: [SupportComponent,
    SupportDetailsComponent,
    ResponseSupportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MatDialogModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  entryComponents: [SupportDetailsComponent,
    ResponseSupportComponent]
})
export class SupportModule { }

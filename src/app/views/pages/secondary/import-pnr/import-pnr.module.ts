import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportPnrComponent } from './import-pnr.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

const routes = [
  {
    path: '**', component: ImportPnrComponent,

  }];

@NgModule({
  declarations: [ImportPnrComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
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
export class ImportPnrModule { }

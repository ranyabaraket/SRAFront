import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from '../../shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { SecurityComponent } from './security.component';
import { CheckboxModule } from 'angular-bootstrap-md';

const routes = [
  {
    path: '**', component: SecurityComponent,

  }];
@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPrintModule,

    MatTabsModule,
    MatStepperModule,
    MatInputModule,
    HttpClientModule,
    MatTooltipModule,
    CheckboxModule,
    ReactiveFormsModule,

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
    NgxPrintModule,
  ],
  // exports:[SecurityComponent]
})
export class SecurityModule {}

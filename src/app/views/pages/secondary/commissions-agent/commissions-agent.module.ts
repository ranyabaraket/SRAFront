import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsAgentComponent } from './commissions-agent.component';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomCurrencyPipe } from '../../shared/pipe/customCurrency.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddCommissionAgentComponent } from './add-commission-agent/add-commission-agent.component';
import { FormsModule } from '@angular/forms';
import { EditCommissionAgentComponent } from './edit-commission-agent/edit-commission-agent.component';

const routes = [
  {
    path: '**', component: CommissionsAgentComponent,

  }];


@NgModule({
  declarations: [CommissionsAgentComponent,AddCommissionAgentComponent, EditCommissionAgentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
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
    SharedModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [CustomCurrencyPipe],
  entryComponents: [AddCommissionAgentComponent,EditCommissionAgentComponent]
})
export class CommissionsAgentModule { }

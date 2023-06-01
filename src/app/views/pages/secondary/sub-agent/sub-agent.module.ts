import { NgModule, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAgentComponent } from './sub-agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SubAgentDetailsComponent } from './sub-agent-details/sub-agent-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomCurrencyPipe } from '../../shared/pipe/customCurrency.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommissionAgentListComponent } from './commission-agent-list/commission-agent-list.component';
import { AutorisationAgentComponent } from './autorisation-agent/autorisation-agent.component';


const routes = [
  {
    path: '**', component: SubAgentComponent

  }];

@NgModule({
  declarations: [SubAgentComponent, SubAgentDetailsComponent,CommissionAgentListComponent,AutorisationAgentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MatDialogModule,
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
  entryComponents: [SubAgentDetailsComponent,CommissionAgentListComponent,AutorisationAgentComponent],
  providers: [CustomCurrencyPipe]
})
export class SubAgentModule { }

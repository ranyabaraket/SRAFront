import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FareRulesDetailsComponent } from './fare-rules-details/fare-rules-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';



@NgModule({
  declarations: [FareRulesDetailsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [FareRulesDetailsComponent],
 // entryComponents :[FareRulesDetailsComponent]
})
export class SharedFlightModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFlightComponent } from './review-flight.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';

@NgModule({
    declarations: [
        ReviewFlightComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: httpTranslateLoader,
              deps: [HttpClient]
            }
          }),
    ],
    exports: [ReviewFlightComponent],
    entryComponents: []
})
export class ReviewFlightModule { }

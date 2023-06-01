import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { AuthFooterComponent } from './auth-footer.component';

// Import NgxHideOnScrollModule
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
@NgModule({
  declarations: [AuthFooterComponent],
  imports: [
   // NgxHideOnScrollModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [AuthFooterComponent],
  providers: [

  ]
})
export class AuthFooterModule { }

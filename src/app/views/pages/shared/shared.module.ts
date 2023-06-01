import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCurrencyPipe } from './pipe/customCurrency.pipe';
import { QuickMenuComponent } from './quick-menu/quick-menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SendEmailComponent } from './navbar/send-email/send-email.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { LoginStateService } from '../../authpage/login-form/login-state.service';
import { CustomLoadingComponent } from './custom-loading/custom-loading.component';
import { ValidateActionComponent } from './validate-action/validate-action.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { RouterModule } from '@angular/router';
import { CustomLoadingFlightSearchComponent } from './custom-loading-flight-search/custom-loading-flight-search.component';
import { MyProfilComponent } from './navbar/my-profil/my-profil.component';
import { SecurityComponent } from './navbar/security/security.component';
import { CustomLoadingHotelSearchComponent } from './custom-loading-hotel-search/custom-loading-hotel-search.component';

@NgModule({
  declarations: [CustomCurrencyPipe,
    SendEmailComponent,
    CustomLoadingComponent,
    ValidateActionComponent,
    MapComponent,
    MyProfilComponent,

    CustomLoadingFlightSearchComponent,
    CustomLoadingHotelSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ],
  providers: [CustomCurrencyPipe, LoginStateService],
  entryComponents: [SendEmailComponent, ValidateActionComponent],
  exports: [CustomLoadingComponent, RouterModule, MyProfilComponent, CustomLoadingFlightSearchComponent, CustomLoadingHotelSearchComponent],
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SiderbarComponent } from './shared/siderbar/siderbar.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { httpTranslateLoader } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesComponent } from './pages.component';
import { QuickMenuComponent } from './shared/quick-menu/quick-menu.component';
import { SecondNavBarComponent } from './shared/second-nav-bar/second-nav-bar.component';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
       , {
        path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      }
      , {
        path: 'import-pnr',
        loadChildren: () => import('./secondary/import-pnr/import-pnr.module').then(m => m.ImportPnrModule),
      }
      , {
        path: 'files',
        loadChildren: () => import('./secondary/files/files.module').then(m => m.FilesModule),
      }
      , {
        path: 'sub-agent',
        loadChildren: () => import('./secondary/sub-agent/sub-agent.module').then(m => m.SubAgentModule),
      }
      , {
        path: 'agency-profile',
        loadChildren: () => import('./secondary/agency-profile/agency-profile.module').then(m => m.AgencyProfileModule),
      }
      , {
        path: 'passengers',
        loadChildren: () => import('./secondary/passenger/passenger.module').then(m => m.PassengerModule),
      }
      , {
        path: 'news',
        loadChildren: () => import('./secondary/news/news.module').then(m => m.NewsModule),
      }
      , {
        path: 'commissions',
        loadChildren: () => import('./secondary/commissions/commissions.module').then(m => m.CommissionsModule),
      }
      , {
        path: 'finance',
        loadChildren: () => import('./secondary/finance/finance.module').then(m => m.FinanceModule),
      }
      , {
        path: 'flight-info',
        loadChildren: () => import('./secondary/flight-info/flight-info.module').then(m => m.FlightInfoModule),
      }
      , {
        path: 'support',
        loadChildren: () => import('./secondary/support/support.module').then(m => m.SupportModule),
      }
      , {
        path: 'help-desk',
        loadChildren: () => import('./secondary/help-desk/help-desk.module').then(m => m.HelpDeskModule),
      },
      {
        path: 'flight',
        loadChildren: () => import('./primary/flight/flight.module').then(m => m.FlightModule),
      },
      {
        path: 'transfer',
        loadChildren: () => import('./primary/transfer/transfer.module').then(m => m.TransferModule),
      },
      {
        path: 'hotel',
        loadChildren: () => import('./primary/hotel/hotel.module').then(m => m.HotelModule),
      },
      {
        path: 'insurance',
        loadChildren: () => import('./primary/insurance/insurance.module').then(m => m.InsuranceModule),
      },
      {
        path: 'visa',
        loadChildren: () => import('./primary/visa/visa.module').then(m => m.VisaModule),
      },
      {
        path: 'car-hire',
        loadChildren: () => import('./primary/car-hire/car-hire.module').then(m => m.CarHireModule),
      }, {
        path: 'commissions-agent',
        loadChildren: () => import('./secondary/commissions-agent/commissions-agent.module').then(m => m.CommissionsAgentModule),
      }
    ]
  }
];

@NgModule({
  declarations: [PagesComponent,
    NavbarComponent,
    SecondNavBarComponent,
    SiderbarComponent,
    QuickMenuComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgbModule,

  ],
  providers: []
})
export class PagesModule { }

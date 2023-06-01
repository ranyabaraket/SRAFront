import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FlightBookingModel } from './flightBookingModel';
import { StoreFlightDataService } from '../../store-flight-data.service';
import { PassengerDetailsFlightService } from './passenger-details-flight.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FareRulesDetailsComponent } from '../shared-flight/fare-rules-details/fare-rules-details.component';
import { ValidateActionComponent } from 'src/app/views/pages/shared/validate-action/validate-action.component';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-passenger-details-flight',
  templateUrl: './passenger-details-flight.component.html',
  styleUrls: ['./passenger-details-flight.component.scss']
})
export class PassengerDetailsFlightComponent implements OnInit, AfterViewInit, OnDestroy {
  flightBookingModel: FlightBookingModel = new FlightBookingModel();
  subscription1;
  subscription2;
  submitted: boolean;
  pays;
  agreeConditions;
  sourceCode;
  flightDetails;
  loading;
  loadingFareSource;
  totalPrice = 0;
  constructor(
    private router: Router,
    private passengerDetails: PassengerDetailsFlightService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private storeFlightData: StoreFlightDataService,
    private currencyPipe: CustomCurrencyPipe,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private cookie: CookieService,
    private toast: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.storeFlightData.changeStep(2);
  }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.sourceCode = JSON.parse(localStorage.getItem('fareSourceCode'));
    console.log(this.sourceCode)
    //  if (this.sourceCode){ localStorage.removeItem('fareSourceCode'); }
    // window.addEventListener('message', event => {
    //    if (event.origin !== `${environment.front_url}`){ return; }
    if (!this.sourceCode) { this.router.navigate(['/pages/home']); }
    // if (JSON.parse(localStorage.getItem('fareSourceCode'))) {
    //   localStorage.removeItem('fareSourceCode'); }
    this.subscription1 = this.passengerDetails.getPassengerDetails(this.sourceCode).subscribe(
      data => {
        this.flightBookingModel = data;
      }, err => { this.toastr.error('Server Error'); }
    );
    this.subscription2 = this.passengerDetails.getFlightDetails(this.sourceCode, 'CASH').subscribe(
      data => {
        if (data.success) {
          this.flightDetails = data;
          console.log("this.flightDetails")
          console.log(this.flightDetails)
          // tslint:disable-next-line: max-line-length
          if (this.flightDetails) { this.totalPrice = Number(this.flightDetails.pricedItineraries[0].airItineraryPricingInfos[0].itinTotalFare.totalFare.amount); }
        } else {
          if (data.errors) {
            console.error(data.errors);
            this.toastr.error(this.translate.instant(data.errors[0].message));
          } else {
            this.toastr.error('No available Seats');

            setTimeout(() => {
              this.router.navigate(['/pages/home']);
            }, 2000);
          }
        }
      }
      , err => { this.toastr.error('Server Error'); }
    );

    this.getPays();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if (this.subscription1) { this.subscription1.unsubscribe(); }
    if (this.subscription2) { this.subscription2.unsubscribe(); }
  }

  getPays() {
    this.passengerDetails.getCountries().subscribe(
      data => {
        this.pays = data;
      },
      err => console.log(err)
    );
  }
  autoCompletePsgInfo(option) {
    this.flightBookingModel.email = option.mail;
    this.flightBookingModel.typeTel = option.typeTel;
    this.flightBookingModel.phoneNumber = option.tel;
    this.flightBookingModel.indPaysTel = option.indTel;
    this.flightBookingModel.countryTel = option.countryTel;
  }
  save(str, clienForm) {
    this.flightBookingModel.fareType=this.flightDetails.pricedItineraries[0].fareType
    if (this.cookie.get('canBook') !== 'O') {
      this.toast.warning(this.translate.instant('Action not allowed'));
      return;
    }
    this.submitted = true;
    if (clienForm.invalid) {
      return;
    }
    if(this.flightBookingModel.adults.length>0 && this.flightBookingModel.adults!=null)
    {
      for (let i = 0; i < this.flightBookingModel.adults.length; i++) {
        const form = document.getElementById('formPassengerAdult' + i).getElementsByTagName('form').item(0);
        if (!form.checkValidity()) {
          return;
        }
      }
    }
  if(this.flightBookingModel.childs.length>0 && this.flightBookingModel.childs!=null)
   {
    for (let i = 0; i < this.flightBookingModel.childs.length; i++) {
      const form = document.getElementById('formPassengerChild' + i).getElementsByTagName('form').item(0);
      if (!form.checkValidity()) {
        return;
      }
    }
   }
   if(this.flightBookingModel.infants.length>0 && this.flightBookingModel.infants!=null)
   {
    for (let i = 0; i < this.flightBookingModel.infants.length; i++) {
      const form = document.getElementById('formPassengerInfant' + i).getElementsByTagName('form').item(0);
      if (!form.checkValidity()) {
        return;
      }
    }
   }


    this.loading = true;
    this.flightBookingModel.fareSourceCode = this.sourceCode;
    this.flightBookingModel.modeReg = 'CASH';
    this.dialog.open(ValidateActionComponent, {
      data: 'Are you sure you want to Book This Flight?',
      width: '400px',
      height: '160px',
    }).afterClosed().subscribe(result => {
      console.log("resuuuult"+result)
      if (result) {
        this.passengerDetails.bookingFligh(this.flightBookingModel).subscribe(
          data => {
            console.log("data"+data)
            if (data.success) {
              console.log("successs")
              this.router.navigate(['/pages/flight/result/confirmation'], {
                state: {
                  data
                }
              });
              this.storeFlightData.changeStep(3);
            }
            if (!data.success && data.errorMessage) {
              this.toastr.error(data.errorMessage);
            }
            this.loading = false;
          }, err => {
            console.log(err);
            this.loading = false;
            this.toastr.error('Error');
          }
        );

        //     this.router.navigate(['/pages/flight/result/confirmation'], {
        //       state: {
        //         idTiers: 2932,
        //         numPnr: 'THG7A4',
        //         uniqueId: 'WS00181656',
        //       }
        //     });
        //     this.storeFlightData.changeStep([2, 3]);
        //   }
        // });

      }
    });
  }
  /* test() {
     this.dialog.open(ValidateActionComponent, {
       data: 'Are you sure you want to Book This Flight?',
       width: '400px',
       height: '160px',
     }).afterClosed().subscribe(result => {
       if (result) {
         this.passengerDetails.test().subscribe(
           data => {
             if (data.success) {
               this.router.navigate(['/pages/flight/result/confirmation'], {
                 state: {
                   data
                 }
               });
               this.storeFlightData.changeStep(3);
             }
             if (!data.success && data.errorMessage) {
               this.toastr.error(data.errorMessage);
             }
             this.loading = false;
           }, err => {
             console.log(err);
             this.loading = false;
             this.toastr.error('Error');
           }
         );
         //     this.router.navigate(['/pages/flight/result/confirmation'], {
         //       state: {
         //         idTiers: 2932,
         //         numPnr: 'THG7A4',
         //         uniqueId: 'WS00181656',
         //       }
         //     });
         //     this.storeFlightData.changeStep([2, 3]);
         //   }
         // });
       }
     });
   }*/
  openFareRulesDetails() {
    this.loadingFareSource = true;
    let fareRulesDetails;
    this.passengerDetails.getFareRulesDetail(this.sourceCode).subscribe(
      data => {
        if (data) {
          if (data) {
            fareRulesDetails = data;
            fareRulesDetails.fareRules[0].ruleDetails.forEach(element => {
              element.open = false;
            });
            this.dialog.open(FareRulesDetailsComponent, {
              data: fareRulesDetails,
              width: '800px',
              height: 'auto',
            });
          }
          else {
            this.toastr.error(this.translate.instant('Error'));
          }
        }
        this.loadingFareSource = false;
      },
      err => {
        this.toastr.error(this.translate.instant(err));
        this.loadingFareSource = false;
      }
    );
  }
  SumtotalPrice(value) {
    if (parseFloat(value) < 0) {
      this.flightBookingModel.customerCharge = 0;
    }
    this.totalPrice = parseFloat(this.flightDetails.pricedItineraries[0].airItineraryPricingInfos[0].itinTotalFare.totalFare.amount) +
    parseFloat(this.flightBookingModel.customerCharge);
  }
  formatCurr(c) {
    return this.currencyPipe.transform(Math.round(parseFloat(c)));
  }
}

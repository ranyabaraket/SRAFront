import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { FlightService } from '../../../flight.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flight-info-classes',
  templateUrl: './flight-info-classes.component.html',
  styleUrls: ['./flight-info-classes.component.scss']
})
export class FlightInfoClassesComponent implements OnInit {
  datePipe = new DatePipe('en-US');
  classs;
  typePassenger: any;
  quantityPassenger: any;
  fareBasic: any;
  currency: any;
  totalFare: any;
  totalFareCurr: any;
  listClasses: any = [];
  singleCityPairX: any = [];
  airMultiAvailabilityResultModel: any = {};
  taxAmnt: any;
  taxDev: any;
  newData = false;
  newfareData;
  loadingSearch1 = false;
  classId: any = [];
  credits: number;

  constructor(
    private toastr: ToastrService,
    private toast: ToastrService,
    private router: Router,
    private cookie: CookieService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private flightService: FlightService,
    public dialogRef: MatDialogRef<FlightInfoClassesComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.credits = Number(this.cookie.get('creditsLimit')) + Number(this.cookie.get('credits'));
    this.typePassenger = this.data.pricedItinerary.airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerTypeQuantity.code;
    this.quantityPassenger = this.data.pricedItinerary.airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerTypeQuantity.quantity;
    this.fareBasic = this.data.pricedItinerary.airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.baseFare.amount;
    this.currency = this.data.pricedItinerary.airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.baseFare.currencyCode;
    this.totalFare = this.data.pricedItinerary.airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.totalFare.amount;
    this.totalFareCurr = this.data.pricedItinerary.airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.totalFare.currencyCode;
    this.taxAmnt = this.data.pricedItinerary.airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.tax.amount;
    this.taxDev = this.data.pricedItinerary.airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.tax.currencyCode;
    this.singleCityPairX = this.data.singleCityPair;
  }

  changeClass(item, k, j) {
    this.singleCityPairX[k].flightInfosList[j].selectedClass = item;
  }
  getFare() {
    this.loadingSearch1 = true;
    this.airMultiAvailabilityResultModel.idGds = this.data.idGds;
    this.airMultiAvailabilityResultModel.pricedItinerary = this.data.pricedItinerary;
    this.airMultiAvailabilityResultModel.fareSourceCode = this.data.fareSourceCode;
    this.airMultiAvailabilityResultModel.session = this.data.session;
    this.airMultiAvailabilityResultModel.singleCityPair = this.singleCityPairX;
    this.flightService.getFlightDetails(this.airMultiAvailabilityResultModel).subscribe(
      data => {
        this.loadingSearch1 = false;
        if (data.success === false) {
          // tslint:disable-next-line: max-line-length
          this.toastr.warning(this.translate.instant('No more rates'), this.translate.instant('ERROR'));
        }
        if (data.success === true) {
          this.newfareData = data;
          this.fareBasic = data.pricedItineraries[0].airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.baseFare.amount;
          this.currency = data.pricedItineraries[0].airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.baseFare.currencyCode;
          this.totalFare = data.pricedItineraries[0].airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.totalFare.amount;
          // tslint:disable-next-line: max-line-length
          this.totalFareCurr = data.pricedItineraries[0].airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.totalFare.currencyCode;
          this.taxAmnt = data.pricedItineraries[0].airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.tax.amount;
          this.taxDev = data.pricedItineraries[0].airItineraryPricingInfos[0].ptcFareBreakdowns[0].passengerFare.tax.currencyCode;
          this.newData = true;
        }
      }, err => {
        this.loadingSearch1 = false;
      }
    );
  }

  bookflight(fareSourceCode, tktAmnt) {
    if (Number(tktAmnt) <= this.credits) {
    this.dialogRef.close();
    const url = this.router.createUrlTree(['/pages/flight/result/passenger-details']);
    const myPopup = window.open('#' + url.toString(), '_blank');
    setTimeout(() => {
      const message = fareSourceCode;
      myPopup.postMessage(message, `${environment.front_url}`);
    }, 6000);
  }
    if (Number(tktAmnt) > this.credits) {
      this.toast.warning(this.translate.instant('insufficient balance'), this.translate.instant('ERROR'));
    }
  }

}

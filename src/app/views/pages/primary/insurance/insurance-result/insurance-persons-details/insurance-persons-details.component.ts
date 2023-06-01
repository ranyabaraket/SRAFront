import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { ConfirmPurchaseModel, Flight, Passenger } from '../../confirmPurchaseModel';
import { InsuranceService } from '../../insurance.service';
import { InsurancePersonsDetailsService } from './insurance-persons-details.service';

@Component({
  selector: 'app-insurance-persons-details',
  templateUrl: './insurance-persons-details.component.html',
  styleUrls: ['./insurance-persons-details.component.scss']
})
export class InsurancePersonsDetailsComponent implements OnInit, OnDestroy {
  step = { name: 'Confirmation', stepPassed: false, stepActive: false };

  selectedInsurance: any;
  passengerModel: Passenger = new Passenger();
  flightModel: Flight = new Flight();
  passengerModel1: any = [];
  passengerModel2: any = [];
  passengerModel3: any = [];
  submitted: boolean;
  loadingSearch = true;
  dataCollect: any = [];
  dataCollectFlight: any = [];
  PNRnumber;
  contactName;
  emailContact;
  departAirlineCode1;
  departFlightNo1;
  returnAirlineCode1;
  returnFlightNo1;
  confirmPurchase: ConfirmPurchaseModel = new ConfirmPurchaseModel();
  datePipe = new DatePipe('en-US');
  dataRslt: any;
  resultData = false;
  inputData = true;
  status: any;
  itineraryID: any;
  totalAgedPax: any;
  filteredByFirstNamePsg: Observable<any[]>;
  dataToConfirmReservation: any;

  constructor(
    public translate: TranslateService,
    private toast: ToastrService,
    private insuranceService: InsuranceService,
    private insurancePersonsDetailsService: InsurancePersonsDetailsService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private currencyPipe: CustomCurrencyPipe
  ) { }
  format(value) {
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.insuranceService.changeStep(2);
  }
  ngOnInit(): void {
    this.selectedInsurance = JSON.parse(localStorage.getItem('insuranceSelected'));
    if (!this.selectedInsurance) {
      this.router.navigate(['/pages/insurance']);
    }
    this.filltab();
  }

  ngOnDestroy() {
    // localStorage.removeItem('insuranceSelected');
  }

  filltab() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectedInsurance.searchModel.totalAdults; i++) {
      this.passengerModel1.push({ passengerModel: new Passenger() });
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectedInsurance.searchModel.totalChild; i++) {
      this.passengerModel2.push({ passengerModel: new Passenger() });
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectedInsurance.searchModel.totalInfants; i++) {
      this.passengerModel3.push({ passengerModel: new Passenger() });
    }
    this.loadingSearch = false;
  }

  trustHtml(exemple) {
    return this.sanitizer.bypassSecurityTrustHtml(exemple);
  }

  getFirstName(value) {
    this.contactName = value.toUpperCase();
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByFirstNamePsg = this.insurancePersonsDetailsService.searchPassengerByFirstName(this.contactName);
    }
  }

  selectPassenger(option) {
    this.emailContact = option.mail;
  }

  select(clientForm) {
    this.submitted = true;
    if (clientForm.invalid) {
      return;
    }
    this.loadingSearch = true;
    this.totalAgedPax = this.selectedInsurance.searchModel.totalChild + this.selectedInsurance.searchModel.totalAdults;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectedInsurance.searchModel.totalAdults; i++) {
      if (this.selectedInsurance.selectedItem.planPremiumChargeType === 'PerBooking') {
        const paxAmnt = this.selectedInsurance.selectedItem.premiumAmount / this.totalAgedPax;
        this.passengerModel1[i].passengerPremiumAmount = paxAmnt.toFixed(2);
      }
      if (this.selectedInsurance.selectedItem.planPremiumChargeType !== 'PerBooking') {
        this.passengerModel1[i].passengerPremiumAmount = this.selectedInsurance.selectedItem.premiumAmount;
      }
      this.passengerModel1[i].currencyCode = this.selectedInsurance.selectedItem.currencyCode;
      this.passengerModel1[i].selectedSSRFeeCode = this.selectedInsurance.selectedItem.sSRFeeCode;
      this.passengerModel1[i].selectedPlanCode = this.selectedInsurance.selectedItem.planCode;
      this.passengerModel1[i].identityType = 'Passport';
      this.passengerModel1[i].isInfant = 'Adult';
    //  this.passengerModel1[i].typePers = 'Adult';
      // tslint:disable-next-line: max-line-length
      if (this.passengerModel1[i].age <= this.selectedInsurance.selectedItem.maxAge) {
        this.passengerModel1[i].isQualified = 'true';
      } else {
        // tslint:disable-next-line: max-line-length
        this.toast.warning(this.translate.instant('Invalid adult age'),
        this.translate.instant('ERROR'));
        this.passengerModel1[i].isQualified = 'false';
        this.dataCollect = [];
        this.loadingSearch = false;
        return;
      }
      this.dataCollect.push(this.passengerModel1[i]);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectedInsurance.searchModel.totalChild; i++) {
      if (this.selectedInsurance.selectedItem.planPremiumChargeType === 'PerBooking') {
        const paxAmnt = this.selectedInsurance.selectedItem.premiumAmount / this.totalAgedPax;
        this.passengerModel2[i].passengerPremiumAmount = paxAmnt.toFixed(2);
      }
      if (this.selectedInsurance.selectedItem.planPremiumChargeType !== 'PerBooking') {
        this.passengerModel2[i].passengerPremiumAmount = this.selectedInsurance.selectedItem.premiumAmount;
      }
      this.passengerModel2[i].currencyCode = this.selectedInsurance.selectedItem.currencyCode;
      this.passengerModel2[i].selectedSSRFeeCode = this.selectedInsurance.selectedItem.sSRFeeCode;
      this.passengerModel2[i].selectedPlanCode = this.selectedInsurance.selectedItem.planCode;
      this.passengerModel2[i].identityType = 'Passport';
      this.passengerModel2[i].isInfant = 'Child';
    //  this.passengerModel2[i].typePers = 'Child';

      // tslint:disable-next-line: max-line-length
      if (this.passengerModel2[i].age <= this.selectedInsurance.selectedItem.maxAge && this.passengerModel2[i].age > this.selectedInsurance.selectedItem.minAge) {
        this.passengerModel2[i].isQualified = 'true';
      } else {
        // tslint:disable-next-line: max-line-length
        this.toast.warning(this.translate.instant('Invalid child age'), this.translate.instant('ERROR'));
        this.passengerModel2[i].isQualified = 'false';
        this.dataCollect = [];
        this.loadingSearch = false;
        return;
      }
      this.dataCollect.push(this.passengerModel2[i]);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectedInsurance.searchModel.totalInfants; i++) {
      this.passengerModel3[i].passengerPremiumAmount = 0;
      this.passengerModel3[i].currencyCode = this.selectedInsurance.selectedItem.currencyCode;
      this.passengerModel3[i].selectedSSRFeeCode = this.selectedInsurance.selectedItem.sSRFeeCode;
      this.passengerModel3[i].selectedPlanCode = this.selectedInsurance.selectedItem.planCode;
      this.passengerModel3[i].identityType = 'Passport';
      this.passengerModel3[i].isInfant = 'Infant';

      // tslint:disable-next-line: max-line-length
      if (this.passengerModel3[i].age <= this.selectedInsurance.selectedItem.minAge) {
        this.passengerModel3[i].isQualified = 'true';
      } else {
        this.passengerModel3[i].isQualified = 'false';
        this.dataCollect = [];
        this.loadingSearch = false;
        this.toast.warning(this.translate.instant('Invalid infant age'), this.translate.instant('ERROR'));
        return;
      }
      this.dataCollect.push(this.passengerModel3[i]);
    }
    this.confirmPurchase.purchaseDate = this.datePipe.transform(this.confirmPurchase.purchaseDate, 'yyyy-MM-dd');
    this.confirmPurchase.pnr = this.PNRnumber;
    this.confirmPurchase.totalAdults = this.selectedInsurance.searchModel.totalAdults;
    this.confirmPurchase.totalChild = this.selectedInsurance.searchModel.totalChild;
    this.confirmPurchase.totalInfants = this.selectedInsurance.searchModel.totalInfants;
    this.confirmPurchase.contactPerson = this.contactName;
    this.confirmPurchase.emailAddress = this.emailContact;
    this.confirmPurchase.sSRFeeCodePR = this.selectedInsurance.selectedItem.sSRFeeCode;
    this.confirmPurchase.planTitle = this.selectedInsurance.selectedItem.planTitle;
    this.confirmPurchase.totalPremiumPR = this.selectedInsurance.selectedItem.totalPremiumAmount;
    this.confirmPurchase.flights[0].arrivalCountryCode = this.selectedInsurance.searchModel.arrivalCountryCode;
    this.confirmPurchase.flights[0].arrivalStationCode = this.selectedInsurance.searchModel.arrivalStationCode;
    this.confirmPurchase.flights[0].departCountryCode = this.selectedInsurance.searchModel.departCountryCode;
    this.confirmPurchase.flights[0].departDateTime = this.selectedInsurance.searchModel.departDateTime;
    this.confirmPurchase.flights[0].departStationCode = this.selectedInsurance.searchModel.departStationCode;
    this.confirmPurchase.flights[0].returnDateTime = this.selectedInsurance.searchModel.returnDateTime;
    this.confirmPurchase.flights[0].departAirlineCode = this.departAirlineCode1;
    this.confirmPurchase.flights[0].departFlightNo = this.departFlightNo1;
    this.confirmPurchase.flights[0].returnAirlineCode = this.returnAirlineCode1;
    this.confirmPurchase.flights[0].returnFlightNo = this.returnFlightNo1;
    this.confirmPurchase.passengers = this.dataCollect;
    this.confirmPurchase.riders[0].currency = this.selectedInsurance.selectedItem.currencyCode;
    this.confirmPurchase.riders[0].totalPremium = this.selectedInsurance.selectedItem.totalPremiumAmount;
    this.confirmPurchase.riders[0].sSRFeeCode = this.selectedInsurance.selectedItem.sSRFeeCode;
    this.confirmPurchase.mains[0].currency = this.selectedInsurance.selectedItem.currencyCode;
    this.confirmPurchase.mains[0].totalPremium = this.selectedInsurance.selectedItem.totalPremiumAmount;
    this.confirmPurchase.mains[0].sSRFeeCode = this.selectedInsurance.selectedItem.sSRFeeCode;
    this.confirmPurchase.nbrJour = this.selectedInsurance.searchModel.nbrJour;

    this.insuranceService.confirmPurchase(this.confirmPurchase).subscribe(
      data => {
        this.dataToConfirmReservation = data;
        if (!data.success) {
          this.toast.warning(this.translate.instant(data.error), this.translate.instant('ERROR'));
          this.loadingSearch = false;
          return;
        }
        if (data.proposalState === 'CONFIRMED') {
          this.dataRslt = data;
          this.status = this.dataRslt.proposalState;
          this.itineraryID = this.dataRslt.itineraryID;
          localStorage.setItem('confirmPurchase', JSON.stringify(this.confirmPurchase));
          localStorage.setItem('dataToConfirmReservation', JSON.stringify(this.dataToConfirmReservation));
          this.router.navigate(['/pages/insurance/result/voucher'], {});
          // localStorage.removeItem('insuranceSelected');
        }
        if (data.proposalState === 'ONHOLD') {
          this.confirmPurchase = new ConfirmPurchaseModel();
          this.dataCollect = [];
          this.toast.warning(this.translate.instant('PNR already exist'), this.translate.instant('ERROR'));
        }
        this.loadingSearch = false;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ConfirmationFlightService } from './confirmation-flight.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ValidateActionComponent } from 'src/app/views/pages/shared/validate-action/validate-action.component';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import jsPDF from 'jspdf';
import { StoreFlightDataService } from '../../store-flight-data.service';
@Component({
  selector: 'app-confirmation-flight',
  templateUrl: './confirmation-flight.component.html',
  styleUrls: ['./confirmation-flight.component.scss']
})
export class ConfirmationFlightComponent implements OnInit {
  confirmationFlightModel;
  loading;
  showVoucher;
  bookingDetails;
  totalPrice;
  entityLogo;
  paxName = {
    ADT: 'Adult',
    CHD: 'Child',
    CH: 'Child',
    INF: 'Child',
    IN: 'Infant',
    STU: 'Student',
    SRC: 'Senior',
    SEA: 'Seaman',
  };
  menu = [
    { lmodule: 'Hotel', iconName: 'fas fa-hotel' },
    { lmodule: 'Visa', iconName: 'fas fa-passport' },
    { lmodule: 'Transfer', iconName: 'fas fa-exchange-alt' },
    { lmodule: 'Cruise', iconName: 'fas fa-ship' },
  ];
  datePipe = new DatePipe('en-US');
  displayInVoucher = [];
  voucherData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationFlightService: ConfirmationFlightService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private currencyPipe: CustomCurrencyPipe,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private dialogRef: MatDialog,
    private storeFlightData: StoreFlightDataService,
  ) { }

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    // this.passengerDetails.test().subscribe(
    //   data => { this.bookingDetails = data; }
    // );
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.data) {
        this.bookingDetails = res.data;
        this.bookingDetails.travelItinerary.itineraryInfo.customerInfos.forEach(
          element => this.displayInVoucher.push(true)
        );
      }
      else {
        this.router.navigate(['/pages/flight']);
      }
    });
    this.confirmationFlightService.getEntityLogo()
      .then(res => res.text())// convert to plain text
      .then(text => this.entityLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + text));

  }

  voucher(psg){
    console.log("incluuuuuude")
    console.log(this.displayInVoucher)
    if (!this.displayInVoucher.includes(true)){
      this.toastr.warning(this.translate.instant('Select at least one passenger'));
      return ;
    }
    // tslint:disable-next-line:prefer-const
    console.log("psg")
    console.log(psg)

    this.voucherData.passenger = psg;
    this.voucherData.details = this.bookingDetails;
  //  this.voucherData.displayPrice = this.displayPrice;
    this.dialogRef.open(ValidateActionComponent, {
      width: '400px',
      height: '160px',
      data: 'Do you want to show price ?'
    }).afterClosed().subscribe(result => {
      this.voucherData.displayPrice = result;
      let voucherData=this.voucherData;
      this.storeFlightData.changeStep(4);
     this.router.navigate(['/pages/flight/result/voucher'],
     {state: {voucherData}

    });
    });

  }

  cancelTicket() {
    this.dialog.open(ValidateActionComponent, {
      data: 'Are you sure you want to cancel this ticket?',
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.confirmationFlightService.cancelTicket(
          this.bookingDetails.travelItinerary.uniqueID).subscribe(
            data => {
              if (data.value === 'true' || data.value === true) {
                this.toastr.success('Ticket Canceled');
                this.bookingDetails.etat = 'Canceled';
              }
              else if (data.value === false || data.value === 'false') {
                this.toastr.error('Error');
              } else {
                this.toastr.error(data.value);
              }
              this.loading = false;
            },
            err => { this.toastr.error(err); this.loading = false; }
          );
      }
    });
  }
  orderEticket() {
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are you sure you want to order this ticket?'),
      width: '400px',
      height: '160px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.confirmationFlightService.ticketOrder(this.bookingDetails.travelItinerary.uniqueID,
          this.bookingDetails.flightBooking.modeReg).subscribe(
            data => {
              if (data.success === 'true' || data.success === true) {
                this.toastr.success('Order E-Ticket');
                this.bookingDetails.etat = data.etat;

              }
              else if ((data.success === false || data.success === 'false') && data.errorMessage) {
                this.toastr.error(data.errorMessage);
              } else {
                this.toastr.error('Error');
              }
              this.loading = false;
            },
            err => { this.toastr.error('Server Error'); this.loading = false; }
          );
      }
    });
  }
  voidTicket() {
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are you sure you want to void this ticket?'),
      width: '400px',
      height: '160px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.confirmationFlightService.voidTicket(
          this.bookingDetails.travelItinerary.uniqueID).subscribe(
            data => {
              if (data.value === 'true' || data.value === true) {
                this.toastr.success('Ticket Voided');
                this.bookingDetails.etat = 'Voided';
              }
              else if (data.value === 'false' || data.value === false) {
                this.toastr.error('Error');
              } else {
                this.toastr.error('Error');
              }
              this.loading = false;
            },
            err => { this.toastr.error(err); this.loading = false; }
          );
      }
    });
  }
  updateTKTL(){
    this.loading = true;
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are you sure you want to update the time limit ?'),
      width: '400px',
      height: '160px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.confirmationFlightService.updatetkTl(this.bookingDetails.airRevalidateResponse.pricedItineraries[0]
          .originDestinationOptions[0].flightSegment[0].airlinePnr ,
          this.bookingDetails.idGds).subscribe(
            data => {
              this.loading = false;
              if (data) { this.toastr.success(data);
                          this.bookingDetails.tktTimeLimit = data; }
              else if (!data) {
                this.toastr.error(this.translate.instant('Server Error'));
              }
            },
            err => { this.toastr.error(this.translate.instant(err)); this.loading = false; }
          );
      }
    });
  }
  SumtotalPrice(value) {
    if (Number(value) < 0) {
      this.bookingDetails.customerCharge = 0;
    }
  }
  convertToNumber(value) {
    if (value === null || !value) {
      return 0;
    } else {
      return Number(value);
    }
  }
  formatCurr(value) {
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
  cancel(ok: boolean) {
    this.showVoucher = false;
    this.storeFlightData.changeStep(3);
  }


}

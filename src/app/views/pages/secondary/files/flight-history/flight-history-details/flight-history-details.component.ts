import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlightHistoryDetailsService } from './flight-history-details.service';
import { ToastrService } from 'ngx-toastr';
import { BookingDetails } from './bookingDetails';
import { LanguageService } from '../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidateActionComponent } from 'src/app/views/pages/shared/validate-action/validate-action.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ExportAsConfig } from 'ngx-export-as';
import { FlightHistoryDetailsVoucherComponent } from './flight-history-details-voucher/flight-history-details-voucher.component';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';

@Component({
  selector: 'app-flight-history-details',
  templateUrl: './flight-history-details.component.html',
  styleUrls: ['./flight-history-details.component.scss']
})
export class FlightHistoryDetailsComponent implements OnInit {
  @Input() inputData: any;
  @Output() backward = new EventEmitter();

  bookingDetails: BookingDetails = new BookingDetails();
  loading: boolean;

  showVoid: boolean;
  showRefund: boolean;
  showReissue: boolean;
  showVoucher: boolean;
  mainPage = true;
  exportAsConfig: ExportAsConfig;
  entityLogo;
  voucherData: any = [];
  displayPrice = true;
  displayInVoucher = [];
  constructor(
    private flightDetailsService: FlightHistoryDetailsService,
    private toastr: ToastrService,
    public languageServise: LanguageService,
    public translate: TranslateService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialog,
    private currencyPipe: CustomCurrencyPipe,
  ) {

  }

  ngOnInit() {
    this.loading = true;
    //   this.route.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
    if (this.inputData) {
      this.flightDetailsService.getBookingDetails(this.inputData.numPnr, this.inputData.uniqueId).subscribe(
        data => {
          if (data) {
            this.bookingDetails = data;
            this.loading = false;
            this.bookingDetails.passengers.forEach(
              element => this.displayInVoucher.push(false)
            );
          }
         // else { this.back(); }
          // this.getPnrHistory();
        },
        err => {
          this.toastr.error(err); this.loading = false;
          this.back();
        }
      );
    }
    else {

    }
    //   });
    this.flightDetailsService.getEntityLogo()
      .then(res => res.text())          // convert to plain text
      .then(text => this.entityLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + text));
  }

  void() {
    this.showVoid = true;
    if (this.bookingDetails.codeGds === 'AMA' && !this.bookingDetails.canBeVoid) {
      //  this.toastr.info('Not allowed to void. It\'s beyond permitted time to void this ticket');
    } else {
      this.showVoid = true;
    }
  }
  refund() {
    this.showRefund = true;
    if (this.bookingDetails.codeGds === 'AMA' && !this.bookingDetails.canBeVoid) {
      // this.toastr.info('Not allowed to void. It\'s beyond permitted time to void this ticket');
    }
  }
  reissue() {
    this.showReissue = true;
    /* if (this.bookingDetails.codeGds === 'AMA' && !this.bookingDetails.canBeVoid) {
       this.toastr.info('Not allowed to void. It\'s beyond permitted time to void this ticket');
     }*/
  }
  back(): void {
    this.backward.emit(false);
  }
  cancel(ok: boolean) {
    this.showRefund = false;
    this.showReissue = false;
    this.showVoid = false;
    this.showVoucher = false;
    this.mainPage = true;
  }
  exportAsPDF(item) {
    this.voucherData.passenger = item;
    this.voucherData.details = this.bookingDetails;
    this.voucherData.displayPrice = this.displayPrice;
  //  this.showVoucher = true;
 //   this.mainPage = false;
    this.dialogRef.open(FlightHistoryDetailsVoucherComponent, {
      width: '850px',
      height: '650px',
      data: this.voucherData
    });
    // opn(){
//  const myWindow =  window.open('', 'MsgWindow', 'width=400,height=500');
//  myWindow.document.write('<p>This window\'s name is: ' + myWindow.name + '</p>');
// }
  }
  getSrcImg(codeCom) {
    return 'https://worldsoftgroup.com/airelines/' + codeCom + '.png';
  }
  // back() {
  //   this.location.back();
  // }
  cancelTicket() {
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are you sure you want to cancel this ticket?'),
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {

        this.flightDetailsService.cancelTicket(this.bookingDetails.uniqueId).subscribe(
          data => {
            if (data.value === 'true' || data.value === true) { this.toastr.success(this.translate.instant('Ticket Canceled')); }
            else if (data.value === false || data.value === 'false') {
              this.toastr.error(this.translate.instant('Server Error'));
            } else {
              this.toastr.error(data.value);
            }

          },
          err => { this.toastr.error(this.translate.instant(err)); this.loading = false; }
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
        this.flightDetailsService.ticketOrder(this.bookingDetails.uniqueId,
          'CASH').subscribe(
            data => {
              if (data.value === 'true' || data.value === true) { this.toastr.success('Order E-Ticket'); }
              else if (data.value === false || data.value === 'false') {
                this.toastr.error(this.translate.instant('Server Error'));
              } else {
                this.toastr.error(data.value);
              }

            },
            err => { this.toastr.error(this.translate.instant(err)); this.loading = false; }
          );
      }
    });
  }
  voucher(item){
    // if (!this.displayInVoucher.includes(true)){
    //   this.toastr.warning(this.translate.instant('Select one passenger'));
    //   return ;
    // }
    this.voucherData.passenger = item; // this.bookingDetails.passengers[this.displayInVoucher.indexOf(true)];
    this.voucherData.details = this.bookingDetails;
  //  this.voucherData.displayPrice = this.displayPrice;
    this.dialogRef.open(ValidateActionComponent, {
      width: '400px',
      height: '160px',
      data: 'Do you want to show price ?'
    }).afterClosed().subscribe(result => {this.voucherData.displayPrice = result;
                                          this.showVoucher = true; });

  }
  format(value){
   return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
  updateTKTL(){
    this.dialog.open(ValidateActionComponent, {
      data: this.translate.instant('Are you sure you want to update the time limit ?'),
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.flightDetailsService.updatetkTl(this.bookingDetails.numPnr,
          this.bookingDetails.officeId).subscribe(
            data => {
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
}

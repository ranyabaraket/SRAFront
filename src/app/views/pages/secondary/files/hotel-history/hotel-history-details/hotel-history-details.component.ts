import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelHistoryDetailsService } from './hotel-history-details.service';
import { ConfirmationHotel } from './confirmationHotel';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
@Component({
  selector: 'app-hotel-history-details',
  templateUrl: './hotel-history-details.component.html',
  styleUrls: ['./hotel-history-details.component.scss']
})
export class HotelHistoryDetailsComponent implements OnInit {
  @Input() inputData: any;
  @Output() backward = new EventEmitter();

  token;
  bookingDetails: ConfirmationHotel = new ConfirmationHotel();
  loading: boolean;
  cancellationHotel;
  showVoucher;
  dataVoucher;
  private sub: any;
  entityLogo: any;
  tiersName: string;
  credits: string;
  creditsLimit: string;
  callCenter: string;
  trUserName: string;
  codeDevise: string;
  latitude: any;
  longitude: any;
  bookingStatus;
  defaultPolicy: any;
  disableVoucher: boolean;
  seeVoucherBtn: boolean;
  disableCancel: boolean;
  entityData;
  tiersLogo;
  email;
  constructor(
    private hotelDetailsService: HotelHistoryDetailsService,
    private cookie: CookieService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    public languageServise: LanguageService,
    public translate: TranslateService,
    private toast: ToastrService,
    public router: Router,
    private currencyPipe: CustomCurrencyPipe
    ) {

    if (this.cookie.get('UserInformation') != null) {
      this.tiersName = this.cookie.get('tiersName');
      this.credits = this.cookie.get('credits');
      this.creditsLimit = this.cookie.get('creditsLimit');
      this.callCenter = this.cookie.get('callCenter');
      this.trUserName = this.cookie.get('trUserName');
      this.codeDevise = this.cookie.get('codeDevise');
      this.email = this.cookie.get('email');

    }
  }

format(value){
  return this.currencyPipe.transform(Math.round(parseFloat(value)));
 }
  ngOnInit() {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    if (this.inputData.locIp != null) {
      this.latitude = this.inputData.locIp.split('-')[0];
      this.longitude = this.inputData.locIp.split('-')[1];
    }
    switch (this.inputData.etatResa) {
      case 'C':
        this.bookingStatus = 'Confirmed';
        this.disableVoucher = false;
        this.seeVoucherBtn = true;
        break;
      case 'P':
        this.bookingStatus = 'Pending';
        break;
      case 'V':
        this.bookingStatus = 'Vouchered';
        this.disableVoucher = true;
        this.seeVoucherBtn = false;
        break;
      case 'A':
        this.bookingStatus = 'Canceled';
        this.disableVoucher = true;
        this.seeVoucherBtn = true;
        this.disableCancel = true;
        break;
      default:
        this.bookingStatus = 'Confirmed';
        break;
    }
    this.entityData = JSON.parse(localStorage.getItem('entityData'));
    this.entityLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + JSON.parse(localStorage.getItem('entityLogo')));
    this.tiersLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + JSON.parse(localStorage.getItem('tiersLogo')));
    //  this.route.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
    if (this.inputData.uniqueId) {
      this.loading = true;
      this.hotelDetailsService.getBookingDetails(this.inputData.uniqueId, this.inputData.idGds, this.inputData.codeGds).subscribe(
        data => {
          this.bookingDetails = data;
          console.log("booking detail",this.bookingDetails);
          
          this.showVoucher=this.inputData.showVoucher;
      
      // if(this.showVoucher){
      //   this.dataVoucher = {
      //     bookingDetails: this.bookingDetails,
      //     concelationHotel: this.cancellationHotel,
      //     latitude: this.latitude,
      //     longitude: this.longitude,
      //     entityLogo: this.entityLogo
      //   };
      // }
        
          this.loading = false;
          this.hotelDetailsService.cancellationPolicyHotel(this.bookingDetails.sessionId).subscribe(
            result => {
              this.cancellationHotel = result;
              if (this.cancellationHotel.length > 0) {
                this.defaultPolicy = this.cancellationHotel[0].defaultPolicy;
              }
            },
            err => console.log(err)
          );
        },
        err => { this.toastr.error(err); this.loading = false; }
      );
    }
    else {
      this.loading = false;
      this.router.navigate(['/pages/files/hotel-history']);
    }
    // });
    // this.hotelDetailsService.getEntityLogo()
    //   .subscribe(res => {
    //     const result = JSON.parse(JSON.stringify(res));
    //     this.entityLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + result.logo);
    //   });
      
  }
  voucher() {
    this.showVoucher = true;
    this.dataVoucher = {
      bookingDetails: this.bookingDetails,
      concelationHotel: this.cancellationHotel,
      latitude: this.latitude,
      longitude: this.longitude,
      entityLogo: this.entityLogo
    };
  }
  cancel(ok: boolean) {
    this.showVoucher = false;
  }
  back(): void {
    this.backward.emit(false);
  }

  cancelBooking() {
    
    console.log("cancel booking",this.inputData);
    let confirmationModel = this.inputData
    confirmationModel.uniqueId = this.inputData.voucherRef;
    confirmationModel.gds = this.inputData.codeGds;
    // confirmationModel.voucherRef = this.inputData.voucherRef;
    
    this.hotelDetailsService.cancelHotelBooking(confirmationModel).subscribe(
      data => {
        if (data) {
          this.loading = false;
          if (data.success === true) {
            this.toast.success(this.translate.instant('Booking canceled with success'), this.translate.instant('SUCCESS'));
            this.disableVoucher = true;
            this.seeVoucherBtn = true;
            this.disableCancel = true;
            this.bookingStatus = 'Canceled';
          }
          if (data.success === false) {
            this.toast.warning(this.translate.instant('Error while cancelling the booking, please try again later'), this.translate.instant('ERROR'));
          }
        }
      }
    );
  }

  issueVoucher() {
    this.loading = true;
    this.hotelDetailsService.generateInvoice(this.bookingDetails).subscribe(
      data => {
        if (data) {
          this.loading = false;
          if (data.success === true) {
            this.toast.success(this.translate.instant('Voucher issued with success'), this.translate.instant('SUCCESS'));
            this.disableVoucher = true;
            this.seeVoucherBtn = false;
            this.bookingStatus = 'Vouchered';
          }
          if (data.success === false) {
            this.toast.warning(this.translate.instant('Can not issue the voucher'), this.translate.instant('ERROR'));
          }
        }
      }
    );
  }

}

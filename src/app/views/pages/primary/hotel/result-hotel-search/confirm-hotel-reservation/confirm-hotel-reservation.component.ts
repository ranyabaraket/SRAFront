import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { HotelService } from '../../hotel.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-confirm-hotel-reservation',
  templateUrl: './confirm-hotel-reservation.component.html',
  styleUrls: ['./confirm-hotel-reservation.component.scss']
})
export class ConfirmHotelReservationComponent implements OnInit, AfterViewInit {

  datePipe = new DatePipe('en-US');
  dataToConfirmReservation: any;
  comfirmationHotelModel: any;
  loadingSearch = true;
  passengerHotelBooking: any;
  disableVoucher: boolean;
  seeVoucherBtn: boolean;
  ResaStatus: string;
  disableCancel: boolean;
  rooms: any = [];
  constructor(
    private hotelService: HotelService,
    private router: Router,
    private toast: ToastrService,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngAfterViewInit(): void {
    this.hotelService.changeStep(4);
  }
  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.dataToConfirmReservation = JSON.parse(localStorage.getItem('invoiceModel'));
    this.passengerHotelBooking = JSON.parse(localStorage.getItem('passengerHotelBooking'));

    this.loadingSearch = false;
    this.rooms = this.passengerHotelBooking.rooms[0];
    switch (this.dataToConfirmReservation.status) {
      case 'CNF':
        this.ResaStatus = 'Confirmed';
        this.seeVoucherBtn = false;
        break;
      case 'PNDN':
        this.ResaStatus = 'Pending';
        this.seeVoucherBtn = false;
        break;
        case 'VCHR':
          this.ResaStatus = 'Vouchered';
          this.disableVoucher = true;
          this.seeVoucherBtn = false;
          break;
      default:
        this.ResaStatus = 'Confirmed';
        break;
    }
    // this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
    //   if (res.data) {
    //     this.dataToConfirmReservation = res.data;
    //     console.log('data confirm',  res);
    //   }
    //   // else {
    //   //   this.router.navigate(['/pages/hotel']);
    //   // }
    // });
  }
  seeVoucher() {
    this.router.navigate(['/pages/hotel/result/voucher-details'], {});
    this.hotelService.changeStep(5);
  }

  cancelBooking() {
    this.hotelService.cancelHotelBooking(this.dataToConfirmReservation).subscribe(
      data => {
        if (data) {
        if (data.success === true) {
          this.toast.success(this.translate.instant('Booking canceled with success'), this.translate.instant('SUCCESS'));
          this.disableVoucher = true;
          this.seeVoucherBtn = true;
          this.disableCancel = true;
          this.ResaStatus = 'Canceled';
        }
        if (data.success === false) {
          this.toast.warning(this.translate.instant('Error while cancelling the booking, please try again later'), this.translate.instant('ERROR'));
        }
      }
      }
    );
  }

  issueVoucher() {
    this.hotelService.generateInvoice(this.dataToConfirmReservation).subscribe(
      data => {
        if (data) {
        if (data.success === true) {
          this.toast.success(this.translate.instant('Voucher issued with success'), this.translate.instant('SUCCESS'));
          this.disableVoucher = true;
          this.seeVoucherBtn = false;
          this.ResaStatus = 'Vouchered';
        }
        if (data.success === false) {
          this.toast.warning(this.translate.instant('Can not issue the voucher'), this.translate.instant('ERROR'));
        }
      }
      }
    );
  }
}

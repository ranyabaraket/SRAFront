import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { environment } from 'src/environments/environment';
import { StoreFlightDataService } from '../../../flight/store-flight-data.service';
import { TransferResultService } from '../transfer-result.service';
import { BookigTransferModel } from './bookingTransferModel';
import { ConfirmationTransferService } from './confirmation-transfer.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ValidateActionComponent } from 'src/app/views/pages/shared/validate-action/validate-action.component';
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-confirmation-transfer',
  templateUrl: './confirmation-transfer.component.html',
  styleUrls: ['./confirmation-transfer.component.scss']
})
export class ConfirmationTransferComponent implements OnInit, AfterViewInit {
  transferDetails;
  searchResult;
  searchModel;
  bookingModel: BookigTransferModel = new BookigTransferModel();

  resultBooking;

  loading;
  submitted;
  success = false;

  totalPrice = 0;

  datePipe = new DatePipe('en-US');
  dataToVoucher: any = {};
  constructor(
    private storeFlightData: StoreFlightDataService,
    public translate: TranslateService,
    private languageServise: LanguageService,
    private currencyPipe: CustomCurrencyPipe,
    private confirmationTransferService: ConfirmationTransferService,
    private cookie: CookieService,
    private toastr: ToastrService,
    private router: Router,
    private toast: ToastrService,
    public dialog: MatDialog) { }



  ngOnInit(): void {
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    window.addEventListener('message', event => {
      if (!event.data.transfer) {
        this.router.navigate(['/pages/transfer'], {});
       }
      if (event.origin !== `${environment.front_url}`) { return; }
      this.transferDetails = event.data.transfer;
      this.searchResult = event.data.searchResult;
      this.searchModel = event.data.searchModel;
      this.bookingModel.pickupLatitude = this.searchModel.pickupLatitude;
      this.bookingModel.pickupLongitude = this.searchModel.pickupLongitude;
      this.bookingModel.dropoffLatitude = this.searchModel.dropoffLatitude;
      this.bookingModel.dropoffLongitude = this.searchModel.dropoffLongitude;
      this.bookingModel.bookingtypeid = this.transferDetails.general.bookingtypeid;
      this.bookingModel.productid = this.transferDetails.general.productid;
      this.bookingModel.gds = this.transferDetails.gds;
      this.bookingModel.accomodationNameAff = this.searchResult.end_name;
      this.bookingModel.accomodationName = this.searchResult.end_name.replaceAll(' ', '%20');
      this.bookingModel.noadults = Number(this.searchResult.adults);
      this.bookingModel.nochildren = Number(this.searchResult.children);
      this.bookingModel.noinfants = Number(this.searchResult.infants);
      this.bookingModel.nopax = this.bookingModel.noadults + this.bookingModel.nochildren + this.bookingModel.noinfants;
      this.bookingModel.saleprice = this.transferDetails.pricing.price;
      this.bookingModel.transferType = this.searchResult.transferType;
      this.bookingModel.refUser = this.cookie.get('tiersName');
      this.bookingModel.codeDeviseGds = this.transferDetails.pricing.currency;
      this.bookingModel.codeDeviseTiers = this.cookie.get('codeDevise');
      this.bookingModel.vehiculeDescription = this.transferDetails.general.producttype;
      this.bookingModel.dropoffCityID = this.searchModel.dropoffLocation;
      this.bookingModel.deptCityId = this.searchModel.pickupLocation;
      this.bookingModel.dropoffCity = this.searchModel.dropoffCity;
      this.bookingModel.departPlace = this.searchModel.pickupPlace;
      this.bookingModel.dropoffName = this.searchResult.end_name;
      if (this.searchModel.journeyType !== 1) {
        const dateparts = this.searchModel.departureDate.split('/');
        this.bookingModel.dtReturn = dateparts[2] + '-' + dateparts[1] + '-' + dateparts[0];
      }
      this.totalPrice = Number(this.transferDetails.pricing.finalPrice);
    }, false);

  }
  ngAfterViewInit(): void {
    this.storeFlightData.changeStep(2);
  }
  booking() {
    if (this.cookie.get('canBook') !== 'O') {
      this.toast.warning(this.translate.instant('Action not allowed'));
      return;
    }
    this.submitted = true;
    const form0 = document.querySelector('app-form-informations-transfer').getElementsByTagName('form').item(0);
    if (!form0.checkValidity()) {
      console.error('informations transfer invalid');
      return;
    }

    const form1 = document.querySelector('app-form-passenger-transfer').getElementsByTagName('form').item(0);
    if (!form1.checkValidity()) {
      console.error('form passenger invalid');
      return;
    }
    this.dialog.open(ValidateActionComponent, {
      data: 'Are you sure you want to confirm this transfer?',
      width: '400px',
      height: '160px',

    }).afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        // tslint:disable-next-line:max-line-length
        if (!this.bookingModel.indPaysTel && typeof (this.bookingModel.indPaysTel) !== 'undefined') { this.bookingModel.mobileNo = this.bookingModel.indPaysTel + this.bookingModel.mobileNumber; }
        else {
          this.bookingModel.mobileNo = this.bookingModel.mobileNumber;
        }
        this.bookingModel.arrivalDate = this.searchResult.travelling.split('T')[0];
        this.bookingModel.arrivalTimeH = new Date(this.searchResult.travelling).getHours();
        this.bookingModel.arrivalTimeM = new Date(this.searchResult.travelling).getMinutes();
        this.bookingModel.departureTimeH = this.searchModel.departureTimeH;
        this.bookingModel.departureTimeM = this.searchModel.departureTimeM;
        this.bookingModel.leadName = this.bookingModel.leadnameAff.replaceAll(' ', '%20');
        this.bookingModel.leadSurname = this.bookingModel.leadsurnameAff.replaceAll(' ', '%20');
        this.bookingModel.accoAdress1 = this.bookingModel.accoAddress1Aff.replaceAll(' ', '%20');
        this.bookingModel.accoAdress2 = this.bookingModel.accoAddress2Aff.replaceAll(' ', '%20');

        this.confirmationTransferService.bookingRequest(this.bookingModel).subscribe(
          data => {
            this.dataToVoucher.data = data;
            this.dataToVoucher.search = this.bookingModel;
            this.resultBooking = data;
            this.loading = false;
            if (data && data.error) {
              this.toastr.warning(data.error);
              return;
            }
            if (data && data.errors) {
              this.toastr.warning(this.resultBooking.errors.error.message);
              return;
            }
            if (data && data.request && !data.error && !data.errors) {
            //  this.toastr.success('Booking is confirmed');
              this.success = true;
              localStorage.setItem('dataToVoucher', JSON.stringify(this.dataToVoucher));
              this.router.navigate(['/pages/transfer/result/voucher'], {});
            }
          },
          error => {
            this.toastr.error(error);
            console.error(error);
            this.loading = false;
          }

        );
      }});
  }
  SumtotalPrice(value) {
    if (parseFloat(value) < 0) {
      this.bookingModel.customerComm = 0;
    }
    this.totalPrice = parseFloat(this.transferDetails.pricing.price) +
      Number(this.bookingModel.customerComm);
  }
  formatCurr(c) {
    return this.currencyPipe.transform(Math.round(parseFloat(c)));
  }

}

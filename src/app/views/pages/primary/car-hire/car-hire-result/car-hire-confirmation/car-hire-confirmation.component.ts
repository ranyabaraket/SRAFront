import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CustomCurrencyPipe } from 'src/app/views/pages/shared/pipe/customCurrency.pipe';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';
import { ValidateActionComponent } from 'src/app/views/pages/shared/validate-action/validate-action.component';
import { environment } from 'src/environments/environment';
import { StoreFlightDataService } from '../../../flight/store-flight-data.service';
import { BookingCarHire } from './booking-car-hire';
import { CarHireConfirmationService } from './car-hire-confirmation.service';

@Component({
  selector: 'app-car-hire-confirmation',
  templateUrl: './car-hire-confirmation.component.html',
  styleUrls: ['./car-hire-confirmation.component.scss']
})
export class CarHireConfirmationComponent implements OnInit, AfterViewInit {
submitted;
loading = true;
success;
totalPrice = 0;
carDetails;
bookingModel: BookingCarHire = new BookingCarHire();
filteredByFirstNamePsg: Observable<any[]>;
filteredByLastNamePsg: Observable<any[]>;
filteredByEmailPsg: Observable<any[]>;
filteredByMoileNo: Observable<any[]>;
countries;
contractModel;
showConfirmation;
showVoucher;
bookingId;
cancelId;
canceled;
canceltext;
  constructor(private storeFlightData: StoreFlightDataService,
              public translate: TranslateService,
              private currencyPipe: CustomCurrencyPipe,
              private toastr: ToastrService,
              private languageService: LanguageService,
              private cookie: CookieService,
              public dialog: MatDialog,
              private router: Router,
              private toast: ToastrService,
              private carHireConfirmationService: CarHireConfirmationService) { }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      console.log(event);
      if (event.origin !== `${environment.front_url}`) {
        return;
      }
      if (!event || !event.data){
          this.router.navigate(['/pages/car-hire']);
        }
     // this.loading = false;
      this.carDetails = event.data.item;
      this.totalPrice =   event.data.item.total_fare.totalFare;
      this.countries = this.carHireConfirmationService.getCountries();
      this.bookingModel.price = event.data.item.total_fare.totalFare;
      this.bookingModel.gds =  event.data.item.gds;
      this.bookingModel.codeDeviseGds =   event.data.item.total_fare.currency;
      this.bookingModel.codeDeviseTiers =   event.data.item.total_fare.currency;
      this.bookingModel.refUser =  this.cookie.get('tiersName');
      this.bookingModel.nbBagg = event.data.item.car.bags;
      this.carHireConfirmationService.select({ppnBundle: event.data.item.car_reference_id,
      gds : event.data.item.gds, currency : event.data.item.total_fare.currency}).subscribe(
        data => {
          console.log(data);
          if (data.success){
            this.contractModel = data;
            this.loading = false;
            this.bookingModel.ppnBundle = data.car_book_bundle;
            this.bookingModel.dtDepart =  event.data.searchModel.pickupDate;
            this.bookingModel.dtArrival = event.data.searchModel.dropoffDate;
            this.bookingModel.arrivalTime = data.dropoff_time;
            this.bookingModel.pickupName = this.contractModel.pickup_name;
            this.contractModel.important_information.forEach(element => {
              element.open = false;
            });
            this.contractModel.car_policy_data.forEach(element => {
              element.open = false;
            });
          }
          console.log(data); },
        err => {console.error(err);
                this.loading = false;
                this.toastr.error(this.translate.instant('Server error'));
  }
      );
    //  document.getElementById('mailLead').addEventListener('paste', e => e.preventDefault());
});
    // this.carHireConfirmationService.select1( ).subscribe(
    // data => {
    //   this.loading = false;
//       if (data.success){
//         this.contractModel = data;
//       }
//       console.log(data); },
//     err => {console.error(err);
//             this.loading = false;
//             this.toastr.error(this.translate.instant('Server error'));
// }
//   );
  }
  ngAfterViewInit(): void {
    this.storeFlightData.changeStep(2);
  }
  booking(){
    if (this.cookie.get('canBook') !== 'O') {
      this.toast.warning(this.translate.instant('Action not allowed'));
      return;
    }
    this.submitted = true;

    const form0 = document.getElementsByTagName('form').item(0);
    if (!form0.checkValidity()) {
      console.error('form invalid');
      return;
    }
    this.bookingModel.driverFirstName = this.bookingModel.leadsurnameAff.replaceAll(' ', '%20');
    this.bookingModel.driverLastName = this.bookingModel.leadnameAff.replaceAll(' ', '%20');
    this.dialog.open(ValidateActionComponent, {
      data: 'Are you sure you want to Book This Car?',
      width: '400px',
      height: '160px',
    }).afterClosed().subscribe(result => {
      if (result) {
    this.loading = true;
    this.carHireConfirmationService.book(this.bookingModel).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        if (!data.success){
        this.toastr.error(data.error);
        return;
      }
        if (data.success){
      this.toastr.success(data.booking_status);
      this.bookingId = data.booking_id;
      this.showConfirmation = true;
    }
    },
      err => {console.error(err);
              this.loading = false;
              this.toastr.error(this.translate.instant('Server error'));
      }
    ); }});
  }
  cancel(){
    this.dialog.open(ValidateActionComponent, {
      data: 'Are you sure you want to cancel this booking?',
      width: '400px',
      height: '160px',
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.carHireConfirmationService.cancel({bookingId: this.bookingId,
          email : this.bookingModel.custEmail, gds : this.bookingModel.gds }).subscribe(
          data => {
            console.log(data);
            this.loading = false;
            if (!data.success){
            this.toastr.error(data.error);
            return;
          }
            if (data.success){
          this.toastr.success(data.cancel_status);
          this.cancelId = data.cancel_id;
          this.canceltext = data.cancel_cs_text;
          this.canceled = true;
        }
        },
          err => {console.error(err);
                  this.loading = false;
                  this.toastr.error(this.translate.instant('Server error'));
          }
        );
      }});
  }
  SumtotalPrice(value) {
    if (Number(value) < 0) {
      this.bookingModel.customerComm = 0;
    }
    this.totalPrice =  this.carDetails.total_fare.totalFare +
      Number(this.bookingModel.customerComm);
  }
  formatCurr(value) {
    return this.currencyPipe.transform(Math.round(parseFloat(value)));
  }
  getFirstName(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByFirstNamePsg = this.carHireConfirmationService.searchPassengerByFirstName(this.bookingModel.leadnameAff);
    }
  }
  geLastName(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.carHireConfirmationService.searchPassengerbyLastName(this.bookingModel.leadsurnameAff);
    }
  }
  getEmail(value) {
    this.bookingModel.custEmail = value.replaceAll(' ', '');
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.carHireConfirmationService.searchPassengerbyEmail(this.bookingModel.custEmail);
    }
  }
  getMobileNo(value) {
    if (value && value.length >= 2) {
      // tslint:disable-next-line: max-line-length
      this.filteredByLastNamePsg = this.carHireConfirmationService.searchPassengerbyTel(this.bookingModel.custPhone);
    }
  }
  selectPassenger(option) {
    this.bookingModel.leadTitle = option.passengerTitle;
    this.bookingModel.leadnameAff = option.firstName;
    this.bookingModel.leadsurnameAff = option.lastName;
    this.bookingModel.custEmail = option.mail;
    this.bookingModel.custPhone = option.tel;
  }

  getIdfPays(evt) {
    this.carHireConfirmationService.getIdfPays(this.bookingModel.countryTel)
      .then(res => res.text())          // convert to plain text
      .then(text => this.bookingModel.indPaysTel = text);
  }
  showHideRule(index){
    this.contractModel.important_information[index].open = !this.contractModel.important_information[index].open;
   }
   showHidePolicy(index){
    this.contractModel.car_policy_data[index].open = !this.contractModel.car_policy_data[index].open;
   }
   cancelSeeVoucher(ok: boolean){
    this.showVoucher = false;
  }
}

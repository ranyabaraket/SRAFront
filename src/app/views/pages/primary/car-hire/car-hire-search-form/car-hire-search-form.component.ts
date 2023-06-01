
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
// import { TransferService } from '../transfer.service';
import { LanguageService } from '../../../shared/services/language.service';
import { CarHireService } from '../car-hire.service';
// import { SearchTransfertModel } from '../searchTransfertModel';
@Component({
  selector: 'app-car-hire-search-form',
  templateUrl: './car-hire-search-form.component.html',
  styleUrls: ['./car-hire-search-form.component.scss']
})
export class CarHireSearchFormComponent implements OnInit {

  @Input() data;
  datePipe = new DatePipe('en-US');
  inputDate = '';
  listPays: any = [];
  searchTransfertModel = {
    pickupCode : '',
    pickupName: '',
    pickupDate : '',
    pickupTime : '',
    dropoffDate : '',
    dropoffTime : '',
    arrivalDateAff: '',
    departureDateAff : '',
    longitude : '',
    lattitude : ''
  };

  destinations = [];
  filtredpickupOptions;
  filtreddropOffOptions;
  minDate = new Date();
  arrivalDate = '';
  departureDate = '';
  arrivalTime;
  departTime;
  inputDropOff;
  inputPickup;
  subb;
  constructor(
     private carHireSerice: CarHireService,
     public router: Router,
     public toastr: ToastrService,
     public dialog: MatDialog,
     private languageServise: LanguageService,
     public translate: TranslateService,
     private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // document.getElementById('DropdownPassenger').addEventListener('click', e => {
    //   e.stopPropagation();
    // });
    if (this.data ) {
    this.inputPickup = this.data.pickupCode;
    this.searchTransfertModel.departureDateAff =  this.data.pickupDate;
    this.searchTransfertModel.arrivalDateAff =  this.data.dropoffDate;
    this.arrivalTime = this.data.pickupTime;
    this.departTime = this.data.dropoffTime;
    }
    this.languageServise.shareLang.subscribe(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });

  }
  getPays() {
    // this.transferService.getPays().subscribe(
    //   data => {
    //     this.listPays = data;
    //   }
    // );
  }
  /*getDestinationsByCountry(e) {
    this.filtreddropOffOptions = [];
    this.filtredpickupOptions = [];
    this.transferService.getDestinationsFromGDSByText(e.target.value).subscribe(
      data => { this.destinations = data; }
    );
  }*/

  getPickupFiltred(e) {
  this.filtredpickupOptions = [];
  if (e.target.value.length > 2) {
      if (this.subb) { this.subb.abort(); }
      this.subb = this.carHireSerice.streamPickupList(e.target.value)
        // .subscribe(
        .node('!',
          data => {
            if (!data) {
              return;
            }
            if (data[0] && data[0].status !== 'Success' && data[0].error.status) {
              this.toastr.warning(data[0].status);
              return;
            }
            if (data[0].error && !data[0].error.status) {
              this.toastr.warning(data[0].error);
              return;
            }
            if (data[0].city_data){
              data[0].city_data.forEach(element => {
                this.filtredpickupOptions = this.filtredpickupOptions.concat({
                  str : element.city + ' , ' + element.country,
                  code : element.country_code,
                  logitude : element.longitude,
                  lattitude : element.latitude,
                  type: 'city'
                });
              });
            }
            if (data[0].airport_data){
              data[0].airport_data.forEach(element => {
                this.filtredpickupOptions = this.filtredpickupOptions.concat({
                  str : element.airport_name,
                  code : element.airport_code,
                  type: 'airport'
                });
              });
            }
           }
        ) .fail(err => this.toastr.error('Server error'));

    }
  }
 /* getdropOffFiltred(e) {
    this.filtreddropOffOptions = [];
    if (e.target.value.length >= 3) {
      if (this.oobe) { this.oobe.abort(); }
      this.oobe = this.transferService.getDestinationsFromGDSByText(e.target.value)
        // .subscribe(
        .node('!',
          data => {
            if (_.isArray(data) && data.length === 0) {
              return;
            }
            if (data === undefined) {
              return;
            }
            if (_.isArray(data) && data.length && data[0].error && !data[0].success) {
              this.toastr.warning(data[0].error);
            }
            if (!data.errors && _.isArray(data) && data.length) {
              this.filtreddropOffOptions = this.filtreddropOffOptions.concat(data);
            }
            else if (data[0].errors) {
              this.toastr.error(data.errors.error.message);
            }
          } // ,  err => this.toastr.error('Server error')
        ).fail(err => {
          console.log(err);
          this.toastr.error('Server error');
        }
        );
    }
  }*/
  selectedPickup(option) {
    if (option) {
   //  console.log(option);
   this.searchTransfertModel.pickupName = option.str;
   this.searchTransfertModel.pickupCode = option.code;
   this.inputPickup = option.str;
   this.filtredpickupOptions = [];
   this.searchTransfertModel.longitude = option.longitude,
      this.searchTransfertModel.lattitude = option.lattitude;
    }
  }
  // selectedDropoff(option) {
  //   if (option) {
  //     this.searchTransfertModel.dropoffLocation = option.location_code;
  //     this.searchTransfertModel.dropoffLongitude = option.longitude;
  //     this.searchTransfertModel.dropoffLatitude = option.latitude;
  //     this.searchTransfertModel.dropoffCity = option.City;
  //     this.searchTransfertModel.dropoffPlace = option.Place;
  //     this.filtredpickupOptions = [];
  //   }
  // }

  disableButtonSearch() {
    this.cdRef.detectChanges();
    return !document.forms[0].checkValidity();
  }

  reset() {
    this.searchTransfertModel = {
      pickupCode : '',
      pickupName: '',
      pickupDate : '',
      pickupTime : '',
      dropoffDate : '',
      dropoffTime : '',
      arrivalDateAff: '',
      departureDateAff : '',
      longitude : '',
      lattitude : ''
    };
    const inputs = document.forms[0].elements;
    // tslint:disable-next-line:no-string-literal
    inputs['pickUp'].value = '';
    this.departTime = '';
    this.arrivalTime = '';
  }
  getSearchModel() {
  //   this.searchTransfertModel.pickup_date = this.datePipe.transform(this.searchTransfertModel.departureDateAff, 'dd/MM/yyyy');
  // //  this.searchTransfertModel.dtDepart = new Date(this.searchTransfertModel.departureDate.split('/')[2],
  //     this.searchTransfertModel.departureDate.split('/')[1],
  //     this.searchTransfertModel.departureDate.split('/')[0],
  //     this.searchTransfertModel.arrivalTimeH,
  //     this.searchTransfertModel.arrivalTimeM);
  //   // dateparts[2] + '-' + dateparts[1] + '-' + dateparts[0];
    this.searchTransfertModel.dropoffDate = this.datePipe.transform(this.searchTransfertModel.departureDateAff, 'YYYY-MM-dd');
    this.searchTransfertModel.pickupDate = this.datePipe.transform(this.searchTransfertModel.arrivalDateAff, 'YYYY-MM-dd');
  //     this.searchTransfertModel.arrivalDate.split('/')[1],
  //     this.searchTransfertModel.arrivalDate.split('/')[0]
  //     , this.searchTransfertModel.departureTimeH,
  //     this.searchTransfertModel.departureTimeM);
    // dateparts2[2] + '-' + dateparts2[1] + '-' + dateparts2[0];
    return this.searchTransfertModel;
  }

  changeDepartTime(e) {
    this.searchTransfertModel.dropoffTime = e.target.value;
    // this.searchTransfertModel.departureTimeH = e.target.value.split(':')[0];
  }
  changeArrivalTime(e) {
    //  console.log(this.datePipe.transform(e.target.value,'hh:MM'));
    this.searchTransfertModel.pickupTime = e.target.value;
    // this.searchTransfertModel.arrivalTimeH = e.target.value.split(':')[0];
  }

  getSearch(item) {
    this.inputDropOff = item.dropoffName;
    this.inputPickup = item.pickupName;
    // this.searchTransfertModel.dropoffLocation = item.idDropoff;
    // this.searchTransfertModel.dropoffPlace = item.dropoffName;
    // this.searchTransfertModel.pickupLocation = item.idPickup;
    // this.searchTransfertModel.pickupPlace = item.pickupName;
    this.searchTransfertModel.departureDateAff = item.pickupTime;
    this.searchTransfertModel.arrivalDateAff = item.dropoffTime;
    this.arrivalTime = this.datePipe.transform(item.pickupTime, 'hh:mm');
    this.departTime = this.datePipe.transform(item.dropoffTime, 'hh:mm');

    this.searchTransfertModel.pickupTime = this.arrivalTime;
    this.searchTransfertModel.dropoffTime = this.departTime;
  }

}

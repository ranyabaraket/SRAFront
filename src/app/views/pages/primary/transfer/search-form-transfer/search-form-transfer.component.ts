import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TransferService } from '../transfer.service';
import { LanguageService } from '../../../shared/services/language.service';
import { SearchTransfertModel } from '../searchTransfertModel';
import * as _ from 'lodash';
@Component({
  selector: 'app-search-form-transfer',
  templateUrl: './search-form-transfer.component.html',
  styleUrls: ['./search-form-transfer.component.scss']
})
export class SearchFormTransferComponent implements OnInit {
  @Input() data;
  datePipe = new DatePipe('en-US');
  TypeSearchList = [{ name: 'One way', value: 1 },
  { name: 'Round Trip', value: 2 }
  ];
  inputDate = '';
  listPays: any = [];
  searchTransfertModel: SearchTransfertModel = new SearchTransfertModel();
  listTrajet = [
    'Trajet',
    'Airport To Hotel',
    'Hotel To Airport'
  ];
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
  oobe;
  country = 'all';
  constructor(
    private transferService: TransferService,
    public router: Router,
    public toastr: ToastrService,
    public dialog: MatDialog,
    private languageServise: LanguageService,
    public translate: TranslateService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    document.getElementById('DropdownPassenger').addEventListener('click', e => {
      e.stopPropagation();
    });
    if (this.data && this.data.journeyType) {
      this.departureDate = this.data.departureDate;
      this.arrivalDate = this.data.arrivalDate;
      this.searchTransfertModel = { ... this.data };
      const inputs = document.forms[0].elements;
      this.departTime = this.data.departureTimeH + ':' + this.data.departureTimeM;
      this.arrivalTime = this.data.arrivalTimeH + ':' + this.data.arrivalTimeM;
      // tslint:disable-next-line:no-string-literal
      inputs['pickUp'].value = this.searchTransfertModel.pickupPlace;
      // tslint:disable-next-line:no-string-literal
      inputs['dropOff'].value = this.searchTransfertModel.dropoffPlace;
      this.inputPickup = this.searchTransfertModel.pickupPlace;
      this.inputDropOff = this.searchTransfertModel.dropoffPlace;
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
    this.transferService.getPays().subscribe(
      data => {
        this.listPays = data;
      }
    );
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
    if (e.target.value.length  === 0){
      this.country = 'all';
    }
    if (e.target.value.length  >= 3) {
    if (this.oobe){this.oobe.abort(); }
    this.oobe =  this.transferService.getDestinationsFromGDSByText(e.target.value, this.country)
        // .subscribe(
        .node('!',
          data => {
            if (data === undefined) {
              return;
            }
            if (_.isArray(data) && data.length === 0) {
              return;
            }

            if (_.isArray(data) && data.length && data[0].error && !data[0].success) {
              this.toastr.warning(data[0].error);
              return;
            }
            if (!data.errors && _.isArray(data) && data.length) {
              this.filtredpickupOptions = this.filtredpickupOptions.concat(data);
            //  if (this.searchTransfertModel.transferType === 1){
            //   const airports = data.filter(d => d.Place.match(/^[a-z|A-Z|0-9| |(|)]+\s?\([a-z|A-Z]{3}\)$/gm));
            //   this.filtredpickupOptions = this.filtredpickupOptions.concat(airports);
            // }else{
            //   const hotels = data.filter(d => !d.Place.match(/^[a-z|A-Z|0-9| |(|)]+\s?\([a-z|A-Z]{3}\)$/gm));
            //   this.filtredpickupOptions = this.filtredpickupOptions.concat(hotels);
            // }
            }
            else if (data.errors) {
              this.toastr.error(data.errors.error.message);
            }
          }// , err => this.toastr.error('Server error')
        ).fail(err => {
          console.log(err);
          this.toastr.error('Server error');

        }
        );

    }
  }
  getdropOffFiltred(e) {
    if (e.target.value.length  === 0){
      this.country = 'all';
    }
    this.filtreddropOffOptions = [];
    if (e.target.value.length >= 3) {
      if (this.oobe){this.oobe.abort(); }
      this.oobe = this.transferService.getDestinationsFromGDSByText(e.target.value, this.country)
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
              // if (this.searchTransfertModel.transferType === 1){
              //   const hotels = data.filter(d => !d.Place.match(/^[a-z|A-Z|0-9| |(|)]+\s?\([a-z|A-Z]{3}\)$/gm));
              //   this.filtreddropOffOptions = this.filtreddropOffOptions.concat(hotels);
              // }else{
              //   const airports = data.filter(d => d.Place.match(/^[a-z|A-Z|0-9| |(|)]+\s?\([a-z|A-Z]{3}\)$/gm));
              //   this.filtreddropOffOptions = this.filtreddropOffOptions.concat(airports);
              // }
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
  }
  selectedPickup(option) {
    if (option) {
      this.searchTransfertModel.pickupLocation = option.location_code;
      this.searchTransfertModel.pickupLongitude = option.longitude;
      this.searchTransfertModel.pickupLatitude = option.latitude;
      this.searchTransfertModel.pickupPlace = option.Place;
      this.searchTransfertModel.pickupCity = option.City;
      this.country = option.Country;
      this.filtredpickupOptions = [];
    }
  }
  selectedDropoff(option) {
    if (option) {
      this.searchTransfertModel.dropoffLocation = option.location_code;
      this.searchTransfertModel.dropoffLongitude = option.longitude;
      this.searchTransfertModel.dropoffLatitude = option.latitude;
      this.searchTransfertModel.dropoffCity = option.City;
      this.searchTransfertModel.dropoffPlace = option.Place;
      this.country = option.Country;
      this.filtredpickupOptions = [];
    }
  }


  changeValueTypeSearch(value) {
    this.searchTransfertModel.journeyType = value;
  }

  changeValueTrajet(value) {
    this.searchTransfertModel.transferType = value;
    this.filtreddropOffOptions = [];
    this.filtredpickupOptions = [];
    const inputs = document.forms[0].elements;
    // tslint:disable-next-line:no-string-literal
    inputs['pickUp'].value = '';
    // tslint:disable-next-line:no-string-literal
    inputs['dropOff'].value = '';

  }
  disableButtonSearch() {
    this.cdRef.detectChanges();
    return document.forms[0].checkValidity();
  }

  reset() {
    this.country = 'all';
    this.searchTransfertModel = new SearchTransfertModel();
    const inputs = document.forms[0].elements;
    // tslint:disable-next-line:no-string-literal
    inputs['pickUp'].value = '';
    // tslint:disable-next-line:no-string-literal
    inputs['dropOff'].value = '';
    this.departTime = '';
    this.arrivalTime = '';
  }
  getSearchModel() {
    if ( this.searchTransfertModel.journeyType === 2){
    this.searchTransfertModel.departureDate = this.datePipe.transform(this.searchTransfertModel.departureDateAff, 'dd/MM/yyyy');
    this.searchTransfertModel.dtDepart = new Date(this.searchTransfertModel.departureDate.split('/')[2],
    this.searchTransfertModel.departureDate.split('/')[1],
    this.searchTransfertModel.departureDate.split('/')[0],
     this.searchTransfertModel.arrivalTimeH,
    this.searchTransfertModel.arrivalTimeM);
    }
    // dateparts[2] + '-' + dateparts[1] + '-' + dateparts[0];
    this.searchTransfertModel.arrivalDate = this.datePipe.transform(this.searchTransfertModel.arrivalDateAff, 'dd/MM/yyyy');
    this.searchTransfertModel.dtArrival = new Date(this.searchTransfertModel.arrivalDate.split('/')[2],
    this.searchTransfertModel.arrivalDate.split('/')[1],
    this.searchTransfertModel.arrivalDate.split('/')[0]
    , this.searchTransfertModel.departureTimeH,
      this.searchTransfertModel.departureTimeM);
    // dateparts2[2] + '-' + dateparts2[1] + '-' + dateparts2[0];
    return this.searchTransfertModel;
  }

  changeDepartTime(e) {
    this.searchTransfertModel.departureTimeM = e.target.value.split(':')[1];
    this.searchTransfertModel.departureTimeH = e.target.value.split(':')[0];
  }
  changeArrivalTime(e) {
    //  console.log(this.datePipe.transform(e.target.value,'hh:MM'));
    this.searchTransfertModel.arrivalTimeM = e.target.value.split(':')[1];
    this.searchTransfertModel.arrivalTimeH = e.target.value.split(':')[0];
  }

  getSearch(item) {
    this.inputDropOff = item.dropoffName;
    this.inputPickup = item.pickupName;
    this.searchTransfertModel.dropoffLocation = item.idDropoff;
    this.searchTransfertModel.dropoffPlace = item.dropoffName;
    this.searchTransfertModel.pickupLocation = item.idPickup;
    this.searchTransfertModel.pickupPlace = item.pickupName;
    this.searchTransfertModel.departureDateAff = item.dropoffTime;
    this.searchTransfertModel.arrivalDateAff = item.pickupTime;

    this.searchTransfertModel.pickupLatitude = item.pickupLatitude;
    this.searchTransfertModel.dropoffLongitude = item.dropoffLongitude;
    this.searchTransfertModel.dropoffLatitude = item.dropoffLatitude;
    this.searchTransfertModel.pickupLongitude = item.pickupLongitude;
    if ( this.searchTransfertModel.journeyType === 2){
      this.departTime = this.datePipe.transform(item.dropoffTime, 'hh:mm');
      this.searchTransfertModel.departureTimeM =  this.departTime.split(':')[1];
      this.searchTransfertModel.departureTimeH =  this.departTime.split(':')[0];
    }
    this.arrivalTime = this.datePipe.transform(item.pickupTime, 'hh:mm');
    this.searchTransfertModel.arrivalTimeM = this.arrivalTime.split(':')[1];
    this.searchTransfertModel.arrivalTimeH = this.arrivalTime.split(':')[0];
  }
}

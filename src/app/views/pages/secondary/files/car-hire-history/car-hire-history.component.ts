import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'typescript';
import { CustomCurrencyPipe } from '../../../shared/pipe/customCurrency.pipe';
import { CarHireHistoryService } from './car-hire-history.service';

@Component({
  selector: 'app-car-hire-history',
  templateUrl: './car-hire-history.component.html',
  styleUrls: ['./car-hire-history.component.scss']
})
export class CarHireHistoryComponent implements OnInit {
  datePipe = new DatePipe('en-US');

  settings = {
    hideSubHeader: true,
    defaultStyle: false,
    attr: {
      class: 'table table-bordered table-striped'
    },
    pager: {
      display: true,
      perPage: 100
    },
    columns: {
      suppRefChrfile: {
        title: this.translate.instant('Booking Ref.'),
        filter: false
      },
      uniqueId: {
        title: this.translate.instant('Unique ID'),
        filter: false
      }
      ,
      driver: {
        title: this.translate.instant('Driver'),
        filter: false
      }
      ,
      pickUp: {
        title: this.translate.instant('Pick-Up'),
        filter: false
      }
      ,
      // pickUpType: {
      //   title: this.translate.instant('Pickup type'),
      //   filter: false,
      //   type: 'html',
      //   valuePrepareFunction: (value) => this.translate.instant(this.TypeLocations[value])
      // },
      pickupTime: {
        title: this.translate.instant('Picking Date'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy HH:mm')
      }
      ,
      // dropOff: {
      //   title: this.translate.instant('Drop-Off'),
      //   filter: false,
      // },
      // dropOffType: {
      //   title: this.translate.instant('Dropoff type'),
      //   filter: false,
      //   type: 'html',
      //   valuePrepareFunction: (value) => this.translate.instant(this.TypeLocations[value])
      // },
      returnDate: {
        title: this.translate.instant('Return Date'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy HH:mm')
      }
      ,
      mntAchatChr: {
        title: this.translate.instant('Selling price'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.currencyPipe.transform(Math.round(value))
      }
      ,
      mntServChr: {
        title: this.translate.instant('Agency fee'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.currencyPipe.transform(Math.round(value))
      }
      ,
      codeDevise: {
        title: this.translate.instant('Curr.'),
        filter: false
      },
      etatfilechr: {
        title: this.translate.instant('Status'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.Statuts[value]
      },
      dtfilechr: {
        title: this.translate.instant('Date booking'),
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy HH:mm')
      }
      ,
      refUser: {
        title: this.translate.instant('User'),
        filter: false
      }
      /* ,
       dtCreate: {
         title: this.translate.instant('Created date'),
         filter: false,
         type: 'html',
         valuePrepareFunction: (value) => this.datePipe.transform(value, 'dd/MM/yyyy HH:mm')
       }*/
    }
    ,
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'ourCustomAction', title: '<i class="far fa-list-alt action" title="Details"></i>' }],
      position: 'right'
    },

  };
  source = [];
  searchModel = {
    ref: '',
    uniqueId: '',
    passenger: '',
    pickupName: '',
    pickupType: '',
    dropoffType: '',
    dropoffName: '',
    typeRent: 'L',
    etatfilechr: '',
    bookingDateFrom: null,
    bookingDateTo: null,
    pickupDateFrom: null,
    pickupDateTo: null
  };
  loading: boolean;
  total = 0;
  TypeLocations = {
    A: 'Airport',
    H: 'Hotel',
    P: 'Port',
  };
  typeRent = {
    T: 'Transfer',
    L: 'Car rent',

  };
  Statuts = {
    B: 'Booked',
    E: 'Pending',
    C: 'Confirmed',
    'P ': 'In Process',
    A: 'Canceled'
  };
  sub: any;
  success: any;
  submitted: any;
  showDetails;
  data: { idfilechr: any; curr: any; };
  constructor(
      private toastr: ToastrService,
    // private languageServise: LanguageService,
      public translate: TranslateService,
      private carHireHistoryService: CarHireHistoryService,
    // private router: Router,
    // private cookie: CookieService,
      private currencyPipe: CustomCurrencyPipe
    ) { }

  ngOnInit(): void {
  }
  reset(searchForm) {
    searchForm.reset();
    this.source = [];
    this.total = 0;
  }
  find() {
    this.source = [];
    this.total = 0;
    this.loading = true;
    if (!this.searchModel.etatfilechr) { this.searchModel.etatfilechr = ''; }
    this.sub = this.carHireHistoryService.find(this.searchModel).subscribe(
      data => {
        if (data) {
          this.source = data;
          this.total = this.source.length;
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(error);
      }
    );

  }
  getBookingDetails(event): void {
    this.showDetails = true;
    this.data = {  idfilechr: event.data.idfilechr,
      curr: event.data.codeDevise };
    // this.router.navigate(['/pages/files/transfer-history/transfer-details'], {
    //   state: {
    //     idfilechr: event.data.idfilechr,
    //     curr: event.data.codeDevise
    //   }
    // });
  }
  cancel(ok: boolean) {
    this.showDetails = false;
  }
}
